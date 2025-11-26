import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { FormData } from "../LifestyleForm";

interface SubscriptionsStepProps {
  data: FormData;
  onChange: (data: FormData) => void;
}

export default function SubscriptionsStep({ data, onChange }: SubscriptionsStepProps) {
  const subscriptionServices = ["Netflix", "Disney+", "Spotify", "Amazon Prime", "ChatGPT", "Claude", "Crave", "UberOne"];

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
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="text-base font-semibold">Do you pay for any subscriptions?</Label>
        <RadioGroup
          value={data.subscriptions.hasSubscriptions}
          onValueChange={(value) => onChange({
            ...data,
            subscriptions: { ...data.subscriptions, hasSubscriptions: value, services: [], other: "" }
          })}
        >
          <div className="flex items-center space-x-3 p-3 rounded-lg hover-elevate">
            <RadioGroupItem value="yes" id="subs-yes" data-testid="radio-subscriptions-yes" />
            <Label htmlFor="subs-yes" className="cursor-pointer font-normal flex-1">Yes</Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg hover-elevate">
            <RadioGroupItem value="no" id="subs-no" data-testid="radio-subscriptions-no" />
            <Label htmlFor="subs-no" className="cursor-pointer font-normal flex-1">No</Label>
          </div>
        </RadioGroup>
      </div>

      {data.subscriptions.hasSubscriptions === "yes" && (
        <>
          <div className="space-y-4">
            <Label className="text-base font-semibold">Which services do you subscribe to?</Label>
            <div className="space-y-3">
              {subscriptionServices.map((service) => (
                <div key={service} className="flex items-center space-x-3 p-3 rounded-lg border hover-elevate">
                  <Checkbox
                    id={`service-${service}`}
                    checked={data.subscriptions.services.includes(service)}
                    onCheckedChange={() => toggleService(service)}
                    data-testid={`checkbox-service-${service.toLowerCase()}`}
                  />
                  <Label htmlFor={`service-${service}`} className="cursor-pointer font-normal flex-1">
                    {service}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label htmlFor="other-subs" className="text-base font-semibold">
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
              data-testid="input-other-subscriptions"
            />
          </div>
        </>
      )}
    </div>
  );
}
