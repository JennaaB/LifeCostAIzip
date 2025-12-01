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
  let social = 0;
  
  // Track subcategory amounts
  let coffeeDrinks = 0;
  let diningOut = 0;
  let deliveryTakeout = 0;
  let streamingAmount = 0;
  let appsServicesAmount = 0;
  let gymFitnessAmount = 0;
  let wellnessSelfCareAmount = 0;
  let wardrobeStyleAmount = 0;
  let nightsOutAmount = 0;
  let casualHangoutsAmount = 0;

  // Food & Dining estimation - values match form options
  const coffeeFreqMap: Record<string, number> = {
    "Daily": 150,
    "Often (2-3x/week)": 90,
    "Sometimes (1x/week)": 30,
    "Rarely (1-2x/month)": 10,
    "Never": 0,
  };
  coffeeDrinks = coffeeFreqMap[formData.foodDining.coffeeFrequency] || 0;
  foodDining += coffeeDrinks;

  const deliveryFreqMap: Record<string, number> = {
    "Daily": 600,
    "Often (2-3x/week)": 300,
    "Sometimes (1x/week)": 120,
    "Rarely (1-2x/month)": 40,
    "Never": 0,
  };
  deliveryTakeout = deliveryFreqMap[formData.foodDining.deliveryFrequency] || 0;
  foodDining += deliveryTakeout;

  const diningFreqMap: Record<string, number> = {
    "Daily": 400,
    "Often (2-3x/week)": 200,
    "Sometimes (1x/week)": 80,
    "Rarely (1-2x/month)": 30,
    "Never": 0,
  };
  const diningAmount = diningFreqMap[formData.foodDining.diningOutFrequency] || 0;
  const isUpscale = formData.foodDining.diningStyle?.includes("fine dining") || formData.foodDining.diningStyle?.includes("premium");
  diningOut = isUpscale ? diningAmount * 1.5 : diningAmount;
  foodDining += diningOut;

  // Grocery shopping estimation
  if (formData.foodDining.groceryShopping === "Yes") {
    const groceryStyleMap: Record<string, number> = {
      "Budget-conscious": 300,
      "Mixed approach": 450,
      "Premium & organic": 650,
    };
    const groceryAmount = groceryStyleMap[formData.foodDining.groceryStyle] || 400;
    foodDining += groceryAmount;
  }

  // Transportation estimation - values match form options
  if (formData.transportation.commuteMethod === "Personal Car") {
    // Base cost for driving based on car type
    const carTypeCostMap: Record<string, number> = {
      "Budget": 150,
      "Mid-range": 250,
      "Luxury": 400,
    };
    transportation += carTypeCostMap[formData.transportation.carType] || 200;

    if (formData.transportation.payForParking === "Yes") {
      const parkingRateMap: Record<string, number> = {
        "Hourly rate": 150,
        "Daily rate": 200,
        "Monthly pass": 100,
        "Seasonal pass": 80,
      };
      transportation += parkingRateMap[formData.transportation.parkingRateType] || 0;
    }
  } else if (formData.transportation.commuteMethod === "Public Transit") {
    const transitPassMap: Record<string, number> = {
      "Daily rate": 150,
      "Monthly pass": 100,
      "Free (school/employer provided)": 0,
    };
    transportation += transitPassMap[formData.transportation.transitPassType] || 0;
  } else if (formData.transportation.commuteMethod === "Rideshare (Uber/Lyft)") {
    transportation += 300; // Base rideshare commute cost
  }
  
  // Additional rideshare trips per week
  const rideshareFreqMap: Record<string, number> = {
    "Daily": 600,
    "Several times a week": 400,
    "Weekly (1-2x)": 150,
    "A few times a month": 80,
    "About once a month": 30,
    "Rarely (less than monthly)": 10,
    "Never": 0,
  };
  transportation += rideshareFreqMap[formData.transportation.rideshareTripsPerWeek] || 0;

  // Health & Wellness estimation - form uses "yes"/"no" lowercase
  if (formData.fitness.hasMembership === "yes") {
    const tierMap: Record<string, number> = {
      "basic": 25,
      "mid-tier": 50,
      "premium": 90,
    };
    gymFitnessAmount = tierMap[formData.fitness.membershipTier] || 0;
    fitness += gymFitnessAmount;
  } else if (formData.fitness.hasMembership === "no") {
    // Drop-in sessions when no membership
    const dropInMap: Record<string, number> = {
      "Never": 0,
      "1-2 per week": 40,
      "3-4 per week": 80,
      "5-6 per week": 120,
      "Daily": 150,
    };
    gymFitnessAmount = dropInMap[formData.fitness.dropInSessionsPerWeek] || 0;
    fitness += gymFitnessAmount;
  }

  // Wellness services
  const wellnessFreqMap: Record<string, number> = {
    "Weekly": 150,
    "Bi-weekly": 75,
    "Monthly": 40,
    "Less than monthly": 15,
  };
  let wellnessAmount = 0;
  if (formData.fitness.wellnessSpend.length > 0) {
    const wellnessFreq = wellnessFreqMap[formData.fitness.wellnessFrequency] || 0;
    wellnessAmount = wellnessFreq * formData.fitness.wellnessSpend.length;
    fitness += wellnessAmount;
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
  const hairAmount = baseHairCost * (hairServiceMultiplier[formData.fitness.hairServiceType] || 1);
  fitness += hairAmount;

  // Personal care
  const personalCareMap: Record<string, number> = {
    "Basic (drugstore)": 15,
    "Moderate": 35,
    "Premium (salon/spa)": 60,
  };
  const personalCareAmount = personalCareMap[formData.fitness.personalCare] || 0;
  fitness += personalCareAmount;
  
  wellnessSelfCareAmount = wellnessAmount + hairAmount + personalCareAmount;

  // Subscriptions estimation - form uses "yes" lowercase
  if (formData.subscriptions.hasSubscriptions === "yes") {
    // Streaming services: Netflix, Disney+, Spotify, Crave
    const streamingServicesList = ["Netflix", "Disney+", "Spotify", "Crave"];
    const streamingServices = formData.subscriptions.services.filter(s => 
      streamingServicesList.includes(s)
    );
    
    // Apps & Services: Amazon Prime, ChatGPT, Claude, UberOne
    const otherServices = formData.subscriptions.services.filter(s => 
      !streamingServicesList.includes(s)
    );
    
    streamingAmount = streamingServices.length * 15;
    appsServicesAmount = otherServices.length * 15 + (formData.subscriptions.other ? 20 : 0);
    
    subscriptions += streamingAmount + appsServicesAmount;
  }

  // Shopping estimation - form values updated to match
  const clothingFreqMap: Record<string, number> = {
    "Multiple times per week": 200,
    "Weekly": 150,
    "2-3 times per month": 100,
    "Monthly": 60,
    "Rarely": 20,
  };
  const baseClothing = clothingFreqMap[formData.shopping.clothingFrequency] || 0;
  const qualityMultiplier: Record<string, number> = {
    "Wait for sales & discounts": 0.7,
    "Balanced budget & quality": 1,
    "Premium high-quality items": 1.5,
  };
  const buyingHabitMultiplier: Record<string, number> = {
    "Planned (intentional)": 0.8,
    "Mix of both": 1,
    "Spontaneous (impulsive)": 1.3,
  };
  wardrobeStyleAmount = baseClothing * (qualityMultiplier[formData.shopping.shoppingStyle] || 1) * (buyingHabitMultiplier[formData.shopping.buyingHabit] || 1);
  shopping += wardrobeStyleAmount;

  // Social estimation
  if (formData.social.socializingStyle === "At-home") {
    const hostingFreqMap: Record<string, number> = {
      "Weekly": 100,
      "Few times a month": 60,
      "Monthly": 30,
      "Few times a year": 10,
    };
    casualHangoutsAmount += hostingFreqMap[formData.social.hostingFrequency] || 0;

    const hostingStyleMap: Record<string, number> = {
      "Snacks and drinks": 0,
      "Order food delivery": 40,
      "Cook a full meal": 30,
      "Potluck style": 0,
    };
    casualHangoutsAmount += hostingStyleMap[formData.social.hostingStyle] || 0;
    social += casualHangoutsAmount;
  } else if (formData.social.socializingStyle === "Casual outings") {
    const casualFreqMap: Record<string, number> = {
      "Multiple times a week": 150,
      "Weekly": 80,
      "Bi-weekly": 40,
      "Monthly": 20,
    };
    casualHangoutsAmount += casualFreqMap[formData.social.casualFrequency] || 0;

    const casualTypeMap: Record<string, number> = {
      "Coffee or cafe": 0,
      "Brunch or lunch": 20,
      "Movies or entertainment": 30,
      "Shopping with friends": 0,
    };
    casualHangoutsAmount += casualTypeMap[formData.social.casualType] || 0;
    social += casualHangoutsAmount;
  } else if (formData.social.socializingStyle === "Active plans") {
    const activeFreqMap: Record<string, number> = {
      "Multiple times a week": 120,
      "Weekly": 60,
      "Bi-weekly": 30,
      "Monthly": 15,
    };
    casualHangoutsAmount += activeFreqMap[formData.social.activeFrequency] || 0;

    const activeTypeMap: Record<string, number> = {
      "Hiking or outdoor sports": 0,
      "Group fitness classes": 20,
      "Sports leagues or pickup games": 40,
      "Adventure activities": 60,
    };
    casualHangoutsAmount += activeTypeMap[formData.social.activeType] || 0;
    social += casualHangoutsAmount;
  } else if (formData.social.socializingStyle === "Going-out/nightlife") {
    const nightlifeFreqMap: Record<string, number> = {
      "Multiple times a week": 300,
      "Weekly": 150,
      "Bi-weekly": 75,
      "Monthly or less": 30,
    };
    nightsOutAmount += nightlifeFreqMap[formData.social.nightlifeFrequency] || 0;

    const nightlifeStyleMap: Record<string, number> = {
      "Couple drinks at a bar": 0,
      "Dinner and drinks": 40,
      "Full night out with clubs": 60,
      "VIP or bottle service": 100,
    };
    nightsOutAmount += nightlifeStyleMap[formData.social.nightlifeStyle] || 0;

    const buyingRoundsMap: Record<string, number> = {
      "Often": 80,
      "Sometimes": 40,
      "Rarely": 10,
      "Never": 0,
    };
    nightsOutAmount += buyingRoundsMap[formData.social.buyingRounds] || 0;
    social += nightsOutAmount;
  }

  const totalMonthly = Math.round(foodDining + transportation + fitness + subscriptions + shopping + social);
  const totalMonthlyMin = Math.round(totalMonthly * 0.85);
  const totalMonthlyMax = Math.round(totalMonthly * 1.15);

  // Build 6 main category breakdown matching questionnaire sections
  const categories = [
    { name: "Food & Dining", amount: Math.round(foodDining), color: "bg-chart-1" },
    { name: "Transportation", amount: Math.round(transportation), color: "bg-chart-2" },
    { name: "Health & Wellness", amount: Math.round(fitness), color: "bg-chart-4" },
    { name: "Subscriptions", amount: Math.round(subscriptions), color: "bg-chart-3" },
    { name: "Shopping", amount: Math.round(shopping), color: "bg-chart-5" },
    { name: "Social", amount: Math.round(social), color: "bg-amber-400" },
  ];

  const totalForPercentage = categories.reduce((sum, c) => sum + c.amount, 0);
  const categoriesWithPercentage = categories.map(c => ({
    ...c,
    percentage: totalForPercentage > 0 ? parseFloat(((c.amount / totalForPercentage) * 100).toFixed(1)) : 0,
  }));
  
  const mainCategories = categoriesWithPercentage
    .filter(c => c.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  const topCategory = mainCategories.length > 0 ? mainCategories[0].name : "N/A";
  const topCategoryAmount = mainCategories.length > 0 ? mainCategories[0].amount : 0;

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

  const topDrivers = [...categoriesWithPercentage]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3)
    .map(c => ({
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
