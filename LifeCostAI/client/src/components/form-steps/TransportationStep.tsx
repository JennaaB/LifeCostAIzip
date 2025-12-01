import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FormData } from "../LifestyleForm";
import { Bike, Bus, Car, Smartphone, Home, Fuel } from "lucide-react";

interface TransportationStepProps {
  data: FormData;
  onChange: (data: FormData) => void;
}

export default function TransportationStep({ data, onChange }: TransportationStepProps) {
  const methods = [
    { value: "Walk/Bike", label: "Walk/Bike", icon: Bike },
    { value: "Public Transit", label: "Public Transit", icon: Bus },
    { value: "Personal Car", label: "Personal Car", icon: Car },
    { value: "Rideshare (Uber/Lyft)", label: "Rideshare", icon: Smartphone },
    { value: "Work from Home", label: "Work from Home", icon: Home },
  ];
  
  const rideshareFrequencies = [
    "Never",
    "Rarely (less than monthly)",
    "About once a month",
    "A few times a month",
    "Weekly (1-2x)",
    "Several times a week",
  ];
  const parkingOptions = [
    { value: "Yes", label: "Yes, I pay for parking" },
    { value: "No", label: "No, parking is free" },
  ];
  const parkingRateTypes = ["Hourly rate", "Daily rate", "Monthly pass", "Seasonal pass"];
  const transitPassTypes = ["Daily rate", "Monthly pass", "Free (school/employer provided)"];
  const carTypes = [
    { value: "Budget", label: "Budget", desc: "Economy car, regular gas" },
    { value: "Mid-range", label: "Mid-range", desc: "Standard sedan or SUV" },
    { value: "Luxury", label: "Luxury", desc: "Premium car, premium gas" },
  ];

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="space-y-4">
        <Label className="text-base sm:text-lg font-semibold block">How do you usually commute to work or daily activities?</Label>
        <RadioGroup
          value={data.transportation.commuteMethod}
          onValueChange={(value) => onChange({
            ...data,
            transportation: { ...data.transportation, commuteMethod: value, payForParking: "", parkingRateType: "", transitPassType: "", carType: "" }
          })}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
        >
          {methods.map((method) => {
            const Icon = method.icon;
            return (
              <div key={method.value} className="relative">
                <RadioGroupItem value={method.value} id={`method-${method.value}`} className="peer sr-only" data-testid={`radio-commute-${method.label.toLowerCase()}`} />
                <Label 
                  htmlFor={`method-${method.value}`} 
                  className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all min-h-[90px] sm:min-h-[100px]
                    hover:border-primary/50 hover:bg-primary/5
                    peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10
                    peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 mb-2 peer-data-[state=checked]:text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-center">{method.label}</span>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>

      {data.transportation.commuteMethod === "Public Transit" && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <Label className="text-base sm:text-lg font-semibold block">What type of public transit pass do you use?</Label>
          <RadioGroup
            value={data.transportation.transitPassType}
            onValueChange={(value) => onChange({
              ...data,
              transportation: { ...data.transportation, transitPassType: value }
            })}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            {transitPassTypes.map((type) => (
              <div key={type} className="relative">
                <RadioGroupItem value={type} id={`transit-${type}`} className="peer sr-only" data-testid={`radio-transit-${type.toLowerCase()}`} />
                <Label 
                  htmlFor={`transit-${type}`} 
                  className="flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all
                    hover:border-primary/50 hover:bg-primary/5
                    peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary
                    peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                >
                  <span className="text-sm sm:text-base font-medium text-center">{type}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {data.transportation.commuteMethod === "Personal Car" && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <Fuel className="w-4 h-4 text-blue-600" />
            </div>
            <Label className="text-base sm:text-lg font-semibold">What type of car do you drive?</Label>
          </div>
          <RadioGroup
            value={data.transportation.carType}
            onValueChange={(value) => onChange({
              ...data,
              transportation: { ...data.transportation, carType: value }
            })}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            {carTypes.map((type) => (
              <div key={type.value} className="relative">
                <RadioGroupItem value={type.value} id={`car-type-${type.value}`} className="peer sr-only" data-testid={`radio-car-${type.value.toLowerCase()}`} />
                <Label 
                  htmlFor={`car-type-${type.value}`} 
                  className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all min-h-[80px] sm:min-h-[100px]
                    hover:border-primary/50 hover:bg-primary/5
                    peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10
                    peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                >
                  <span className="text-sm sm:text-base font-semibold text-center peer-data-[state=checked]:text-primary">{type.label}</span>
                  <span className="text-xs sm:text-sm text-muted-foreground text-center mt-1">{type.desc}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {data.transportation.commuteMethod === "Personal Car" && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <Label className="text-base sm:text-lg font-semibold block">Do you pay for parking?</Label>
          <RadioGroup
            value={data.transportation.payForParking}
            onValueChange={(value) => onChange({
              ...data,
              transportation: { ...data.transportation, payForParking: value, parkingRateType: "" }
            })}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {parkingOptions.map((option) => (
              <div key={option.value} className="relative">
                <RadioGroupItem value={option.value} id={`parking-${option.value}`} className="peer sr-only" data-testid={`radio-parking-${option.value.toLowerCase()}`} />
                <Label 
                  htmlFor={`parking-${option.value}`} 
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

      {data.transportation.payForParking === "Yes" && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <Label className="text-base sm:text-lg font-semibold block">What type of parking rate do you pay?</Label>
          <RadioGroup
            value={data.transportation.parkingRateType}
            onValueChange={(value) => onChange({
              ...data,
              transportation: { ...data.transportation, parkingRateType: value }
            })}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {parkingRateTypes.map((rate) => (
              <div key={rate} className="relative">
                <RadioGroupItem value={rate} id={`rate-${rate}`} className="peer sr-only" data-testid={`radio-rate-${rate.toLowerCase()}`} />
                <Label 
                  htmlFor={`rate-${rate}`} 
                  className="flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all
                    hover:border-primary/50 hover:bg-primary/5
                    peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary
                    peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                >
                  <span className="text-sm sm:text-base font-medium text-center">{rate}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      <div className="space-y-4">
        <Label className="text-base sm:text-lg font-semibold block">How often do you use rideshare services (Uber/Lyft)?</Label>
        <RadioGroup
          value={data.transportation.rideshareTripsPerWeek}
          onValueChange={(value) => onChange({
            ...data,
            transportation: { ...data.transportation, rideshareTripsPerWeek: value }
          })}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        >
          {rideshareFrequencies
            .filter((freq) => data.transportation.commuteMethod === "Rideshare (Uber/Lyft)" ? freq !== "Never" : true)
            .map((frequency) => (
            <div key={frequency} className="relative">
              <RadioGroupItem value={frequency} id={`rideshare-${frequency}`} className="peer sr-only" data-testid={`radio-rideshare-${frequency.toLowerCase()}`} />
              <Label 
                htmlFor={`rideshare-${frequency}`} 
                className="flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all
                  hover:border-primary/50 hover:bg-primary/5
                  peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary
                  peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
              >
                <span className="text-sm sm:text-base font-medium text-center">{frequency}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
