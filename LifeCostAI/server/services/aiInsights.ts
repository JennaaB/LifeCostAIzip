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
