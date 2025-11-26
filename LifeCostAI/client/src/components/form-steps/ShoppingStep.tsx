import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FormData } from "../LifestyleForm";

interface ShoppingStepProps {
  data: FormData;
  onChange: (data: FormData) => void;
}

export default function ShoppingStep({ data, onChange }: ShoppingStepProps) {
  const frequencies = ["Rarely", "Monthly", "2-3 times per month", "Weekly", "Multiple times per week"];
  const personalCare = ["Basic (drugstore)", "Moderate", "Premium (salon/spa)"];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="text-base font-semibold">How often do you shop for clothing, accessories, or hobby gear?</Label>
        <RadioGroup
          value={data.shopping.clothingFrequency}
          onValueChange={(value) => onChange({
            ...data,
            shopping: { ...data.shopping, clothingFrequency: value }
          })}
        >
          {frequencies.map((freq) => (
            <div key={freq} className="flex items-center space-x-3 p-3 rounded-lg hover-elevate">
              <RadioGroupItem value={freq} id={`clothing-${freq}`} data-testid={`radio-clothing-${freq.toLowerCase()}`} />
              <Label htmlFor={`clothing-${freq}`} className="cursor-pointer font-normal flex-1">{freq}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-semibold">What's your typical approach to personal care products?</Label>
        <RadioGroup
          value={data.shopping.personalCare}
          onValueChange={(value) => onChange({
            ...data,
            shopping: { ...data.shopping, personalCare: value }
          })}
        >
          {personalCare.map((level) => (
            <div key={level} className="flex items-center space-x-3 p-3 rounded-lg hover-elevate">
              <RadioGroupItem value={level} id={`care-${level}`} data-testid={`radio-personalcare-${level.toLowerCase()}`} />
              <Label htmlFor={`care-${level}`} className="cursor-pointer font-normal flex-1">{level}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
