import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FormData } from "../LifestyleForm";

interface FoodDiningStepProps {
  data: FormData;
  onChange: (data: FormData) => void;
}

export default function FoodDiningStep({ data, onChange }: FoodDiningStepProps) {
  const frequencies = ["Never", "Rarely (1-2x/month)", "Sometimes (1x/week)", "Often (2-3x/week)", "Daily"];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="text-base font-semibold">How often do you buy coffee or café drinks?</Label>
        <RadioGroup
          value={data.foodDining.coffeeFrequency}
          onValueChange={(value) => onChange({
            ...data,
            foodDining: { ...data.foodDining, coffeeFrequency: value }
          })}
        >
          {frequencies.map((freq) => (
            <div key={freq} className="flex items-center space-x-3 p-3 rounded-lg hover-elevate">
              <RadioGroupItem value={freq} id={`coffee-${freq}`} data-testid={`radio-coffee-${freq.toLowerCase()}`} />
              <Label htmlFor={`coffee-${freq}`} className="cursor-pointer font-normal flex-1">{freq}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-semibold">How often do you order food delivery?</Label>
        <RadioGroup
          value={data.foodDining.deliveryFrequency}
          onValueChange={(value) => onChange({
            ...data,
            foodDining: { ...data.foodDining, deliveryFrequency: value }
          })}
        >
          {frequencies.map((freq) => (
            <div key={freq} className="flex items-center space-x-3 p-3 rounded-lg hover-elevate">
              <RadioGroupItem value={freq} id={`delivery-${freq}`} data-testid={`radio-delivery-${freq.toLowerCase()}`} />
              <Label htmlFor={`delivery-${freq}`} className="cursor-pointer font-normal flex-1">{freq}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-semibold">How often do you dine out at restaurants?</Label>
        <RadioGroup
          value={data.foodDining.diningOutFrequency}
          onValueChange={(value) => onChange({
            ...data,
            foodDining: { ...data.foodDining, diningOutFrequency: value }
          })}
        >
          {frequencies.map((freq) => (
            <div key={freq} className="flex items-center space-x-3 p-3 rounded-lg hover-elevate">
              <RadioGroupItem value={freq} id={`dining-${freq}`} data-testid={`radio-dining-${freq.toLowerCase()}`} />
              <Label htmlFor={`dining-${freq}`} className="cursor-pointer font-normal flex-1">{freq}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
