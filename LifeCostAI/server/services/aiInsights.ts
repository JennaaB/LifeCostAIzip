import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
// Using gpt-4o-mini for cost-effective insights generation
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface FormData {
  foodDining: {
    coffeeFrequency: string;
    deliveryFrequency: string;
    diningOutFrequency: string;
    diningStyle: string;
  };
  transportation: {
    commuteMethod: string;
    distance?: string;
    payForParking?: string;
    parkingRateType?: string;
    transitPassType?: string;
    rideshareTripsPerWeek?: string;
  };
  fitness: {
    hasMembership: string;
    membershipTier?: string;
    dropInSessionsPerWeek?: string;
    wellnessSpend: string[];
    wellnessFrequency: string;
    hairCutFrequency: string;
    hairServiceType: string;
    personalCare: string;
  };
  subscriptions: {
    hasSubscriptions: string;
    services: string[];
    other?: string;
  };
  shopping: {
    clothingFrequency: string;
    shoppingStyle: string;
    buyingHabit: string;
  };
  social: {
    socializingStyle: string;
    hostingFrequency?: string;
    hostingStyle?: string;
    casualFrequency?: string;
    casualType?: string;
    activeFrequency?: string;
    activeType?: string;
    nightlifeFrequency?: string;
    nightlifeStyle?: string;
    buyingRounds?: string;
  };
  goals: {
    values: string[];
  };
}

export interface AIRecommendation {
  title: string;
  description: string;
  savings: number;
}

export interface AIInsightsResponse {
  recommendations: AIRecommendation[];
  biggestOpportunity: string;
  personalizedMessage: string;
}

export interface CityCostEstimate {
  cityName: string;
  country: string;
  totalMonthly: number;
  categories: {
    coffeeDrinks: number;
    diningOut: number;
    deliveryTakeout: number;
    transportation: number;
    streaming: number;
    appsServices: number;
    gymFitness: number;
    wellnessSelfCare: number;
    wardrobeStyle: number;
    hobbiesExtras: number;
    nightsOut: number;
    casualHangouts: number;
  };
  insights: string[];
  costOfLivingIndex: number;
}

export interface CityCostComparisonResponse {
  cities: CityCostEstimate[];
  comparisonNotes: string;
}

