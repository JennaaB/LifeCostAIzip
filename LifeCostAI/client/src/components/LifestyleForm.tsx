import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Coffee, Car, Home, Dumbbell, Tv, ShoppingBag, Users, Target, ClipboardCheck, Check } from "lucide-react";
import FoodDiningStep from "./form-steps/FoodDiningStep";
import TransportationStep from "./form-steps/TransportationStep";
import HousingStep from "./form-steps/HousingStep";
import FitnessStep from "./form-steps/FitnessStep";
import SubscriptionsStep from "./form-steps/SubscriptionsStep";
import ShoppingStep from "./form-steps/ShoppingStep";
import SocialStep from "./form-steps/SocialStep";
import GoalsStep from "./form-steps/GoalsStep";
import ReviewStep from "./form-steps/ReviewStep";

export interface FormData {
  foodDining: {
    coffeeFrequency: string;
    deliveryFrequency: string;
    diningOutFrequency: string;
    diningStyle: string;
    groceryShopping: string;
    groceryStyle: string;
  };
  transportation: {
    commuteMethod: string;
    distance: string;
    rideshareTripsPerWeek: string;
    payForParking: string;
    parkingRateType: string;
    transitPassType: string;
    carType: string;
  };
  housing: {
    livingSituation: string;
    housingTier: string;
    locationType: string;
    paysMortgage: string;
  };
  fitness: {
    hasMembership: string;
    membershipTier: string;
    dropInSessionsPerWeek: string;
    wellnessSpend: string[];
    wellnessOther: string;
    wellnessFrequency: string;
    hairCutFrequency: string;
    hairServiceType: string;
    personalCare: string;
  };
  subscriptions: {
    hasSubscriptions: string;
    services: string[];
    other: string;
  };
  shopping: {
    clothingFrequency: string;
    buyingHabit: string;
    shoppingStyle: string;
  };
  social: {
    socializingStyle: string;
    hostingFrequency: string;
    hostingStyle: string;
    casualFrequency: string;
    casualType: string;
    activeFrequency: string;
    activeType: string;
    nightlifeFrequency: string;
    nightlifeStyle: string;
    buyingRounds: string;
  };
  goals: {
    primaryGoal: string;
    values: string[];
  };
}

const initialFormData: FormData = {
  foodDining: { coffeeFrequency: "", deliveryFrequency: "", diningOutFrequency: "", diningStyle: "", groceryShopping: "", groceryStyle: "" },
  transportation: { commuteMethod: "", distance: "", rideshareTripsPerWeek: "", payForParking: "", parkingRateType: "", transitPassType: "", carType: "" },
  housing: { livingSituation: "", housingTier: "", locationType: "", paysMortgage: "" },
  fitness: { hasMembership: "", membershipTier: "", dropInSessionsPerWeek: "", wellnessSpend: [], wellnessOther: "", wellnessFrequency: "", hairCutFrequency: "", hairServiceType: "", personalCare: "" },
  subscriptions: { hasSubscriptions: "", services: [], other: "" },
  shopping: { clothingFrequency: "", buyingHabit: "", shoppingStyle: "" },
  social: { socializingStyle: "", hostingFrequency: "", hostingStyle: "", casualFrequency: "", casualType: "", activeFrequency: "", activeType: "", nightlifeFrequency: "", nightlifeStyle: "", buyingRounds: "" },
  goals: { primaryGoal: "", values: [] },
};

interface LifestyleFormProps {
  onSubmit: (data: FormData) => void;
  onBack?: () => void;
}

