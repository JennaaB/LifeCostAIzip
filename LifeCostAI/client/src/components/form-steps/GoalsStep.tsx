import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import type { FormData } from "../LifestyleForm";
import { Target, Plane, CreditCard, PiggyBank, MapPin, HelpCircle, Heart, Leaf, Wallet, Zap, Sparkles } from "lucide-react";

interface GoalsStepProps {
  data: FormData;
  onChange: (data: FormData) => void;
}

export default function GoalsStep({ data, onChange }: GoalsStepProps) {
  const goals = [
    { value: "Save for a big purchase or trip", label: "Save for something big", desc: "Trip, car, or major purchase", icon: Plane },
    { value: "Pay off debt", label: "Pay off debt", desc: "Clear loans or credit cards", icon: CreditCard },
    { value: "Build an emergency fund", label: "Build emergency fund", desc: "Create a safety net", icon: PiggyBank },
    { value: "Plan for a move", label: "Plan for a move", desc: "Relocating soon", icon: MapPin },
    { value: "Just curious about my spending", label: "Just curious", desc: "Want to understand my habits", icon: HelpCircle },
  ];

  const values = [
    { value: "Convenience", label: "Convenience", desc: "Save time & effort", icon: Zap },
    { value: "Health & wellness", label: "Health & Wellness", desc: "Physical & mental health", icon: Heart },
    { value: "Experiences over things", label: "Experiences", desc: "Memories over possessions", icon: Sparkles },
    { value: "Financial freedom", label: "Financial Freedom", desc: "Long-term security", icon: Wallet },
    { value: "Sustainability", label: "Sustainability", desc: "Eco-friendly choices", icon: Leaf },
  ];

  const toggleValue = (value: string) => {
    const current = data.goals.values;
    let updated: string[];
    
    if (current.includes(value)) {
      updated = current.filter(v => v !== value);
    } else if (current.length < 3) {
      updated = [...current, value];
    } else {
      return;
    }
    
    onChange({
      ...data,
      goals: { ...data.goals, values: updated }
    });
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
            <Target className="w-4 h-4 text-amber-600" />
          </div>
          <Label className="text-base sm:text-lg font-semibold">What's your primary financial goal right now?</Label>
        </div>
        <RadioGroup
          value={data.goals.primaryGoal}
          onValueChange={(value) => onChange({
            ...data,
            goals: { ...data.goals, primaryGoal: value }
          })}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {goals.map((goal) => {
            const Icon = goal.icon;
            return (
              <div key={goal.value} className="relative">
                <RadioGroupItem value={goal.value} id={`goal-${goal.value}`} className="peer sr-only" data-testid={`radio-goal-${goal.label.toLowerCase()}`} />
                <Label 
                  htmlFor={`goal-${goal.value}`} 
                  className="flex items-start gap-3 p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all
                    hover:border-primary/50 hover:bg-primary/5
                    peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10
                    peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm sm:text-base font-semibold block">{goal.label}</span>
                    <span className="text-xs text-muted-foreground">{goal.desc}</span>
                  </div>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
              <Heart className="w-4 h-4 text-rose-600" />
            </div>
            <Label className="text-base sm:text-lg font-semibold">What values are important to you?</Label>
          </div>
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${
            data.goals.values.length === 3 
              ? "bg-green-100 text-green-700" 
              : data.goals.values.length > 0 
                ? "bg-amber-100 text-amber-700" 
                : "bg-muted text-muted-foreground"
          }`}>
            {data.goals.values.length}/3 selected
          </span>
        </div>
        <p className="text-sm text-muted-foreground">Select up to 3 values that guide your spending decisions</p>
        <div className="space-y-3">
          {values.map((value) => {
            const Icon = value.icon;
            const isSelected = data.goals.values.includes(value.value);
            const isDisabled = !isSelected && data.goals.values.length >= 3;
            
            return (
              <div key={value.value} className={`flex items-center gap-3 ${isDisabled ? "opacity-50" : ""}`}>
                <Checkbox
                  id={`value-${value.value}`}
                  checked={isSelected}
                  onCheckedChange={() => toggleValue(value.value)}
                  disabled={isDisabled}
                  className="h-5 w-5"
                  data-testid={`checkbox-value-${value.label.toLowerCase()}`}
                />
                <Label 
                  htmlFor={`value-${value.value}`} 
                  className={`flex items-center gap-2 cursor-pointer ${isDisabled ? "cursor-not-allowed" : ""}`}
                >
                  <Icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                  <span className={`text-sm sm:text-base font-medium ${isSelected ? "text-primary" : ""}`}>{value.label}</span>
                  <span className="text-xs text-muted-foreground hidden sm:inline">— {value.desc}</span>
                </Label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
