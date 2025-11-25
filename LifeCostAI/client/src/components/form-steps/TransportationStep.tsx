import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FormData } from "../LifestyleForm";

interface TransportationStepProps {
  data: FormData;
  onChange: (data: FormData) => void;
}

export default function TransportationStep({ data, onChange }: TransportationStepProps) {
  const methods = [
    "Walk/Bike",
    "Public Transit",
    "Personal Car",
    "Rideshare (Uber/Lyft)",
    "Work from Home"
  ];

  const distances = ["Under 5 km", "5-10 km", "10-20 km", "20-50 km", "50+ km"];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="text-base font-semibold">How do you usually commute to work or daily activities?</Label>
        <RadioGroup
          value={data.transportation.commuteMethod}
          onValueChange={(value) => onChange({
            ...data,
            transportation: { ...data.transportation, commuteMethod: value }
          })}
        >
          {methods.map((method) => (
            <div key={method} className="flex items-center space-x-3 p-3 rounded-lg hover-elevate">
              <RadioGroupItem value={method} id={`method-${method}`} data-testid={`radio-commute-${method.toLowerCase()}`} />
              <Label htmlFor={`method-${method}`} className="cursor-pointer font-normal flex-1">{method}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {data.transportation.commuteMethod && data.transportation.commuteMethod !== "Work from Home" && (
        <div className="space-y-4">
          <Label className="text-base font-semibold">What's your typical one-way commute distance?</Label>
          <RadioGroup
            value={data.transportation.distance}
            onValueChange={(value) => onChange({
              ...data,
              transportation: { ...data.transportation, distance: value }
            })}
          >
            {distances.map((distance) => (
              <div key={distance} className="flex items-center space-x-3 p-3 rounded-lg hover-elevate">
                <RadioGroupItem value={distance} id={`distance-${distance}`} data-testid={`radio-distance-${distance.toLowerCase()}`} />
                <Label htmlFor={`distance-${distance}`} className="cursor-pointer font-normal flex-1">{distance}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}
    </div>
  );
}
