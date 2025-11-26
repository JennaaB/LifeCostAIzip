import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FoodDiningStep from "./form-steps/FoodDiningStep";
import TransportationStep from "./form-steps/TransportationStep";
import FitnessStep from "./form-steps/FitnessStep";
import SubscriptionsStep from "./form-steps/SubscriptionsStep";
import ShoppingStep from "./form-steps/ShoppingStep";
import GoalsStep from "./form-steps/GoalsStep";
import ReviewStep from "./form-steps/ReviewStep";

export interface FormData {
  foodDining: {
    coffeeFrequency: string;
    deliveryFrequency: string;
    diningOutFrequency: string;
    diningStyle: string;
  };
  transportation: {
    commuteMethod: string;
    distance: string;
    rideshareTripsPerWeek: string;
    payForParking: string;
    parkingRateType: string;
    transitPassType: string;
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
    personalCare: string;
  };
  goals: {
    primaryGoal: string;
    values: string[];
  };
}

const initialFormData: FormData = {
  foodDining: { coffeeFrequency: "", deliveryFrequency: "", diningOutFrequency: "", diningStyle: "" },
  transportation: { commuteMethod: "", distance: "", rideshareTripsPerWeek: "", payForParking: "", parkingRateType: "", transitPassType: "" },
  fitness: { hasMembership: "", membershipTier: "", dropInSessionsPerWeek: "", wellnessSpend: [], wellnessOther: "", wellnessFrequency: "", hairCutFrequency: "", hairServiceType: "" },
  subscriptions: { hasSubscriptions: "", services: [], other: "" },
  shopping: { clothingFrequency: "", buyingHabit: "", shoppingStyle: "", personalCare: "" },
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
    { title: "Food & Dining", component: FoodDiningStep },
    { title: "Transportation", component: TransportationStep },
    { title: "Fitness & Wellness", component: FitnessStep },
    { title: "Subscriptions", component: SubscriptionsStep },
    { title: "Shopping", component: ShoppingStep },
    { title: "Goals & Values", component: GoalsStep },
    { title: "Review & Submit", component: ReviewStep },
  ];

  const CurrentStepComponent = steps[currentStep].component;

  const calculateProgress = () => {
    const fd = formData.foodDining;
    const tr = formData.transportation;
    const fi = formData.fitness;
    const su = formData.subscriptions;
    const sh = formData.shopping;
    const go = formData.goals;

    let completedSteps = 0;

    // Check Food & Dining
    if (fd.coffeeFrequency && fd.deliveryFrequency && fd.diningOutFrequency) {
      if (fd.diningOutFrequency !== "Never" && !fd.diningStyle) {
        // diningStyle is required if they dine out
      } else {
        completedSteps++;
      }
    }

    // Check Transportation
    if (tr.commuteMethod && tr.distance) {
      if (tr.commuteMethod === "Rideshare" && !tr.rideshareTripsPerWeek) {
        // rideshareTripsPerWeek required for rideshare
      } else if (tr.commuteMethod === "Personal Car" && tr.payForParking === "" && !tr.parkingRateType) {
        // check parking if applicable
      } else if (tr.commuteMethod === "Public Transit" && !tr.transitPassType) {
        // transitPassType required for public transit
      } else {
        completedSteps++;
      }
    }

    // Check Fitness & Wellness
    if (fi.hasMembership) {
      let fitnessComplete = true;
      if (fi.hasMembership === "Yes" && !fi.membershipTier) fitnessComplete = false;
      if (fi.hasMembership === "Drop-in Sessions" && !fi.dropInSessionsPerWeek) fitnessComplete = false;
      if (fi.wellnessSpend.length === 0 && !fi.wellnessOther) fitnessComplete = false;
      if (fi.wellnessSpend.length > 0 && !fi.wellnessFrequency) fitnessComplete = false;
      if (fi.hairCutFrequency && fi.hairCutFrequency !== "Never" && !fi.hairServiceType) fitnessComplete = false;
      if (fitnessComplete) completedSteps++;
    }

    // Check Subscriptions
    if (su.hasSubscriptions) {
      if (su.hasSubscriptions === "Yes" && su.services.length === 0) {
        // need to select services
      } else {
        completedSteps++;
      }
    }

    // Check Shopping
    if (sh.clothingFrequency && sh.buyingHabit && sh.shoppingStyle && sh.personalCare) {
      completedSteps++;
    }

    // Check Goals
    if (go.primaryGoal && go.values.length === 3) {
      completedSteps++;
    }

    // Current step bonus for being on that step (only if user started answering)
    const hasStartedAnswering = completedSteps > 0;
    if (hasStartedAnswering) {
      const baseProgress = (completedSteps / (steps.length - 1)) * 100; // -1 for review step
      const stepBonus = ((currentStep + 1) / steps.length) * 10; // Small bonus for navigating steps
      return Math.min(baseProgress + stepBonus, 99); // Cap at 99% until submitted
    }

    return 0; // No progress until first section is complete
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

  return (
    <div className="min-h-screen py-12 px-6 bg-muted/30">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Progress Header */}
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" data-testid="progress-form" />
          <h2 className="text-3xl font-bold text-center">{steps[currentStep].title}</h2>
        </div>

        {/* Form Step */}
        <Card className="p-8">
          <CurrentStepComponent
            data={formData}
            onChange={setFormData}
          />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handleBack}
            data-testid="button-form-back"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          
          <Button
            size="lg"
            onClick={handleNext}
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