export async function generateCityCostComparison(
  formData: FormData,
  selectedCities: string[],
  baselineTotal: number
): Promise<CityCostComparisonResponse> {
  try {
    const prompt = `You are a cost-of-living expert with current knowledge of prices in major cities worldwide. 
Based on the user's lifestyle habits, estimate what their EXACT monthly costs would be in each selected city using current 2024/2025 market prices.

User's Lifestyle Habits:
- Coffee: ${formData.foodDining.coffeeFrequency}
- Food Delivery: ${formData.foodDining.deliveryFrequency}
- Dining Out: ${formData.foodDining.diningOutFrequency} (${formData.foodDining.diningStyle || "casual"} style)
- Transportation: ${formData.transportation.commuteMethod}${formData.transportation.rideshareTripsPerWeek ? `, rideshare ${formData.transportation.rideshareTripsPerWeek}` : ""}
- Fitness: ${formData.fitness.hasMembership === "Yes" ? `Gym member (${formData.fitness.membershipTier || "standard"})` : "No gym membership"}
- Wellness: ${formData.fitness.wellnessSpend?.join(", ") || "None"}
- Subscriptions: ${formData.subscriptions.hasSubscriptions === "yes" ? formData.subscriptions.services.join(", ") : "None"}
- Shopping: ${formData.shopping.clothingFrequency}, ${formData.shopping.shoppingStyle}
- Social: ${formData.social.socializingStyle}${formData.social.nightlifeFrequency ? `, nightlife ${formData.social.nightlifeFrequency}` : ""}

Cities to analyze: ${selectedCities.join(", ")}
User's baseline monthly total: $${baselineTotal}

For each city, provide realistic monthly cost estimates in USD based on current local prices. Consider:
- Coffee shop prices (Starbucks, local cafes)
- Restaurant prices (casual vs upscale dining)
- Food delivery fees and markups
- Public transit passes vs rideshare costs
- Gym membership rates
- Streaming service prices (may vary by region)
- Shopping costs (local vs international brands)
- Nightlife costs (drinks, entertainment)

Respond in JSON format:
{
  "cities": [
    {
      "cityName": "City Name",
      "country": "Country",
      "totalMonthly": number,
      "categories": {
        "coffeeDrinks": number,
        "diningOut": number,
        "deliveryTakeout": number,
        "transportation": number,
        "streaming": number,
        "appsServices": number,
        "gymFitness": number,
        "wellnessSelfCare": number,
        "wardrobeStyle": number,
        "hobbiesExtras": number,
        "nightsOut": number,
        "casualHangouts": number
      },
      "insights": ["2-3 short tips specific to this city"],
      "costOfLivingIndex": number (100 = baseline city)
    }
  ],
  "comparisonNotes": "Brief 2-3 sentence summary of key differences"
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert on global cost of living with up-to-date knowledge of prices in major cities. Provide accurate, realistic cost estimates based on current market prices. Use USD for all amounts."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.5,
      max_tokens: 2000,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      cities: result.cities || [],
      comparisonNotes: result.comparisonNotes || "Cost comparison generated based on current market data."
    };
  } catch (error) {
    console.error("Error generating city cost comparison:", error);
    throw new Error("Failed to generate city cost comparison");
  }
}

export async function generatePersonalizedInsights(
  formData: FormData,
  estimatedTotal: number,
  topCategory: string
): Promise<AIInsightsResponse> {
  try {
    const prompt = `You are a personal finance advisor analyzing a user's lifestyle spending habits. Based on their responses, provide personalized, actionable recommendations.

User's Spending Profile:
- Estimated Monthly Total: $${estimatedTotal}
- Top Spending Category: ${topCategory}
- Financial Goals: ${formData.goals.values.join(", ")}

Lifestyle Habits:
- Coffee: ${formData.foodDining.coffeeFrequency}
- Food Delivery: ${formData.foodDining.deliveryFrequency}
- Dining Out: ${formData.foodDining.diningOutFrequency} (${formData.foodDining.diningStyle} style)
- Transportation: ${formData.transportation.commuteMethod}
- Fitness: ${formData.fitness.hasMembership}
- Subscriptions: ${formData.subscriptions.hasSubscriptions === "Yes" ? formData.subscriptions.services.join(", ") : "None"}
- Shopping: ${formData.shopping.clothingFrequency}, ${formData.shopping.shoppingStyle}
- Social: ${formData.social.socializingStyle}

Provide:
1. Three specific, actionable recommendations with realistic monthly savings estimates
2. The biggest opportunity for improvement (one short phrase like "Reduce dining out" or "Cut subscription costs")
3. A brief personalized message (2-3 sentences) encouraging the user based on their goals

Respond in JSON format:
{
  "recommendations": [
    {"title": "Short title", "description": "Specific actionable advice", "savings": number},
    {"title": "Short title", "description": "Specific actionable advice", "savings": number},
    {"title": "Short title", "description": "Specific actionable advice", "savings": number}
  ],
  "biggestOpportunity": "Short phrase",
  "personalizedMessage": "2-3 encouraging sentences"
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful personal finance advisor who provides practical, non-judgmental spending advice. Focus on small, achievable changes that align with users' values and goals."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 800,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      recommendations: result.recommendations || [],
      biggestOpportunity: result.biggestOpportunity || "Review your spending patterns",
      personalizedMessage: result.personalizedMessage || "Great job tracking your spending habits!"
    };
  } catch (error) {
    console.error("Error generating AI insights:", error);
    throw new Error("Failed to generate personalized insights");
  }
}
