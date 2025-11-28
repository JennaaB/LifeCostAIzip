import type { FormData } from "@/components/LifestyleForm";

export interface EstimationResult {
  totalMonthly: number;
  totalMonthlyMin: number;
  totalMonthlyMax: number;
  city: string;
  topCategory: string;
  biggestOpportunity: string;
  goalAlignment: number;
  categories: Array<{
    name: string;
    amount: number;
    percentage: number;
    icon: any;
    color: string;
  }>;
  topDrivers: Array<{
    habit: string;
    monthlyCost: number;
    icon: any;
  }>;
  recommendations: Array<{
    title: string;
    description: string;
    savings: number;
    icon: any;
  }>;
}

export function calculateEstimates(formData: FormData): Omit<EstimationResult, 'icon'> {
  let foodDining = 0;
  let transportation = 0;
  let fitness = 0;
  let subscriptions = 0;
  let shopping = 0;

  // Food & Dining estimation
  const coffeeFreqMap: Record<string, number> = {
    "Daily": 150,
    "5-6x/week": 120,
    "3-4x/week": 60,
    "1-2x/week": 30,
    "Less than weekly": 10,
  };
  foodDining += coffeeFreqMap[formData.foodDining.coffeeFrequency] || 0;

  const deliveryFreqMap: Record<string, number> = {
    "2-3x/week": 300,
    "1x/week": 120,
    "2-3x/month": 60,
    "Less than 2x/month": 20,
    "Never": 0,
  };
  foodDining += deliveryFreqMap[formData.foodDining.deliveryFrequency] || 0;

  const diningFreqMap: Record<string, number> = {
    "2-3x/week": 200,
    "1x/week": 80,
    "2-3x/month": 40,
    "Less than 2x/month": 15,
    "Never": 0,
  };
  const diningAmount = diningFreqMap[formData.foodDining.diningOutFrequency] || 0;
  foodDining += formData.foodDining.diningStyle === "Upscale" ? diningAmount * 1.5 : diningAmount;

  // Transportation estimation
  if (formData.transportation.commuteMethod === "Personal Car") {
    const distanceMap: Record<string, number> = {
      "Less than 5km": 80,
      "5-15km": 150,
      "15-30km": 250,
      "30km+": 400,
    };
    transportation += distanceMap[formData.transportation.distance] || 0;

    if (formData.transportation.payForParking === "Yes") {
      const parkingRateMap: Record<string, number> = {
        "Per visit ($5-15)": 80,
        "Monthly permit ($50-150)": 100,
        "Daily rate": 200,
      };
      transportation += parkingRateMap[formData.transportation.parkingRateType] || 0;
    }
  } else if (formData.transportation.commuteMethod === "Public Transit") {
    const transitPassMap: Record<string, number> = {
      "Monthly pass": 120,
      "Pay-per-trip": 100,
      "Employer subsidized": 30,
    };
    transportation += transitPassMap[formData.transportation.transitPassType] || 0;
  } else if (formData.transportation.commuteMethod === "Rideshare") {
    const rideshareFreqMap: Record<string, number> = {
      "Daily": 400,
      "5-6x/week": 300,
      "3-4x/week": 150,
      "1-2x/week": 60,
      "Less than 1x/week": 20,
    };
    transportation += rideshareFreqMap[formData.transportation.rideshareTripsPerWeek] || 0;
  }

  // Health & Wellness estimation
  if (formData.fitness.hasMembership === "Yes") {
    const tierMap: Record<string, number> = {
      "Budget ($10-20/month)": 15,
      "Standard ($25-50/month)": 35,
      "Premium ($50+/month)": 70,
    };
    fitness += tierMap[formData.fitness.membershipTier] || 0;
  } else if (formData.fitness.hasMembership === "Drop-in Sessions") {
    const dropInMap: Record<string, number> = {
      "1-2x/week": 40,
      "Once a week": 20,
      "2-3x/month": 15,
      "Less than 2x/month": 5,
    };
    fitness += dropInMap[formData.fitness.dropInSessionsPerWeek] || 0;
  }

  // Wellness services
  const wellnessFreqMap: Record<string, number> = {
    "Weekly": 150,
    "Bi-weekly": 75,
    "Monthly": 40,
    "Less than monthly": 15,
  };
  if (formData.fitness.wellnessSpend.length > 0) {
    const wellnessFreq = wellnessFreqMap[formData.fitness.wellnessFrequency] || 0;
    fitness += wellnessFreq * formData.fitness.wellnessSpend.length;
  }

  // Hair salon
  const hairFreqMap: Record<string, number> = {
    "Every 2-3 weeks": 80,
    "Every 1-3 months": 40,
    "6 months or more": 15,
    "Never": 0,
  };
  const baseHairCost = hairFreqMap[formData.fitness.hairCutFrequency] || 0;
  const hairServiceMultiplier: Record<string, number> = {
    "Basic cut only": 1,
    "Cut and wash/styling": 1.3,
    "Color treatment/Extensions": 2,
  };
  fitness += baseHairCost * (hairServiceMultiplier[formData.fitness.hairServiceType] || 1);

  // Subscriptions estimation
  if (formData.subscriptions.hasSubscriptions === "Yes") {
    subscriptions += formData.subscriptions.services.length * 15;
    if (formData.subscriptions.other) {
      subscriptions += 10;
    }
  }

  // Shopping estimation
  const clothingFreqMap: Record<string, number> = {
    "Weekly": 150,
    "2-3x/month": 100,
    "Monthly": 60,
    "Few times/year": 20,
    "Rarely": 5,
  };
  const baseClothing = clothingFreqMap[formData.shopping.clothingFrequency] || 0;
  const qualityMultiplier: Record<string, number> = {
    "Budget": 0.8,
    "Mix of budget and quality": 1,
    "Quality/designer": 1.5,
  };
  shopping += baseClothing * (qualityMultiplier[formData.shopping.shoppingStyle] || 1);

  const personalCareMap: Record<string, number> = {
    "Monthly": 60,
    "Every 2-3 months": 30,
    "Few times/year": 15,
    "Rarely": 5,
  };
  shopping += personalCareMap[formData.shopping.personalCare] || 0;

  const buyingHabitMultiplier: Record<string, number> = {
    "I buy items I need plus some extras": 1,
    "I buy what I need": 0.8,
    "I frequently buy impulsively": 1.3,
  };
  shopping *= buyingHabitMultiplier[formData.shopping.buyingHabit] || 1;

  const totalMonthly = Math.round(foodDining + transportation + fitness + subscriptions + shopping);
  const totalMonthlyMin = Math.round(totalMonthly * 0.85);
  const totalMonthlyMax = Math.round(totalMonthly * 1.15);

  // Build category breakdown
  const categories = [
    { name: "Food & Dining", amount: Math.round(foodDining), color: "bg-chart-1" },
    { name: "Transportation", amount: Math.round(transportation), color: "bg-chart-2" },
    { name: "Subscriptions", amount: Math.round(subscriptions), color: "bg-chart-3" },
    { name: "Fitness & Wellness", amount: Math.round(fitness), color: "bg-chart-4" },
    { name: "Shopping", amount: Math.round(shopping), color: "bg-chart-5" },
  ].filter(c => c.amount > 0);

  const totalForPercentage = categories.reduce((sum, c) => sum + c.amount, 0);
  const categoriesWithPercentage = categories.map(c => ({
    ...c,
    percentage: totalForPercentage > 0 ? parseFloat(((c.amount / totalForPercentage) * 100).toFixed(1)) : 0,
  }));

  const topCategory = categoriesWithPercentage.length > 0 ? categoriesWithPercentage[0].name : "N/A";
  const topCategoryAmount = categoriesWithPercentage.length > 0 ? categoriesWithPercentage[0].amount : 0;

  // Determine biggest opportunity and alignment
  let biggestOpportunity = "Review your spending patterns";
  let goalAlignment = 70;

  if (formData.goals.values.includes("Financial freedom")) {
    goalAlignment = Math.max(0, 100 - Math.min(totalMonthly / 50, 100));
    if (topCategoryAmount > totalMonthly * 0.4) {
      biggestOpportunity = `Reduce ${topCategory} spending`;
    }
  }
  if (formData.goals.values.includes("Health & wellness")) {
    goalAlignment = Math.min(100, 60 + (fitness / (totalMonthly || 1)) * 40);
  }
  if (formData.goals.values.includes("Convenience")) {
    goalAlignment = Math.min(100, 70 + (transportation / (totalMonthly || 1)) * 30);
  }

  const topDrivers = categoriesWithPercentage.slice(0, 3).map(c => ({
    habit: `${c.name}: $${c.amount}/month`,
    monthlyCost: c.amount,
  }));

  const recommendations = [];
  if (formData.foodDining.deliveryFrequency !== "Never") {
    recommendations.push({
      title: "Meal Prep Sundays",
      description: "Reduce delivery orders by planning meals ahead",
      savings: Math.round(foodDining * 0.3),
    });
  }
  if (formData.foodDining.coffeeFrequency !== "Less than weekly") {
    recommendations.push({
      title: "Make Coffee at Home",
      description: "Invest in a good coffee maker for your daily fix",
      savings: Math.round(foodDining * 0.25),
    });
  }
  if (subscriptions > 30) {
    recommendations.push({
      title: "Consolidate Streaming",
      description: "Keep 2-3 favorites, rotate the rest seasonally",
      savings: Math.round(subscriptions * 0.5),
    });
  }

  return {
    totalMonthly,
    totalMonthlyMin,
    totalMonthlyMax,
    city: "Calgary",
    topCategory,
    biggestOpportunity,
    goalAlignment: Math.round(goalAlignment),
    categories: categoriesWithPercentage.map(c => ({
      ...c,
      icon: null,
    })) as any,
    topDrivers: topDrivers.map(d => ({
      ...d,
      icon: null,
    })) as any,
    recommendations: recommendations.map(r => ({
      ...r,
      icon: null,
    })) as any,
  };
}
