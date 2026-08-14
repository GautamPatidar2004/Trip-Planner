import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { travelToolsSchema } from "./tools.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function callGemini(prompt: string, apiKey: string) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.7,
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  if (data.candidates && data.candidates[0].content.parts[0].text) {
    return data.candidates[0].content.parts[0].text;
  }
  throw new Error("Invalid response from Gemini");
}

async function callGroq(prompt: string, apiKey: string) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [
        { role: 'system', content: 'You are a helpful travel planning assistant.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7
    })
  });

  if (!response.ok) {
    throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  if (data.choices && data.choices[0].message.content) {
    return data.choices[0].message.content;
  }
  throw new Error("Invalid response from Groq");
}

function cleanJsonResponse(text: string) {
  // Remove markdown code blocks if AI wrapped the JSON
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const requirements = await req.json()
    
    // Validate that the required fields exist
    if (!requirements.fromLocation || !requirements.toLocation || !requirements.budget || !requirements.numberOfPeople || !requirements.numberOfDays) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields in requirements JSON" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    const prompt = `You are an expert travel-planning assistant.
Your task is to generate a structured JSON trip itinerary based on user requirements.

User Requirements:
From: ${requirements.fromLocation}
To: ${requirements.toLocation}
Budget: ${requirements.budget} ${requirements.currency || 'INR'}
People: ${requirements.numberOfPeople}
Days: ${requirements.numberOfDays}

IMPORTANT RULES:
1. Optimize the trip around the total budget. Calculate: transport + hotel + local transport + activities + food + buffer.
2. The number of people must be taken into account for all costs.
3. If the budget is too low, do not fabricate cheaper prices. Explain the constraint and suggest adjustments.
4. Do NOT invent real hotel/flight prices or availability. If live APIs are not connected, provide reasonable estimates but explicitly state that they are estimated (use "estimated" or "unknown" for status).
5. Organize places by day logically, considering travel time. Do not schedule back-to-back distant locations.
6. Return ONLY a valid JSON object. No markdown, no explanations outside JSON.

Return a JSON object with this exact structure:
{
  "tripSummary": {
    "from": "...",
    "destination": "...",
    "days": 0,
    "people": 0,
    "budget": 0,
    "currency": "..."
  },
  "transport": { "type": "...", "estimatedCost": 0, "status": "estimated" },
  "hotel": { "name": "...", "estimatedCost": 0, "status": "estimated" },
  "budgetBreakdown": {
    "transport": 0,
    "hotel": 0,
    "localTransport": 0,
    "activities": 0,
    "food": 0,
    "buffer": 0,
    "total": 0
  },
  "days": [
    {
      "day": 1,
      "activities": [
        {
          "name": "...",
          "location": "...",
          "startTime": "...",
          "endTime": "...",
          "duration": "...",
          "estimatedCost": 0,
          "distanceFromPrevious": "...",
          "travelTimeFromPrevious": "...",
          "description": "..."
        }
      ]
    }
  ]
}`;

    let aiMessage = "";
    let provider = "";
    
    const geminiKey = Deno.env.get("GEMINI_API_KEY");
    const groqKey = Deno.env.get("GROQ_API_KEY");

    try {
      if (!geminiKey) throw new Error("GEMINI_API_KEY not set");
      aiMessage = await callGemini(prompt, geminiKey);
      provider = "gemini";
    } catch (geminiError) {
      console.error("Gemini failed:", geminiError);
      try {
        if (!groqKey) throw new Error("GROQ_API_KEY not set");
        aiMessage = await callGroq(prompt, groqKey);
        provider = "groq";
      } catch (groqError) {
        console.error("Groq failed:", groqError);
        return new Response(
          JSON.stringify({ success: false, error: "Unable to process your trip request right now." }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        )
      }
    }

    let parsedItinerary = null;
    try {
      const cleanJson = cleanJsonResponse(aiMessage);
      parsedItinerary = JSON.parse(cleanJson);
    } catch (parseError) {
      console.error("Failed to parse AI JSON:", parseError);
      return new Response(
        JSON.stringify({ success: false, error: "AI returned invalid JSON structure." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // Return structured JSON response
    const responsePayload = {
      success: true,
      provider: provider,
      message: "I have generated your trip plan! The details are ready.",
      itinerary: parsedItinerary,
      requirements: requirements
    }

    return new Response(
      JSON.stringify(responsePayload),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})
