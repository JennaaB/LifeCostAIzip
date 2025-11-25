import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import type { FormData } from "../LifestyleForm";

interface FitnessStepProps {
  data: FormData;
  onChange: (data: FormData) => void;
}

export default function FitnessStep({ data, onChange }: FitnessStepProps) {
  const classFrequencies = ["None", "1-2 per month", "1 per week", "2-3 per week", "4+ per week"];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="text-base font-semibold">Do you have a gym membership?</Label>
        <div className="flex items-center space-x-3 p-4 rounded-lg border hover-elevate">
          <Checkbox
            id="gym-membership"
            checked={data.fitness.gymMembership}
            onCheckedChange={(checked) => onChange({
              ...data,
              fitness: { ...data.fitness, gymMembership: checked as boolean }
            })}
            data-testid="checkbox-gym-membership"
          />
          <Label htmlFor="gym-membership" className="cursor-pointer font-normal flex-1">
            Yes, I have a gym membership
          </Label>
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-semibold">
          How often do you attend fitness classes? (yoga, spin, CrossFit, etc.)
        </Label>
        <RadioGroup
          value={data.fitness.classesPerMonth}
          onValueChange={(value) => onChange({
            ...data,
            fitness: { ...data.fitness, classesPerMonth: value }
          })}
        >
          {classFrequencies.map((freq) => (
            <div key={freq} className="flex items-center space-x-3 p-3 rounded-lg hover-elevate">
              <RadioGroupItem value={freq} id={`classes-${freq}`} data-testid={`radio-classes-${freq.toLowerCase()}`} />
              <Label htmlFor={`classes-${freq}`} className="cursor-pointer font-normal flex-1">{freq}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
