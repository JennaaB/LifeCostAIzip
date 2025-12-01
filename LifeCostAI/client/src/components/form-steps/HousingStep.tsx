import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FormData } from "../LifestyleForm";
import { Home, Building2, Users, MapPin } from "lucide-react";

interface HousingStepProps {
  data: FormData;
  onChange: (data: FormData) => void;
}

export default function HousingStep({ data, onChange }: HousingStepProps) {
  const livingSituations = [
    { value: "Renting", label: "Renting", desc: "Apartment, house, or room", icon: Building2 },
    { value: "Own a home", label: "Own a home", desc: "Homeowner", icon: Home },
    { value: "Live at home for free", label: "Live at home", desc: "With family, no rent", icon: Users },
  ];

  const housingTiers = [
    { value: "Budget", label: "Budget", desc: "Basic, affordable housing" },
    { value: "Mid-range", label: "Mid-range", desc: "Comfortable, average area" },
    { value: "Luxury", label: "Luxury", desc: "High-end, premium location" },
  ];

  const locationTypes = [
    { value: "Rural", label: "Rural", desc: "Countryside, small town" },
    { value: "Suburban", label: "Suburban", desc: "Residential neighborhood" },
    { value: "Urban", label: "Urban", desc: "City outskirts or mid-city" },
    { value: "Inner city", label: "Inner city", desc: "Downtown, city center" },
  ];

  const canShowTier = data.housing.livingSituation === "Renting" || data.housing.livingSituation === "Own a home";
  const canShowLocation = canShowTier && data.housing.housingTier !== "";
  const canShowMortgage = data.housing.livingSituation === "Own a home" && data.housing.locationType !== "";

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
            <Home className="w-4 h-4 text-violet-600" />
          </div>
          <Label className="text-base sm:text-lg font-semibold">What is your current living situation?</Label>
        </div>
        <RadioGroup
          value={data.housing.livingSituation}
          onValueChange={(value) => onChange({
            ...data,
            housing: { ...data.housing, livingSituation: value, housingTier: "", locationType: "", paysMortgage: "" }
          })}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {livingSituations.map((situation) => {
            const Icon = situation.icon;
            return (
              <div key={situation.value} className="relative">
                <RadioGroupItem value={situation.value} id={`living-${situation.value}`} className="peer sr-only" data-testid={`radio-living-${situation.value.toLowerCase()}`} />
                <Label 
                  htmlFor={`living-${situation.value}`} 
                  className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all min-h-[100px] sm:min-h-[120px]
                    hover:border-primary/50 hover:bg-primary/5
                    peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10
                    peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 mb-2 peer-data-[state=checked]:text-primary" />
                  <span className="text-sm sm:text-base font-semibold text-center peer-data-[state=checked]:text-primary">{situation.label}</span>
                  <span className="text-xs sm:text-sm text-muted-foreground text-center mt-1">{situation.desc}</span>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>

      {canShowTier && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <Label className="text-base sm:text-lg font-semibold block">How would you describe your housing?</Label>
          <RadioGroup
            value={data.housing.housingTier}
            onValueChange={(value) => onChange({
              ...data,
              housing: { ...data.housing, housingTier: value }
            })}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            {housingTiers.map((tier) => (
              <div key={tier.value} className="relative">
                <RadioGroupItem value={tier.value} id={`tier-${tier.value}`} className="peer sr-only" data-testid={`radio-tier-${tier.value.toLowerCase()}`} />
                <Label 
                  htmlFor={`tier-${tier.value}`} 
                  className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all min-h-[80px] sm:min-h-[100px]
                    hover:border-primary/50 hover:bg-primary/5
                    peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10
                    peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                >
                  <span className="text-sm sm:text-base font-semibold text-center peer-data-[state=checked]:text-primary">{tier.label}</span>
                  <span className="text-xs sm:text-sm text-muted-foreground text-center mt-1">{tier.desc}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {canShowLocation && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-emerald-600" />
            </div>
            <Label className="text-base sm:text-lg font-semibold">Where is your home located?</Label>
          </div>
          <RadioGroup
            value={data.housing.locationType}
            onValueChange={(value) => onChange({
              ...data,
              housing: { ...data.housing, locationType: value }
            })}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {locationTypes.map((location) => (
              <div key={location.value} className="relative">
                <RadioGroupItem value={location.value} id={`location-${location.value}`} className="peer sr-only" data-testid={`radio-location-${location.value.toLowerCase()}`} />
                <Label 
                  htmlFor={`location-${location.value}`} 
                  className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all min-h-[80px] sm:min-h-[100px]
                    hover:border-primary/50 hover:bg-primary/5
                    peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10
                    peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                >
                  <span className="text-sm sm:text-base font-semibold text-center peer-data-[state=checked]:text-primary">{location.label}</span>
                  <span className="text-xs sm:text-sm text-muted-foreground text-center mt-1">{location.desc}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {canShowMortgage && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <Label className="text-base sm:text-lg font-semibold block">Do you pay a mortgage?</Label>
          <RadioGroup
            value={data.housing.paysMortgage}
            onValueChange={(value) => onChange({
              ...data,
              housing: { ...data.housing, paysMortgage: value }
            })}
            className="grid grid-cols-2 gap-3"
          >
            {[
              { value: "Yes", label: "Yes, I have a mortgage" },
              { value: "No", label: "No, fully paid off" },
            ].map((option) => (
              <div key={option.value} className="relative">
                <RadioGroupItem value={option.value} id={`mortgage-${option.value}`} className="peer sr-only" data-testid={`radio-mortgage-${option.value.toLowerCase()}`} />
                <Label 
                  htmlFor={`mortgage-${option.value}`} 
                  className="flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all
                    hover:border-primary/50 hover:bg-primary/5
                    peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary
                    peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                >
                  <span className="text-sm sm:text-base font-medium text-center">{option.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}
    </div>
  );
}
