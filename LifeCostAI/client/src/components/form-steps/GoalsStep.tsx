import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import type { FormData } from "../LifestyleForm";

interface GoalsStepProps {
  data: FormData;
  onChange: (data: FormData) => void;
}

export default function GoalsStep({ data, onChange }: GoalsStepProps) {
  const goals = [
    "Save for a big purchase",
    "Pay off debt",
    "Build an emergency fund",
    "Plan for relocation",
    "Just curious about my spending",
  ];

  const values = [
    "Sustainability",
    "Convenience",
    "Health & wellness",
    "Experiences over things",
    "Financial freedom",
  ];

  const toggleValue = (value: string) => {
    const current = data.goals.values;
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    
    onChange({
      ...data,
      goals: { ...data.goals, values: updated }
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="text-base font-semibold">What's your primary financial goal right now?</Label>
        <RadioGroup
          value={data.goals.primaryGoal}
          onValueChange={(value) => onChange({
            ...data,
            goals: { ...data.goals, primaryGoal: value }
          })}
        >
          {goals.map((goal) => (
            <div key={goal} className="flex items-center space-x-3 p-3 rounded-lg hover-elevate">
              <RadioGroupItem value={goal} id={`goal-${goal}`} data-testid={`radio-goal-${goal.toLowerCase()}`} />
              <Label htmlFor={`goal-${goal}`} className="cursor-pointer font-normal flex-1">{goal}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-semibold">What values are important to you? (Select all that apply)</Label>
        <div className="space-y-3">
          {values.map((value) => (
            <div key={value} className="flex items-center space-x-3 p-3 rounded-lg border hover-elevate">
              <Checkbox
                id={`value-${value}`}
                checked={data.goals.values.includes(value)}
                onCheckedChange={() => toggleValue(value)}
                data-testid={`checkbox-value-${value.toLowerCase()}`}
              />
              <Label htmlFor={`value-${value}`} className="cursor-pointer font-normal flex-1">
                {value}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
