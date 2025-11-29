import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FormData } from "../LifestyleForm";
import { ShoppingBag, Tag, Zap } from "lucide-react";

interface ShoppingStepProps {
  data: FormData;
  onChange: (data: FormData) => void;
}

export default function ShoppingStep({ data, onChange }: ShoppingStepProps) {
  const frequencies = [
    { value: "Rarely", label: "Rarely", desc: "Few times a year" },
    { value: "Monthly", label: "Monthly", desc: "Once a month" },
    { value: "2-3 times per month", label: "2-3x/month", desc: "Regular shopper" },
    { value: "Weekly", label: "Weekly", desc: "Every week" },
    { value: "Multiple times per week", label: "Multiple/week", desc: "Frequent shopper" },
  ];
  
  const buyingHabits = [
    { value: "Spontaneous (impulsive)", label: "Spontaneous", desc: "Buy on impulse", icon: Zap },
    { value: "Mix of both", label: "Balanced", desc: "Depends on the item", icon: ShoppingBag },
    { value: "Planned (intentional)", label: "Planned", desc: "Research first", icon: Tag },
  ];
  
  const shoppingStyles = [
    { value: "Wait for sales & discounts", label: "Budget-conscious", desc: "Wait for sales & discounts" },
    { value: "Balanced budget & quality", label: "Balanced", desc: "Budget meets quality" },
    { value: "Premium high-quality items", label: "Premium", desc: "Quality over price" },
  ];

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-blue-600" />
          </div>
          <Label className="text-base sm:text-lg font-semibold">Do you buy things spontaneously or only when planned?</Label>
        </div>
        <RadioGroup
          value={data.shopping.buyingHabit}
          onValueChange={(value) => onChange({
            ...data,
            shopping: { ...data.shopping, buyingHabit: value }
          })}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {buyingHabits.map((habit) => {
            const Icon = habit.icon;
            return (
              <div key={habit.value} className="relative">
                <RadioGroupItem value={habit.value} id={`habit-${habit.value}`} className="peer sr-only" data-testid={`radio-habit-${habit.label.toLowerCase()}`} />
                <Label 
                  htmlFor={`habit-${habit.value}`} 
                  className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all min-h-[100px]
                    hover:border-primary/50 hover:bg-primary/5
                    peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10
                    peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                >
                  <Icon className="w-6 h-6 mb-2 text-muted-foreground" />
                  <span className="text-sm sm:text-base font-semibold">{habit.label}</span>
                  <span className="text-xs text-muted-foreground mt-1">{habit.desc}</span>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label className="text-base sm:text-lg font-semibold block">How often do you shop for clothing, accessories, or hobby gear?</Label>
        <RadioGroup
          value={data.shopping.clothingFrequency}
          onValueChange={(value) => onChange({
            ...data,
            shopping: { ...data.shopping, clothingFrequency: value }
          })}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
        >
          {frequencies.map((freq) => (
            <div key={freq.value} className="relative">
              <RadioGroupItem value={freq.value} id={`clothing-${freq.value}`} className="peer sr-only" data-testid={`radio-clothing-${freq.label.toLowerCase()}`} />
              <Label 
                htmlFor={`clothing-${freq.value}`} 
                className="flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all min-h-[80px]
                  hover:border-primary/50 hover:bg-primary/5
                  peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10
                  peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
              >
                <span className="text-sm sm:text-base font-semibold">{freq.label}</span>
                <span className="text-xs text-muted-foreground mt-1 text-center">{freq.desc}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
            <Tag className="w-4 h-4 text-emerald-600" />
          </div>
          <Label className="text-base sm:text-lg font-semibold">What's your approach to price and quality?</Label>
        </div>
        <RadioGroup
          value={data.shopping.shoppingStyle}
          onValueChange={(value) => onChange({
            ...data,
            shopping: { ...data.shopping, shoppingStyle: value }
          })}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {shoppingStyles.map((style) => (
            <div key={style.value} className="relative">
              <RadioGroupItem value={style.value} id={`style-${style.value}`} className="peer sr-only" data-testid={`radio-style-${style.label.toLowerCase()}`} />
              <Label 
                htmlFor={`style-${style.value}`} 
                className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all min-h-[80px]
                  hover:border-primary/50 hover:bg-primary/5
                  peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10
                  peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
              >
                <span className="text-sm sm:text-base font-semibold">{style.label}</span>
                <span className="text-xs text-muted-foreground mt-1 text-center">{style.desc}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
