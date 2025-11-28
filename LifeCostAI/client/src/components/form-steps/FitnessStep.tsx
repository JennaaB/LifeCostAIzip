import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { FormData } from "../LifestyleForm";
import { Dumbbell, Scissors, Sparkles } from "lucide-react";

interface FitnessStepProps {
  data: FormData;
  onChange: (data: FormData) => void;
}

export default function FitnessStep({ data, onChange }: FitnessStepProps) {
  const membershipOptions = [
    { value: "yes", label: "Yes, I have a membership" },
    { value: "no", label: "No membership" },
  ];
  
  const membershipTiers = [
    { value: "basic", label: "Basic", desc: "Standard access" },
    { value: "mid-tier", label: "Mid-Tier", desc: "More amenities" },
    { value: "premium", label: "Premium", desc: "Full access + perks" },
  ];
  
  const dropInFrequencies = ["Never", "1-2 per week", "3-4 per week", "5-6 per week", "Daily"];
  
  const wellnessOptions = [
    { value: "Therapy/Psychologist", label: "Therapy" },
    { value: "Acupuncture", label: "Acupuncture" },
    { value: "Massage", label: "Massage" },
    { value: "Nails/Lashes/Tanning", label: "Nails/Lashes" },
    { value: "Other", label: "Other" },
    { value: "None", label: "None" },
  ];
  
  const wellnessFrequencies = ["Weekly", "Bi-weekly", "Monthly", "Less than monthly"];
  
  const hairCutFrequencies = ["Every 2-3 weeks", "Every 1-3 months", "6 months or more", "Never"];
  
  const hairServiceTypes = [
    { value: "Basic cut only", label: "Basic cut", desc: "Simple trim" },
    { value: "Cut and wash/styling", label: "Cut + styling", desc: "Wash & style included" },
    { value: "Color treatment/Extensions", label: "Color/Extensions", desc: "Premium services" },
  ];

  const handleWellnessToggle = (option: string) => {
    let updated: string[];
    
    if (option === "None") {
      updated = data.fitness.wellnessSpend.includes("None") ? [] : ["None"];
    } else {
      const withoutNone = data.fitness.wellnessSpend.filter(item => item !== "None");
      updated = withoutNone.includes(option)
        ? withoutNone.filter((item) => item !== option)
        : [...withoutNone, option];
    }
    
    onChange({
      ...data,
      fitness: { 
        ...data.fitness, 
        wellnessSpend: updated, 
        wellnessFrequency: updated.length === 0 || updated.every(item => item === "None") ? "" : data.fitness.wellnessFrequency 
      },
    });
  };

  const hasWellnessSpend = data.fitness.wellnessSpend.length > 0 && !data.fitness.wellnessSpend.every(item => item === "None");

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <Dumbbell className="w-4 h-4 text-green-600" />
          </div>
          <Label className="text-base sm:text-lg font-semibold">Do you have a paid fitness membership?</Label>
        </div>
        <p className="text-sm text-muted-foreground ml-11">Gym, yoga studio, pilates, boxing, etc.</p>
        <RadioGroup
          value={data.fitness.hasMembership}
          onValueChange={(value) => onChange({
            ...data,
            fitness: { ...data.fitness, hasMembership: value, membershipTier: "", dropInSessionsPerWeek: "" }
          })}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {membershipOptions.map((option) => (
            <div key={option.value} className="relative">
              <RadioGroupItem value={option.value} id={`membership-${option.value}`} className="peer sr-only" data-testid={`radio-membership-${option.value}`} />
              <Label 
                htmlFor={`membership-${option.value}`} 
                className="flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all
                  hover:border-primary/50 hover:bg-primary/5
                  peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary
                  peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
              >
                <span className="text-sm sm:text-base font-medium">{option.label}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {data.fitness.hasMembership === "yes" && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <Label className="text-base sm:text-lg font-semibold block">What type of membership plan do you have?</Label>
          <RadioGroup
            value={data.fitness.membershipTier}
            onValueChange={(value) => onChange({
              ...data,
              fitness: { ...data.fitness, membershipTier: value }
            })}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            {membershipTiers.map((tier) => (
              <div key={tier.value} className="relative">
                <RadioGroupItem value={tier.value} id={`tier-${tier.value}`} className="peer sr-only" data-testid={`radio-tier-${tier.value}`} />
                <Label 
                  htmlFor={`tier-${tier.value}`} 
                  className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all min-h-[80px]
                    hover:border-primary/50 hover:bg-primary/5
                    peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10
                    peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                >
                  <span className="text-sm sm:text-base font-semibold">{tier.label}</span>
                  <span className="text-xs text-muted-foreground mt-1">{tier.desc}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {data.fitness.hasMembership === "no" && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <Label className="text-base sm:text-lg font-semibold block">How many drop-in fitness sessions do you attend per week?</Label>
          <RadioGroup
            value={data.fitness.dropInSessionsPerWeek}
            onValueChange={(value) => onChange({
              ...data,
              fitness: { ...data.fitness, dropInSessionsPerWeek: value }
            })}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
          >
            {dropInFrequencies.map((freq) => (
              <div key={freq} className="relative">
                <RadioGroupItem value={freq} id={`dropin-${freq}`} className="peer sr-only" data-testid={`radio-dropin-${freq.toLowerCase()}`} />
                <Label 
                  htmlFor={`dropin-${freq}`} 
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
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
            <Scissors className="w-4 h-4 text-purple-600" />
          </div>
          <Label className="text-base sm:text-lg font-semibold">How often do you get your hair done at a salon or barber?</Label>
        </div>
        <RadioGroup
          value={data.fitness.hairCutFrequency}
          onValueChange={(value) => onChange({
            ...data,
            fitness: { ...data.fitness, hairCutFrequency: value, hairServiceType: "" }
          })}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {hairCutFrequencies.map((freq) => (
            <div key={freq} className="relative">
              <RadioGroupItem value={freq} id={`haircut-${freq}`} className="peer sr-only" data-testid={`radio-haircut-${freq.toLowerCase()}`} />
              <Label 
                htmlFor={`haircut-${freq}`} 
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

      {data.fitness.hairCutFrequency && data.fitness.hairCutFrequency !== "Never" && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <Label className="text-base sm:text-lg font-semibold block">What level of service do you typically get?</Label>
          <RadioGroup
            value={data.fitness.hairServiceType}
            onValueChange={(value) => onChange({
              ...data,
              fitness: { ...data.fitness, hairServiceType: value }
            })}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            {hairServiceTypes.map((type) => (
              <div key={type.value} className="relative">
                <RadioGroupItem value={type.value} id={`hairservice-${type.value}`} className="peer sr-only" data-testid={`radio-hairservice-${type.label.toLowerCase()}`} />
                <Label 
                  htmlFor={`hairservice-${type.value}`} 
                  className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all min-h-[80px]
                    hover:border-primary/50 hover:bg-primary/5
                    peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10
                    peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                >
                  <span className="text-sm sm:text-base font-semibold">{type.label}</span>
                  <span className="text-xs text-muted-foreground mt-1">{type.desc}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-pink-600" />
          </div>
          <Label className="text-base sm:text-lg font-semibold">Any other wellness spending?</Label>
        </div>
        <p className="text-sm text-muted-foreground ml-11">Select all that apply</p>
        <div className="space-y-3 ml-11">
          {wellnessOptions.map((option) => (
            <div key={option.value} className="flex items-center gap-3">
              <Checkbox
                id={`wellness-${option.value}`}
                checked={data.fitness.wellnessSpend.includes(option.value)}
                onCheckedChange={() => handleWellnessToggle(option.value)}
                className="h-5 w-5"
                data-testid={`checkbox-wellness-${option.value.toLowerCase()}`}
              />
              <Label 
                htmlFor={`wellness-${option.value}`} 
                className="text-sm sm:text-base font-medium cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>

        {hasWellnessSpend && (
          <div className="space-y-4 mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <Label className="text-base sm:text-lg font-semibold block">How often do you get these services?</Label>
            <RadioGroup
              value={data.fitness.wellnessFrequency}
              onValueChange={(value) => onChange({
                ...data,
                fitness: { ...data.fitness, wellnessFrequency: value }
              })}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {wellnessFrequencies.map((freq) => (
                <div key={freq} className="relative">
                  <RadioGroupItem value={freq} id={`wellness-freq-${freq}`} className="peer sr-only" data-testid={`radio-wellness-freq-${freq.toLowerCase()}`} />
                  <Label 
                    htmlFor={`wellness-freq-${freq}`} 
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
        )}

        {data.fitness.wellnessSpend.includes("Other") && (
          <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <Input
              placeholder="Please specify other wellness services..."
              value={data.fitness.wellnessOther}
              onChange={(e) => onChange({
                ...data,
                fitness: { ...data.fitness, wellnessOther: e.target.value }
              })}
              className="h-12"
              data-testid="input-wellness-other"
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-pink-600" />
          </div>
          <Label className="text-base sm:text-lg font-semibold">What's your approach to personal care products?</Label>
        </div>
        <RadioGroup
          value={data.fitness.personalCare}
          onValueChange={(value) => onChange({
            ...data,
            fitness: { ...data.fitness, personalCare: value }
          })}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {[
            { value: "Basic (drugstore)", label: "Basic", desc: "Drugstore products" },
            { value: "Moderate", label: "Moderate", desc: "Mix of basic & premium" },
            { value: "Premium (salon/spa)", label: "Premium", desc: "Salon/spa quality" },
          ].map((level) => (
            <div key={level.value} className="relative">
              <RadioGroupItem value={level.value} id={`personalcare-${level.value}`} className="peer sr-only" data-testid={`radio-personalcare-${level.label.toLowerCase()}`} />
              <Label 
                htmlFor={`personalcare-${level.value}`} 
                className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all min-h-[80px]
                  hover:border-primary/50 hover:bg-primary/5
                  peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10
                  peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
              >
                <span className="text-sm sm:text-base font-semibold">{level.label}</span>
                <span className="text-xs text-muted-foreground mt-1">{level.desc}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
