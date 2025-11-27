import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FormData } from "../LifestyleForm";
import { Coffee, UtensilsCrossed, Truck } from "lucide-react";

interface FoodDiningStepProps {
  data: FormData;
  onChange: (data: FormData) => void;
}

export default function FoodDiningStep({ data, onChange }: FoodDiningStepProps) {
  const frequencies = ["Never", "Rarely (1-2x/month)", "Sometimes (1x/week)", "Often (2-3x/week)", "Daily"];
  
  const diningStyles = [
    { value: "Happy hour & daily specials (budget-friendly)", label: "Budget-friendly", desc: "Happy hour & daily specials" },
    { value: "Mix of casual and upscale (balanced)", label: "Balanced", desc: "Mix of casual and upscale" },
    { value: "Full-course meals & premium drinks (fine dining)", label: "Fine dining", desc: "Full-course meals & premium drinks" },
  ];

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
            <Coffee className="w-4 h-4 text-amber-600" />
          </div>
          <Label className="text-base sm:text-lg font-semibold">How often do you buy coffee or café drinks?</Label>
        </div>
        <RadioGroup
          value={data.foodDining.coffeeFrequency}
          onValueChange={(value) => onChange({
            ...data,
            foodDining: { ...data.foodDining, coffeeFrequency: value }
          })}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {frequencies.map((freq) => (
            <div key={freq} className="relative">
              <RadioGroupItem value={freq} id={`coffee-${freq}`} className="peer sr-only" data-testid={`radio-coffee-${freq.toLowerCase()}`} />
              <Label 
                htmlFor={`coffee-${freq}`} 
                className="flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all
                  hover:border-primary/50 hover:bg-primary/5
                  peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary
                  peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
              >
                <span className="text-sm sm:text-base font-medium text-center">{freq}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
            <Truck className="w-4 h-4 text-orange-600" />
          </div>
          <Label className="text-base sm:text-lg font-semibold">How often do you order food delivery or takeout?</Label>
        </div>
        <RadioGroup
          value={data.foodDining.deliveryFrequency}
          onValueChange={(value) => onChange({
            ...data,
            foodDining: { ...data.foodDining, deliveryFrequency: value }
          })}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {frequencies.map((freq) => (
            <div key={freq} className="relative">
              <RadioGroupItem value={freq} id={`delivery-${freq}`} className="peer sr-only" data-testid={`radio-delivery-${freq.toLowerCase()}`} />
              <Label 
                htmlFor={`delivery-${freq}`} 
                className="flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all
                  hover:border-primary/50 hover:bg-primary/5
                  peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary
                  peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
              >
                <span className="text-sm sm:text-base font-medium text-center">{freq}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
            <UtensilsCrossed className="w-4 h-4 text-rose-600" />
          </div>
          <Label className="text-base sm:text-lg font-semibold">How often do you dine out at restaurants?</Label>
        </div>
        <RadioGroup
          value={data.foodDining.diningOutFrequency}
          onValueChange={(value) => onChange({
            ...data,
            foodDining: { ...data.foodDining, diningOutFrequency: value, diningStyle: "" }
          })}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {frequencies.map((freq) => (
            <div key={freq} className="relative">
              <RadioGroupItem value={freq} id={`dining-${freq}`} className="peer sr-only" data-testid={`radio-dining-${freq.toLowerCase()}`} />
              <Label 
                htmlFor={`dining-${freq}`} 
                className="flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all
                  hover:border-primary/50 hover:bg-primary/5
                  peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary
                  peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
              >
                <span className="text-sm sm:text-base font-medium text-center">{freq}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {data.foodDining.diningOutFrequency && data.foodDining.diningOutFrequency !== "Never" && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <Label className="text-base sm:text-lg font-semibold block">What's your typical dining style?</Label>
          <RadioGroup
            value={data.foodDining.diningStyle}
            onValueChange={(value) => onChange({
              ...data,
              foodDining: { ...data.foodDining, diningStyle: value }
            })}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            {diningStyles.map((style) => (
              <div key={style.value} className="relative">
                <RadioGroupItem value={style.value} id={`style-${style.value}`} className="peer sr-only" data-testid={`radio-style-${style.label.toLowerCase()}`} />
                <Label 
                  htmlFor={`style-${style.value}`} 
                  className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all min-h-[80px] sm:min-h-[100px]
                    hover:border-primary/50 hover:bg-primary/5
                    peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10
                    peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                >
                  <span className="text-sm sm:text-base font-semibold text-center peer-data-[state=checked]:text-primary">{style.label}</span>
                  <span className="text-xs sm:text-sm text-muted-foreground text-center mt-1">{style.desc}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}
    </div>
  );
}
