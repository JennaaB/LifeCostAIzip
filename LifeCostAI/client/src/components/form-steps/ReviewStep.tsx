import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coffee, Car, Dumbbell, Tv, ShoppingBag, Target } from "lucide-react";
import type { FormData } from "../LifestyleForm";

interface ReviewStepProps {
  data: FormData;
}

export default function ReviewStep({ data }: ReviewStepProps) {
  const sections = [
    {
      icon: Coffee,
      title: "Food & Dining",
      items: [
        { label: "Coffee", value: data.foodDining.coffeeFrequency },
        { label: "Delivery", value: data.foodDining.deliveryFrequency },
        { label: "Dining Out", value: data.foodDining.diningOutFrequency },
      ],
    },
    {
      icon: Car,
      title: "Transportation",
      items: [
        { label: "Method", value: data.transportation.commuteMethod },
        { label: "Distance", value: data.transportation.distance },
      ],
    },
    {
      icon: Dumbbell,
      title: "Fitness",
      items: [
        { label: "Gym", value: data.fitness.gymMembership ? "Yes" : "No" },
        { label: "Classes", value: data.fitness.classesPerMonth },
      ],
    },
    {
      icon: Tv,
      title: "Subscriptions",
      items: [
        { label: "Streaming", value: data.subscriptions.streaming.join(", ") || "None" },
        { label: "Other", value: data.subscriptions.other || "None" },
      ],
    },
    {
      icon: ShoppingBag,
      title: "Shopping",
      items: [
        { label: "Clothing", value: data.shopping.clothingFrequency },
        { label: "Personal Care", value: data.shopping.personalCare },
      ],
    },
    {
      icon: Target,
      title: "Goals & Values",
      items: [
        { label: "Primary Goal", value: data.goals.primaryGoal },
        { label: "Values", value: data.goals.values.join(", ") || "None selected" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Review your lifestyle snapshot below. When you're ready, click "Generate Insights" to see your personalized analysis.
      </p>

      <div className="grid gap-4">
        {sections.map((section) => (
          <Card key={section.title} className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <section.icon className="w-5 h-5 text-primary" />
              </div>
              
              <div className="flex-1 space-y-3">
                <h4 className="font-semibold">{section.title}</h4>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    item.value && (
                      <div key={item.label} className="flex flex-wrap gap-2 items-center">
                        <span className="text-sm text-muted-foreground min-w-[100px]">{item.label}:</span>
                        <Badge variant="secondary" className="font-normal">
                          {item.value}
                        </Badge>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