export default function LifestyleForm({ onSubmit, onBack }: LifestyleFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const steps = [
    { 
      title: "Food & Dining", 
      icon: Coffee, 
      description: "Tell us about your eating and dining habits",
      component: FoodDiningStep 
    },
    { 
      title: "Transportation", 
      icon: Car, 
      description: "How do you get around?",
      component: TransportationStep 
    },
    { 
      title: "Housing", 
      icon: Home, 
      description: "Your living situation and costs",
      component: HousingStep 
    },
    { 
      title: "Health & Wellness", 
      icon: Dumbbell, 
      description: "Your health and self-care routines",
      component: FitnessStep 
    },
    { 
      title: "Subscriptions", 
      icon: Tv, 
      description: "Digital services you pay for",
      component: SubscriptionsStep 
    },
    { 
      title: "Shopping", 
      icon: ShoppingBag, 
      description: "Your shopping style and habits",
      component: ShoppingStep 
    },
    { 
      title: "Social", 
      icon: Users, 
      description: "How you spend time with others",
      component: SocialStep 
    },
    { 
      title: "Goals & Values", 
      icon: Target, 
      description: "What matters most to you",
      component: GoalsStep 
    },
    { 
      title: "Review", 
      icon: ClipboardCheck, 
      description: "Confirm your answers",
      component: ReviewStep 
    },
  ];

  const CurrentStepComponent = steps[currentStep].component;
  const CurrentIcon = steps[currentStep].icon;

  const isStepComplete = (stepIndex: number): boolean => {
    const fd = formData.foodDining;
    const tr = formData.transportation;
    const fi = formData.fitness;
    const su = formData.subscriptions;
    const sh = formData.shopping;
    const so = formData.social || initialFormData.social;
    const go = formData.goals;

    switch (stepIndex) {
      case 0: {
        const baseComplete = !!(fd.coffeeFrequency && fd.deliveryFrequency && fd.diningOutFrequency);
        if (!baseComplete) return false;
        if (fd.diningOutFrequency !== "Never" && !fd.diningStyle) return false;
        return true;
      }
      case 1: {
        if (!tr.commuteMethod || !tr.rideshareTripsPerWeek) return false;
        if (tr.commuteMethod === "Personal Car") {
          if (!tr.payForParking) return false;
          if (tr.payForParking === "Yes" && !tr.parkingRateType) return false;
        }
        if (tr.commuteMethod === "Public Transit" && !tr.transitPassType) return false;
        return true;
      }
      case 2: {
        if (!fi.hasMembership) return false;
        if (fi.hasMembership === "yes" && !fi.membershipTier) return false;
        if (fi.hasMembership === "no" && !fi.dropInSessionsPerWeek) return false;
        if (!fi.hairCutFrequency) return false;
        if (fi.hairCutFrequency !== "Never" && !fi.hairServiceType) return false;
        const hasActiveWellness = fi.wellnessSpend.length > 0 && fi.wellnessSpend.some(w => w !== "None");
        if (hasActiveWellness && !fi.wellnessFrequency) return false;
        if (!fi.personalCare) return false;
        return true;
      }
      case 3: {
        if (!su.hasSubscriptions) return false;
        if (su.hasSubscriptions === "yes" && su.services.length === 0 && !su.other) return false;
        return true;
      }
      case 4:
        return !!(sh.clothingFrequency && sh.buyingHabit && sh.shoppingStyle);
      case 5: {
        if (!so.socializingStyle) return false;
        if (so.socializingStyle === "At-home") {
          if (!so.hostingFrequency) return false;
          if (so.hostingFrequency && !so.hostingStyle) return false;
        }
        if (so.socializingStyle === "Casual outings") {
          if (!so.casualFrequency) return false;
          if (so.casualFrequency && !so.casualType) return false;
        }
        if (so.socializingStyle === "Active plans") {
          if (!so.activeFrequency) return false;
          if (so.activeFrequency && !so.activeType) return false;
        }
        if (so.socializingStyle === "Going-out/nightlife") {
          if (!so.nightlifeFrequency) return false;
          if (so.nightlifeFrequency && !so.nightlifeStyle) return false;
          if (so.nightlifeStyle && !so.buyingRounds) return false;
        }
        return true;
      }
      case 6:
        return !!(go.primaryGoal && go.values.length >= 1);
      case 7:
        return true;
      default:
        return false;
    }
  };

  const calculateProgress = () => {
    const fd = formData.foodDining;
    const tr = formData.transportation;
    const fi = formData.fitness;
    const su = formData.subscriptions;
    const sh = formData.shopping;
    const so = formData.social || initialFormData.social;
    const go = formData.goals;

    let answeredQuestions = 0;
    let totalQuestions = 0;

    totalQuestions += 3;
    if (fd.coffeeFrequency) answeredQuestions++;
    if (fd.deliveryFrequency) answeredQuestions++;
    if (fd.diningOutFrequency) answeredQuestions++;
    
    if (fd.diningOutFrequency && fd.diningOutFrequency !== "Never") {
      totalQuestions += 1;
      if (fd.diningStyle) answeredQuestions++;
    }

    totalQuestions += 2;
    if (tr.commuteMethod) answeredQuestions++;
    if (tr.rideshareTripsPerWeek) answeredQuestions++;

    if (tr.commuteMethod === "Personal Car") {
      totalQuestions += 1;
      if (tr.payForParking) answeredQuestions++;
      if (tr.payForParking === "Yes") {
        totalQuestions += 1;
        if (tr.parkingRateType) answeredQuestions++;
      }
    } else if (tr.commuteMethod === "Public Transit") {
      totalQuestions += 1;
      if (tr.transitPassType) answeredQuestions++;
    }

    totalQuestions += 2;
    if (fi.hasMembership) answeredQuestions++;
    if (fi.hairCutFrequency) answeredQuestions++;

    if (fi.hasMembership === "yes") {
      totalQuestions += 1;
      if (fi.membershipTier) answeredQuestions++;
    } else if (fi.hasMembership === "no") {
      totalQuestions += 1;
      if (fi.dropInSessionsPerWeek) answeredQuestions++;
    }

    totalQuestions += 1;
    if (fi.wellnessSpend.length > 0) answeredQuestions++;

    if (fi.wellnessSpend.length > 0 && !fi.wellnessSpend.every(item => item === "None")) {
      totalQuestions += 1;
      if (fi.wellnessFrequency) answeredQuestions++;
    }

    if (fi.hairCutFrequency && fi.hairCutFrequency !== "Never") {
      totalQuestions += 1;
      if (fi.hairServiceType) answeredQuestions++;
    }

    totalQuestions += 1;
    if (fi.personalCare) answeredQuestions++;

    totalQuestions += 1;
    if (su.hasSubscriptions) answeredQuestions++;

    if (su.hasSubscriptions === "yes") {
      totalQuestions += 1;
      if (su.services.length > 0) answeredQuestions++;
    }

    totalQuestions += 3;
    if (sh.clothingFrequency) answeredQuestions++;
    if (sh.buyingHabit) answeredQuestions++;
    if (sh.shoppingStyle) answeredQuestions++;

    totalQuestions += 1;
    if (so.socializingStyle) answeredQuestions++;

    if (so.socializingStyle === "At-home") {
      totalQuestions += 2;
      if (so.hostingFrequency) answeredQuestions++;
      if (so.hostingStyle) answeredQuestions++;
    } else if (so.socializingStyle === "Casual outings") {
      totalQuestions += 2;
      if (so.casualFrequency) answeredQuestions++;
      if (so.casualType) answeredQuestions++;
    } else if (so.socializingStyle === "Active plans") {
      totalQuestions += 2;
      if (so.activeFrequency) answeredQuestions++;
      if (so.activeType) answeredQuestions++;
    } else if (so.socializingStyle === "Going-out/nightlife") {
      totalQuestions += 3;
      if (so.nightlifeFrequency) answeredQuestions++;
      if (so.nightlifeStyle) answeredQuestions++;
      if (so.buyingRounds) answeredQuestions++;
    }

    totalQuestions += 2;
    if (go.primaryGoal) answeredQuestions++;
    if (go.values.length >= 1) answeredQuestions++;

    const progress = (answeredQuestions / totalQuestions) * 100;
    return Math.min(progress, 99);
  };

  const progress = calculateProgress();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (onBack) {
      onBack();
    }
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex <= currentStep || isStepComplete(stepIndex - 1)) {
      setCurrentStep(stepIndex);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="hidden md:block mb-8 lg:mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10" />
            <div 
              className="absolute top-5 left-0 h-0.5 bg-primary -z-10 transition-all duration-500" 
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }} 
            />
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              const isAccessible = index <= currentStep || isStepComplete(index - 1);
              
              return (
                <button
                  key={step.title}
                  onClick={() => goToStep(index)}
                  disabled={!isAccessible}
                  className={`flex flex-col items-center transition-all duration-300 ${
                    isAccessible ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? "bg-primary text-primary-foreground scale-110 shadow-lg" 
                      : isCompleted
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}>
                    {isCompleted ? <Check className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
                  </div>
                  <span className={`mt-2 text-xs font-medium transition-colors ${
                    isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="md:hidden mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                <CurrentIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Step {currentStep + 1} of {steps.length}</p>
                <h2 className="text-lg font-semibold">{steps[currentStep].title}</h2>
              </div>
            </div>
            <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" data-testid="progress-form" />
        </div>

        <div className="hidden md:block mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" data-testid="progress-form-desktop" />
        </div>

        <Card className="p-6 sm:p-8 lg:p-10 shadow-sm border-muted/50">
          <div className="hidden md:block mb-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <CurrentIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold">{steps[currentStep].title}</h2>
                <p className="text-muted-foreground">{steps[currentStep].description}</p>
              </div>
            </div>
          </div>
          
          <div className="md:hidden mb-6">
            <p className="text-muted-foreground">{steps[currentStep].description}</p>
          </div>

          <div className="min-h-[400px] sm:min-h-[450px] lg:min-h-[500px]">
            <CurrentStepComponent
              data={formData}
              onChange={setFormData}
            />
          </div>
        </Card>

        <div className="flex justify-between gap-4 mt-6 sm:mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={handleBack}
            className="flex-1 sm:flex-none sm:min-w-[140px] h-12 sm:h-14"
            data-testid="button-form-back"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          
          <Button
            size="lg"
            onClick={handleNext}
            className="flex-1 sm:flex-none sm:min-w-[180px] h-12 sm:h-14"
            data-testid="button-form-continue"
          >
            {currentStep === steps.length - 1 ? "Generate Insights" : "Continue"}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
