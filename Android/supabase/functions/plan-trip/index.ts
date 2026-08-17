const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface RequestPayload {
  from: string;
  to: string;
  budget: number;
  people: number;
  days: number;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const payload: RequestPayload = await req.json();
    const { from, to, budget, people, days } = payload;

    if (!from || !to || budget === undefined || people === undefined || !days) {
      return new Response(JSON.stringify({ error: 'Missing required parameters: from, to, budget, people, days are required.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    const groqApiKey = Deno.env.get('GROQ_API_KEY');

    if (!geminiApiKey && !groqApiKey) {
      return new Response(JSON.stringify({ error: 'API keys are missing in function configuration.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const prompt = `You are an expert travel planner. Create a highly detailed and realistic trip itinerary based on the following details:
- From Location: ${from}
- Destination Location: ${to}
- Budget (INR): ${budget}
- Number of People: ${people}
- Duration (Days): ${days}

You must respond with a JSON object that strictly adheres to this schema:
{
  "trip_title": "string",
  "total_budget": number (should match input budget),
  "estimated_cost": number (estimated cost of the trip, must be less than or equal to total_budget),
  "currency": "INR",
  "travel_summary": {
    "recommended_mode": "string (e.g. Flight, Train, Cab)",
    "estimated_travel_time": "string"
  },
  "mid_spots_on_route": [
    {
      "name": "string",
      "type": "string",
      "stop_duration": "string",
      "highlights": "string"
    }
  ],
  "hotel_recommendations": [
    {
      "hotel_name": "string",
      "area": "string",
      "price_per_night": number,
      "tag": "string (e.g. Budget, Luxury, Family)"
    }
  ],
  "daily_itinerary": [
    {
      "day_number": number,
      "title": "string",
      "schedule": [
        {
          "time": "string (e.g. 09:00 AM)",
          "activity": "string",
          "estimated_cost": number
        }
      ]
    }
  ],
  "important_guidelines": ["string"]
}

Rules:
1. All costs and prices must be in INR.
2. The daily_itinerary must contain exactly ${days} days, with day_number from 1 to ${days}.
3. The estimated_cost should be a realistic estimate within the budget.
4. Output strictly a JSON object. No markdown wrappers (like \`\`\`json), no intro, and no outro.`;

    let responseData: any = null;
    let primaryError: any = null;

    // 1. Try Gemini
    if (geminiApiKey) {
      try {
        console.log('Attempting trip generation with primary provider: Gemini...');
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${geminiApiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [{ text: prompt }],
                },
              ],
              generationConfig: {
                responseMimeType: 'application/json',
                responseSchema: {
                  type: 'object',
                  properties: {
                    trip_title: { type: 'string' },
                    total_budget: { type: 'number' },
                    estimated_cost: { type: 'number' },
                    currency: { type: 'string', enum: ['INR'] },
                    travel_summary: {
                      type: 'object',
                      properties: {
                        recommended_mode: { type: 'string' },
                        estimated_travel_time: { type: 'string' },
                      },
                      required: ['recommended_mode', 'estimated_travel_time'],
                    },
                    mid_spots_on_route: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                          type: { type: 'string' },
                          stop_duration: { type: 'string' },
                          highlights: { type: 'string' },
                        },
                        required: ['name', 'type', 'stop_duration', 'highlights'],
                      },
                    },
                    hotel_recommendations: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          hotel_name: { type: 'string' },
                          area: { type: 'string' },
                          price_per_night: { type: 'number' },
                          tag: { type: 'string' },
                        },
                        required: ['hotel_name', 'area', 'price_per_night', 'tag'],
                      },
                    },
                    daily_itinerary: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          day_number: { type: 'number' },
                          title: { type: 'string' },
                          schedule: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                time: { type: 'string' },
                                activity: { type: 'string' },
                                estimated_cost: { type: 'number' },
                              },
                              required: ['time', 'activity', 'estimated_cost'],
                            },
                          },
                        },
                        required: ['day_number', 'title', 'schedule'],
                      },
                    },
                    important_guidelines: {
                      type: 'array',
                      items: { type: 'string' },
                    },
                  },
                  required: [
                    'trip_title',
                    'total_budget',
                    'estimated_cost',
                    'currency',
                    'travel_summary',
                    'mid_spots_on_route',
                    'hotel_recommendations',
                    'daily_itinerary',
                    'important_guidelines',
                  ],
                },
              },
            }),
          }
        );

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Gemini API returned status ${response.status}: ${errText}`);
        }

        const result = await response.json();
        const textContent = result?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!textContent) {
          throw new Error('Gemini API returned an empty or invalid content structure.');
        }

        responseData = cleanAndParseJSON(textContent);
      } catch (err) {
        primaryError = err;
        console.error('Gemini primary provider failed:', err);
      }
    } else {
      primaryError = new Error('Gemini API key is not configured.');
    }

    // 2. Try Fallback (Groq) if Gemini failed or is not available
    if (!responseData) {
      if (groqApiKey) {
        try {
          console.log('Attempting trip generation with fallback provider: Groq (qwen/qwen3.6-27b)...');
          const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${groqApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'qwen/qwen3.6-27b',
              messages: [
                {
                  role: 'system',
                  content: 'You are an expert travel planning assistant. You must output only a valid JSON object matching the requested schema. Do not include any explanations, markdown code blocks, or preamble.',
                },
                {
                  role: 'user',
                  content: prompt,
                },
              ],
              response_format: {
                type: 'json_object',
              },
              temperature: 0.3,
            }),
          });

          if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Groq API returned status ${response.status}: ${errText}`);
          }

          const result = await response.json();
          const textContent = result?.choices?.[0]?.message?.content;
          if (!textContent) {
            throw new Error('Groq API returned an empty or invalid content structure.');
          }

          responseData = cleanAndParseJSON(textContent);
        } catch (fallbackErr) {
          console.error('Groq fallback provider also failed:', fallbackErr);
          return new Response(
            JSON.stringify({
              error: 'Both Gemini and Groq pipelines failed to generate the trip plan.',
              primary_error: primaryError?.message || String(primaryError),
              fallback_error: fallbackErr instanceof Error ? fallbackErr.message : String(fallbackErr),
            }),
            {
              status: 502,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }
      } else {
        return new Response(
          JSON.stringify({
            error: 'Gemini pipeline failed and Groq API key is not configured as a fallback.',
            primary_error: primaryError?.message || String(primaryError),
          }),
          {
            status: 502,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Request processing error:', err);
    return new Response(
      JSON.stringify({
        error: 'Failed to process request or parse JSON payload.',
        details: err instanceof Error ? err.message : String(err),
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function cleanAndParseJSON(text: string): any {
  let cleanText = text.trim();
  if (cleanText.startsWith('```json')) {
    cleanText = cleanText.substring(7);
  } else if (cleanText.startsWith('```')) {
    cleanText = cleanText.substring(3);
  }
  if (cleanText.endsWith('```')) {
    cleanText = cleanText.substring(0, cleanText.length - 3);
  }
  return JSON.parse(cleanText.trim());
}
