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

    let answeredQuestions = 0;
    let totalQuestions = 0;

    // Food & Dining questions
    totalQuestions += 3; // coffee, delivery, diningOut
    if (fd.coffeeFrequency) answeredQuestions++;
    if (fd.deliveryFrequency) answeredQuestions++;
    if (fd.diningOutFrequency) answeredQuestions++;
    
    if (fd.diningOutFrequency && fd.diningOutFrequency !== "Never") {
      totalQuestions += 1; // diningStyle is conditional
      if (fd.diningStyle) answeredQuestions++;
    }

    // Transportation questions
    totalQuestions += 2; // commuteMethod, distance
    if (tr.commuteMethod) answeredQuestions++;
    if (tr.distance) answeredQuestions++;

    if (tr.commuteMethod === "Rideshare") {
      totalQuestions += 1;
      if (tr.rideshareTripsPerWeek) answeredQuestions++;
    } else if (tr.commuteMethod === "Personal Car") {
      totalQuestions += 2; // payForParking + parkingRateType
      if (tr.payForParking) answeredQuestions++;
      if (tr.payForParking === "Yes" && tr.parkingRateType) answeredQuestions++;
    } else if (tr.commuteMethod === "Public Transit") {
      totalQuestions += 1;
      if (tr.transitPassType) answeredQuestions++;
    }

    // Fitness & Wellness questions
    totalQuestions += 2; // hasMembership, hairCutFrequency
    if (fi.hasMembership) answeredQuestions++;
    if (fi.hairCutFrequency) answeredQuestions++;

    if (fi.hasMembership === "Yes") {
      totalQuestions += 1;
      if (fi.membershipTier) answeredQuestions++;
    } else if (fi.hasMembership === "Drop-in Sessions") {
      totalQuestions += 1;
      if (fi.dropInSessionsPerWeek) answeredQuestions++;
    }

    totalQuestions += 2; // wellnessSpend selection + frequency
    if (fi.wellnessSpend.length > 0) answeredQuestions++;
    if (fi.wellnessSpend.length > 0 && fi.wellnessFrequency) answeredQuestions++;

    if (fi.hairCutFrequency && fi.hairCutFrequency !== "Never") {
      totalQuestions += 1;
      if (fi.hairServiceType) answeredQuestions++;
    }

    // Subscriptions questions
    totalQuestions += 1; // hasSubscriptions
    if (su.hasSubscriptions) answeredQuestions++;

    if (su.hasSubscriptions === "Yes") {
      totalQuestions += 2; // services + other
      if (su.services.length > 0) answeredQuestions++;
      if (su.other) answeredQuestions++;
    }

    // Shopping questions
    totalQuestions += 4; // clothingFrequency, buyingHabit, shoppingStyle, personalCare
    if (sh.clothingFrequency) answeredQuestions++;
    if (sh.buyingHabit) answeredQuestions++;
    if (sh.shoppingStyle) answeredQuestions++;
    if (sh.personalCare) answeredQuestions++;

    // Goals questions
    totalQuestions += 2; // primaryGoal + values (need 3)
    if (go.primaryGoal) answeredQuestions++;
    if (go.values.length === 3) answeredQuestions++;

    const progress = (answeredQuestions / totalQuestions) * 100;
    return Math.min(progress, 99); // Cap at 99% until fully submitted
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
