import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"
import {
  TripRequirements,
  StructuredTripPlan,
  retrieveTravelData,
  analyzeFeasibilityAndBudget,
  validateAndNormalizeAiPlan,
} from "./tools.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function callGemini(prompt: string, apiKey: string): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json",
        },
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini error: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
    return data.candidates[0].content.parts[0].text;
  }
  throw new Error("Invalid response format received from Gemini.");
}

async function callGroq(prompt: string, apiKey: string): Promise<string> {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are an expert deterministic travel planning engine. Return strictly JSON matching the required schema.',
        },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Groq error: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  if (data.choices && data.choices[0]?.message?.content) {
    return data.choices[0].message.content;
  }
  throw new Error("Invalid response format received from Groq.");
}

function cleanJsonResponse(text: string): string {
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```/, '');
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  return cleaned.trim();
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Extract requirements from top-level or nested object
    const reqSource = body.requirements || body;
    const currentPlan = body.currentPlan || null;
    const modification = typeof body.modification === 'string' ? body.modification.trim() : null;

    // 1. Validate incoming requirements
    if (
      !reqSource.fromLocation ||
      !reqSource.toLocation ||
      reqSource.budget === undefined ||
      reqSource.numberOfPeople === undefined ||
      !reqSource.numberOfDays
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required fields: fromLocation, toLocation, budget, numberOfPeople, numberOfDays.",
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if modification specifies a new budget amount (e.g. "under 20000" or "budget 20k")
    let activeBudget = Number(reqSource.budget) || 0;
    if (modification) {
      const budgetMatch = modification.match(/(?:under|budget|max|limit)\s*(?:of\s*)?(?:inr|rs|₹)?\s*([0-9]+(?:\.[0-9]+)?)\s*(k|thousand)?/i);
      if (budgetMatch && budgetMatch[1]) {
        let parsedBudget = parseFloat(budgetMatch[1]);
        if (budgetMatch[2] && budgetMatch[2].toLowerCase().startsWith('k')) {
          parsedBudget *= 1000;
        } else if (budgetMatch[2] && budgetMatch[2].toLowerCase().startsWith('t')) {
          parsedBudget *= 1000;
        }
        if (!isNaN(parsedBudget) && parsedBudget > 0) {
          activeBudget = parsedBudget;
        }
      }
    }

    const requirements: TripRequirements = {
      fromLocation: String(reqSource.fromLocation).trim(),
      toLocation: String(reqSource.toLocation).trim(),
      budget: activeBudget,
      currency: reqSource.currency ? String(reqSource.currency).trim() : 'INR',
      numberOfPeople: Math.max(Number(reqSource.numberOfPeople) || 1, 1),
      numberOfDays: Math.max(Number(reqSource.numberOfDays) || 1, 1),
    };

    // 2. Initialize Supabase Server Client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 3. Retrieve verified travel data from database
    const travelData = await retrieveTravelData(supabase, requirements);

    // 4. Run deterministic budget and feasibility engine
    const planningInput = analyzeFeasibilityAndBudget(requirements, travelData);

    // 5. Construct prompt for initial creation or conversational modification
    let modificationContext = "";
    if (modification && currentPlan) {
      modificationContext = `
CONVERSATIONAL MODIFICATION REQUEST:
The user previously received the following structured plan:
${JSON.stringify(currentPlan, null, 2)}

USER INSTRUCTION TO MODIFY:
"${modification}"

MODIFICATION GUIDELINES:
- Adapt the plan according to the user's modification request while picking ONLY from the database options in "feasibleOptions".
- If user wants it cheaper: pick cheaper verified hotel/transport/vehicle from feasibleOptions.
- If user wants to change hotel: select another valid hotel from feasibleOptions.hotels.
- If user wants to remove a place: remove it from suggestedPlaces and the day activities.
- If user wants more nature/sightseeing places: add relevant spots from feasibleOptions.suggestedPlaces.
- If user does not want a car / vehicle: set vehicle.selected = false.
- If user wants a relaxed itinerary: schedule fewer activities per day.
- Keep exact database IDs and factual details.
`;
    }

    const prompt = `You are an expert deterministic travel planning engine.
Your task is to ${modification ? 'modify the current trip plan' : 'organize a feasible trip plan'} strictly based on the real verified travel options supplied below.

USER REQUIREMENTS:
- From: ${requirements.fromLocation}
- Destination: ${requirements.toLocation}
- Budget: ${requirements.currency} ${requirements.budget}
- Number of Travelers: ${requirements.numberOfPeople}
- Number of Days: ${requirements.numberOfDays} (${Math.max(requirements.numberOfDays - 1, 0)} nights)

AVAILABLE FEASIBLE OPTIONS FROM DATABASE:
${JSON.stringify(planningInput.feasibleOptions, null, 2)}

DETERMINISTIC BUDGET BASELINE:
${JSON.stringify(planningInput.budgetAnalysis, null, 2)}
${modificationContext}

CRITICAL PLANNING RULES:
1. Do NOT invent hotels, transport, vehicles, prices, opening hours, or entry fees.
2. If suitable options exist in "feasibleOptions", select the best one using its EXACT database ID.
3. If no hotel is in "feasibleOptions.hotels", set "hotel": { "selected": false, "id": null, "name": null, "location": null, "rating": null, "pricePerNight": null, "numberOfNights": 0, "totalPrice": null }.
4. If no transport is in "feasibleOptions.transport", set "transport": { "selected": false, "id": null, "name": null, "type": null, "provider": null, "price": null }.
5. If no vehicle is affordable or needed, set "vehicle": { "selected": false, "id": null, "name": null, "type": null, "pricePerDay": null, "totalPrice": null }.
6. The "suggestedPlaces" in "feasibleOptions" are from our destinations table (nearby attractions/suggestions). Select relevant places and distribute them across the ${requirements.numberOfDays} days logically.
7. For each suggested place, keep costKnown=false and estimatedCost=null unless verified.
8. Output strictly valid JSON matching this exact structure:
{
  "success": true,
  "tripSummary": {
    "fromLocation": "${requirements.fromLocation}",
    "toLocation": "${requirements.toLocation}",
    "numberOfDays": ${requirements.numberOfDays},
    "numberOfPeople": ${requirements.numberOfPeople},
    "budget": ${requirements.budget},
    "currency": "${requirements.currency}"
  },
  "transport": {
    "selected": true or false,
    "id": 1 or null,
    "name": "Provider Type" or null,
    "type": "flight/bus/train/cab" or null,
    "provider": "Provider Name" or null,
    "price": 1000 or null
  },
  "hotel": {
    "selected": true or false,
    "id": 1 or null,
    "name": "Hotel Name" or null,
    "location": "Location" or null,
    "rating": 4.5 or null,
    "pricePerNight": 2000 or null,
    "numberOfNights": ${Math.max(requirements.numberOfDays - 1, 0)},
    "totalPrice": 4000 or null
  },
  "vehicle": {
    "selected": true or false,
    "id": 1 or null,
    "name": "Vehicle Name" or null,
    "type": "Car/SUV" or null,
    "pricePerDay": 1500 or null,
    "totalPrice": 4500 or null
  },
  "suggestedPlaces": [
    {
      "id": 1,
      "title": "Place Title",
      "reason": "Why this place is suggested",
      "distance": "Distance info",
      "rating": "4.5",
      "costKnown": false,
      "estimatedCost": null
    }
  ],
  "budget": {
    "knownTotal": 0,
    "remainingKnownBudget": 0,
    "currency": "${requirements.currency}"
  },
  "days": [
    {
      "day": 1,
      "activities": [
        {
          "placeId": 1 or null,
          "title": "Activity Name",
          "startTime": null,
          "endTime": null,
          "duration": null,
          "reason": "Short description"
        }
      ]
    }
  ],
  "notes": ["Important travel guidelines or budget notes"]
}`;

    // 6. Provider Orchestration: Gemini (Primary) -> Groq (Fallback)
    const geminiKey = Deno.env.get("GEMINI_API_KEY");
    const groqKey = Deno.env.get("GROQ_API_KEY");

    let providerUsed: "gemini" | "groq" | null = null;
    let validatedPlan: StructuredTripPlan | null = null;

    // STEP A: Attempt Gemini First
    if (geminiKey) {
      try {
        const geminiRaw = await callGemini(prompt, geminiKey);
        const parsed = JSON.parse(cleanJsonResponse(geminiRaw));
        const validation = validateAndNormalizeAiPlan(parsed, planningInput);
        if (validation.valid && validation.plan) {
          validatedPlan = validation.plan;
          providerUsed = "gemini";
        } else {
          console.warn("Gemini response failed structured validation. Initiating Groq fallback.");
        }
      } catch (geminiErr: any) {
        console.warn("Gemini provider failed, initiating Groq fallback:", geminiErr?.message ? "API Error" : "Unknown error");
      }
    }

    // STEP B: Attempt Groq Fallback if Gemini failed or was invalid
    if (!validatedPlan && groqKey) {
      try {
        const groqRaw = await callGroq(prompt, groqKey);
        const parsed = JSON.parse(cleanJsonResponse(groqRaw));
        const validation = validateAndNormalizeAiPlan(parsed, planningInput);
        if (validation.valid && validation.plan) {
          validatedPlan = validation.plan;
          providerUsed = "groq";
        } else {
          console.warn("Groq response failed structured validation.");
        }
      } catch (groqErr: any) {
        console.warn("Groq fallback provider failed:", groqErr?.message ? "API Error" : "Unknown error");
      }
    }

    // STEP C: If both providers failed or yielded invalid structured outputs
    if (!validatedPlan || !providerUsed) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Unable to generate your trip plan right now.",
        }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate conversational response message
    let responseMessage = "Your trip plan has been crafted successfully.";
    if (modification) {
      responseMessage = `I've updated your trip plan based on your request: "${modification}".`;
    }

    // 7. Return safe, validated structured trip plan to Android
    return new Response(
      JSON.stringify({
        success: true,
        provider: providerUsed,
        message: responseMessage,
        plan: validatedPlan,
        requirements,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Trip AI Edge Function top-level error:", error?.message ? "Internal Error" : "Unknown error");
    return new Response(
      JSON.stringify({
        success: false,
        error: "Unable to generate your trip plan right now.",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
