import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { FormData } from "../LifestyleForm";

interface FitnessStepProps {
  data: FormData;
  onChange: (data: FormData) => void;
}

export default function FitnessStep({ data, onChange }: FitnessStepProps) {
  const dropInFrequencies = ["Never", "1-2 per week", "3-4 per week", "5-6 per week", "Daily"];
  
  const wellnessOptions = ["Therapy/Psychologist", "Acupuncture", "Massage", "Other", "None"];
  
  const wellnessFrequencies = ["Weekly", "Bi-weekly", "Monthly", "Less than monthly"];
  
  const hairCutFrequencies = ["Never", "Every 3 months", "Every 2 months", "Monthly", "Every 2-3 weeks"];
  
  const hairServiceTypes = ["Basic cut only", "Cut and wash", "Cut and styling", "Color treatment", "Extensions or treatments", "Multiple services"];

  const handleWellnessToggle = (option: string) => {
    const updated = data.fitness.wellnessSpend.includes(option)
      ? data.fitness.wellnessSpend.filter((item) => item !== option)
      : [...data.fitness.wellnessSpend, option];
    onChange({
      ...data,
      fitness: { ...data.fitness, wellnessSpend: updated, wellnessFrequency: updated.some(item => item !== "None") ? data.fitness.wellnessFrequency : "" },
    });
  };

  const hasWellnessSpend = data.fitness.wellnessSpend.length > 0 && !data.fitness.wellnessSpend.every(item => item === "None");

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="text-base font-semibold">Do you have a paid fitness membership? (Gym, Yoga, Pilates, Boxing, etc.)</Label>
        <RadioGroup
          value={data.fitness.hasMembership}
          onValueChange={(value) => onChange({
            ...data,
            fitness: { ...data.fitness, hasMembership: value, membershipTier: "", dropInSessionsPerWeek: "" }
          })}
        >
          <div className="flex items-center space-x-3 p-3 rounded-lg hover-elevate">
            <RadioGroupItem value="yes" id="membership-yes" data-testid="radio-membership-yes" />
            <Label htmlFor="membership-yes" className="cursor-pointer font-normal flex-1">Yes</Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg hover-elevate">
            <RadioGroupItem value="no" id="membership-no" data-testid="radio-membership-no" />
            <Label htmlFor="membership-no" className="cursor-pointer font-normal flex-1">No</Label>
          </div>
        </RadioGroup>
      </div>

      {data.fitness.hasMembership === "yes" && (
        <div className="space-y-4">
          <Label className="text-base font-semibold">What type of membership plan do you have?</Label>
          <RadioGroup
            value={data.fitness.membershipTier}
            onValueChange={(value) => onChange({
              ...data,
              fitness: { ...data.fitness, membershipTier: value }
            })}
          >
            <div className="flex items-center space-x-3 p-3 rounded-lg hover-elevate">
              <RadioGroupItem value="basic" id="tier-basic" data-testid="radio-tier-basic" />
              <Label htmlFor="tier-basic" className="cursor-pointer font-normal flex-1">Basic</Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover-elevate">
              <RadioGroupItem value="mid-tier" id="tier-mid" data-testid="radio-tier-mid" />
              <Label htmlFor="tier-mid" className="cursor-pointer font-normal flex-1">Mid-Tier</Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover-elevate">
              <RadioGroupItem value="premium" id="tier-premium" data-testid="radio-tier-premium" />
              <Label htmlFor="tier-premium" className="cursor-pointer font-normal flex-1">Premium</Label>
            </div>
          </RadioGroup>
        </div>
      )}

      {data.fitness.hasMembership === "no" && (
        <div className="space-y-4">
          <Label className="text-base font-semibold">How many drop-in fitness sessions (Gym, Yoga, Pilates, Boxing, etc.) do you attend per week?</Label>
          <RadioGroup
            value={data.fitness.dropInSessionsPerWeek}
            onValueChange={(value) => onChange({
              ...data,
              fitness: { ...data.fitness, dropInSessionsPerWeek: value }
            })}
          >
            {dropInFrequencies.map((freq) => (
              <div key={freq} className="flex items-center space-x-3 p-3 rounded-lg hover-elevate">
                <RadioGroupItem value={freq} id={`dropin-${freq}`} data-testid={`radio-dropin-${freq.toLowerCase()}`} />
                <Label htmlFor={`dropin-${freq}`} className="cursor-pointer font-normal flex-1">{freq}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      <div className="space-y-4">
        <Label className="text-base font-semibold">How often do you get your hair cut at a salon or barber?</Label>
        <RadioGroup
          value={data.fitness.hairCutFrequency}
          onValueChange={(value) => onChange({
            ...data,
            fitness: { ...data.fitness, hairCutFrequency: value, hairServiceType: "" }
          })}
        >
          {hairCutFrequencies.map((freq) => (
            <div key={freq} className="flex items-center space-x-3 p-3 rounded-lg hover-elevate">
              <RadioGroupItem value={freq} id={`haircut-${freq}`} data-testid={`radio-haircut-${freq.toLowerCase()}`} />
              <Label htmlFor={`haircut-${freq}`} className="cursor-pointer font-normal flex-1">{freq}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {data.fitness.hairCutFrequency && data.fitness.hairCutFrequency !== "Never" && (
        <div className="space-y-4">
          <Label className="text-base font-semibold">What type of service do you typically get?</Label>
          <RadioGroup
            value={data.fitness.hairServiceType}
            onValueChange={(value) => onChange({
              ...data,
              fitness: { ...data.fitness, hairServiceType: value }
            })}
          >
            {hairServiceTypes.map((type) => (
              <div key={type} className="flex items-center space-x-3 p-3 rounded-lg hover-elevate">
                <RadioGroupItem value={type} id={`hairservice-${type}`} data-testid={`radio-hairservice-${type.toLowerCase()}`} />
                <Label htmlFor={`hairservice-${type}`} className="cursor-pointer font-normal flex-1">{type}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      <div className="space-y-4">
        <Label className="text-base font-semibold">Any other wellness spend?</Label>
        <div className="space-y-3">
          {wellnessOptions.map((option) => (
            <div key={option} className="flex items-center space-x-3 p-3 rounded-lg border hover-elevate">
              <Checkbox
                id={`wellness-${option}`}
                checked={data.fitness.wellnessSpend.includes(option)}
                onCheckedChange={() => handleWellnessToggle(option)}
                data-testid={`checkbox-wellness-${option.toLowerCase()}`}
              />
              <Label htmlFor={`wellness-${option}`} className="cursor-pointer font-normal flex-1">
                {option}
              </Label>
            </div>
          ))}
        </div>

        {hasWellnessSpend && (
          <div className="space-y-4">
            <Label className="text-base font-semibold">How often do you get these services?</Label>
            <RadioGroup
              value={data.fitness.wellnessFrequency}
              onValueChange={(value) => onChange({
                ...data,
                fitness: { ...data.fitness, wellnessFrequency: value }
              })}
            >
              {wellnessFrequencies.map((freq) => (
                <div key={freq} className="flex items-center space-x-3 p-3 rounded-lg hover-elevate">
                  <RadioGroupItem value={freq} id={`wellness-freq-${freq}`} data-testid={`radio-wellness-freq-${freq.toLowerCase()}`} />
                  <Label htmlFor={`wellness-freq-${freq}`} className="cursor-pointer font-normal flex-1">{freq}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {data.fitness.wellnessSpend.includes("Other") && (
          <div className="mt-4">
            <Input
              placeholder="Please specify..."
              value={data.fitness.wellnessOther}
              onChange={(e) => onChange({
                ...data,
                fitness: { ...data.fitness, wellnessOther: e.target.value }
              })}
              data-testid="input-wellness-other"
            />
          </div>
        )}
      </div>
    </div>
  );
}
