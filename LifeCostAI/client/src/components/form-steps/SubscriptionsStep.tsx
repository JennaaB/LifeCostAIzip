import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { FormData } from "../LifestyleForm";
import { Tv, Music, Film, ShoppingCart, Bot, MessageSquare, Play, Car } from "lucide-react";

interface SubscriptionsStepProps {
  data: FormData;
  onChange: (data: FormData) => void;
}

export default function SubscriptionsStep({ data, onChange }: SubscriptionsStepProps) {
  const subscriptionServices = [
    { value: "Netflix", label: "Netflix", icon: Film },
    { value: "Disney+", label: "Disney+", icon: Play },
    { value: "Spotify", label: "Spotify", icon: Music },
    { value: "Amazon Prime", label: "Amazon Prime", icon: ShoppingCart },
    { value: "ChatGPT", label: "ChatGPT", icon: Bot },
    { value: "Claude", label: "Claude", icon: MessageSquare },
    { value: "Crave", label: "Crave", icon: Tv },
    { value: "UberOne", label: "UberOne", icon: Car },
  ];

  const toggleService = (service: string) => {
    const current = data.subscriptions.services;
    const updated = current.includes(service)
      ? current.filter(s => s !== service)
      : [...current, service];
    
    onChange({
      ...data,
      subscriptions: { ...data.subscriptions, services: updated }
    });
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
            <Tv className="w-4 h-4 text-violet-600" />
          </div>
          <Label className="text-base sm:text-lg font-semibold">Do you pay for any subscriptions?</Label>
        </div>
        <RadioGroup
          value={data.subscriptions.hasSubscriptions}
          onValueChange={(value) => onChange({
            ...data,
            subscriptions: { ...data.subscriptions, hasSubscriptions: value, services: [], other: "" }
          })}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          <div className="relative">
            <RadioGroupItem value="yes" id="subs-yes" className="peer sr-only" data-testid="radio-subscriptions-yes" />
            <Label 
              htmlFor="subs-yes" 
              className="flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all
                hover:border-primary/50 hover:bg-primary/5
                peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary
                peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
            >
              <span className="text-sm sm:text-base font-medium">Yes, I have subscriptions</span>
            </Label>
          </div>
          <div className="relative">
            <RadioGroupItem value="no" id="subs-no" className="peer sr-only" data-testid="radio-subscriptions-no" />
            <Label 
              htmlFor="subs-no" 
              className="flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all
                hover:border-primary/50 hover:bg-primary/5
                peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary
                peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
            >
              <span className="text-sm sm:text-base font-medium">No subscriptions</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {data.subscriptions.hasSubscriptions === "yes" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="space-y-4">
            <Label className="text-base sm:text-lg font-semibold block">Which services do you subscribe to?</Label>
            <p className="text-sm text-muted-foreground">Select all that apply</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {subscriptionServices.map((service) => {
                const Icon = service.icon;
                return (
                  <div key={service.value} className="flex items-center gap-3">
                    <Checkbox
                      id={`service-${service.value}`}
                      checked={data.subscriptions.services.includes(service.value)}
                      onCheckedChange={() => toggleService(service.value)}
                      className="h-5 w-5"
                      data-testid={`checkbox-service-${service.value.toLowerCase()}`}
                    />
                    <Label 
                      htmlFor={`service-${service.value}`} 
                      className="flex items-center gap-2 text-sm sm:text-base font-medium cursor-pointer"
                    >
                      <Icon className="w-5 h-5 text-muted-foreground" />
                      {service.label}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <Label htmlFor="other-subs" className="text-base sm:text-lg font-semibold block">
              Other subscriptions
            </Label>
            <Input
              id="other-subs"
              placeholder="e.g., Adobe Creative Cloud, Notion, meal kit service..."
              value={data.subscriptions.other}
              onChange={(e) => onChange({
                ...data,
                subscriptions: { ...data.subscriptions, other: e.target.value }
              })}
              className="h-12"
              data-testid="input-other-subscriptions"
            />
          </div>
        </div>
      )}
    </div>
  );
}
