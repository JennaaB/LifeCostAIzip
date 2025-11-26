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

  
  const rideshareFrequencies = ["Never", "1-2 times", "3-5 times", "6-10 times", "10+ times"];
  
  const passesOptions = ["None", "Monthly pass/subscription", "Parking only", "Both pass and parking"];
  
  const parkingOptions = ["Yes", "No"];
  
  const parkingRateTypes = ["Hourly rate", "Daily rate", "Monthly pass", "Seasonal pass"];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="text-base font-semibold">How do you usually commute to work or daily activities?</Label>
        <RadioGroup
          value={data.transportation.commuteMethod}
          onValueChange={(value) => onChange({
            ...data,
            transportation: { ...data.transportation, commuteMethod: value, payForParking: "", parkingRateType: "" }
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


      {data.transportation.commuteMethod === "Personal Car" && (
        <div className="space-y-4">
          <Label className="text-base font-semibold">Do you pay for parking?</Label>
          <RadioGroup
            value={data.transportation.payForParking}
            onValueChange={(value) => onChange({
              ...data,
              transportation: { ...data.transportation, payForParking: value, parkingRateType: "" }
            })}
          >
            {parkingOptions.map((option) => (
              <div key={option} className="flex items-center space-x-3 p-3 rounded-lg hover-elevate">
                <RadioGroupItem value={option} id={`parking-${option}`} data-testid={`radio-parking-${option.toLowerCase()}`} />
                <Label htmlFor={`parking-${option}`} className="cursor-pointer font-normal flex-1">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {data.transportation.payForParking === "Yes" && (
        <div className="space-y-4">
          <Label className="text-base font-semibold">What type of parking rate do you pay?</Label>
          <RadioGroup
            value={data.transportation.parkingRateType}
            onValueChange={(value) => onChange({
              ...data,
              transportation: { ...data.transportation, parkingRateType: value }
            })}
          >
            {parkingRateTypes.map((rate) => (
              <div key={rate} className="flex items-center space-x-3 p-3 rounded-lg hover-elevate">
                <RadioGroupItem value={rate} id={`rate-${rate}`} data-testid={`radio-rate-${rate.toLowerCase()}`} />
                <Label htmlFor={`rate-${rate}`} className="cursor-pointer font-normal flex-1">{rate}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      <div className="space-y-4">
        <Label className="text-base font-semibold">How many rideshare trips (Uber/Lyft) do you take per week?</Label>
        <RadioGroup
          value={data.transportation.rideshareTripsPerWeek}
          onValueChange={(value) => onChange({
            ...data,
            transportation: { ...data.transportation, rideshareTripsPerWeek: value }
          })}
        >
          {rideshareFrequencies.map((frequency) => (
            <div key={frequency} className="flex items-center space-x-3 p-3 rounded-lg hover-elevate">
              <RadioGroupItem value={frequency} id={`rideshare-${frequency}`} data-testid={`radio-rideshare-${frequency.toLowerCase()}`} />
              <Label htmlFor={`rideshare-${frequency}`} className="cursor-pointer font-normal flex-1">{frequency}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-semibold">Do you pay for any transportation passes or parking?</Label>
        <RadioGroup
          value={data.transportation.transportationPasses}
          onValueChange={(value) => onChange({
            ...data,
            transportation: { ...data.transportation, transportationPasses: value }
          })}
        >
          {passesOptions.map((option) => (
            <div key={option} className="flex items-center space-x-3 p-3 rounded-lg hover-elevate">
              <RadioGroupItem value={option} id={`passes-${option}`} data-testid={`radio-passes-${option.toLowerCase()}`} />
              <Label htmlFor={`passes-${option}`} className="cursor-pointer font-normal flex-1">{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
