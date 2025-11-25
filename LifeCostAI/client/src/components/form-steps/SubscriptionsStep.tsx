import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import type { FormData } from "../LifestyleForm";

interface SubscriptionsStepProps {
  data: FormData;
  onChange: (data: FormData) => void;
}

export default function SubscriptionsStep({ data, onChange }: SubscriptionsStepProps) {
  const streamingServices = [
    "Netflix",
    "Spotify/Apple Music",
    "Disney+",
    "Amazon Prime",
    "YouTube Premium",
    "HBO Max",
  ];

  const toggleStreaming = (service: string) => {
    const current = data.subscriptions.streaming;
    const updated = current.includes(service)
      ? current.filter(s => s !== service)
      : [...current, service];
    
    onChange({
      ...data,
      subscriptions: { ...data.subscriptions, streaming: updated }
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="text-base font-semibold">Which streaming services do you subscribe to?</Label>
        <div className="space-y-3">
          {streamingServices.map((service) => (
            <div key={service} className="flex items-center space-x-3 p-3 rounded-lg border hover-elevate">
              <Checkbox
                id={`streaming-${service}`}
                checked={data.subscriptions.streaming.includes(service)}
                onCheckedChange={() => toggleStreaming(service)}
                data-testid={`checkbox-streaming-${service.toLowerCase()}`}
              />
              <Label htmlFor={`streaming-${service}`} className="cursor-pointer font-normal flex-1">
                {service}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label htmlFor="other-subs" className="text-base font-semibold">
          Any other subscriptions? (software, apps, services)
        </Label>
        <Textarea
          id="other-subs"
          placeholder="e.g., Adobe Creative Cloud, iCloud storage, meal kit service..."
          value={data.subscriptions.other}
          onChange={(e) => onChange({
            ...data,
            subscriptions: { ...data.subscriptions, other: e.target.value }
          })}
          rows={4}
          data-testid="textarea-other-subscriptions"
        />
      </div>
    </div>
  );
}
