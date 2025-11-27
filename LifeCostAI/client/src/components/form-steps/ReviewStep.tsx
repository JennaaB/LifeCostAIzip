import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coffee, Car, Dumbbell, Tv, ShoppingBag, Users, Target, CheckCircle2 } from "lucide-react";
import type { FormData } from "../LifestyleForm";

interface ReviewStepProps {
  data: FormData;
}

export default function ReviewStep({ data }: ReviewStepProps) {
  const sections = [
    {
      icon: Coffee,
      title: "Food & Dining",
      color: "bg-amber-100 text-amber-600",
      items: [
        { label: "Coffee", value: data.foodDining.coffeeFrequency },
        { label: "Delivery", value: data.foodDining.deliveryFrequency },
        { label: "Dining Out", value: data.foodDining.diningOutFrequency },
        ...(data.foodDining.diningStyle ? [{ label: "Dining Style", value: data.foodDining.diningStyle.split("(")[0].trim() }] : []),
      ],
    },
    {
      icon: Car,
      title: "Transportation",
      color: "bg-blue-100 text-blue-600",
      items: [
        { label: "Method", value: data.transportation.commuteMethod },
        { label: "Rideshare/Week", value: data.transportation.rideshareTripsPerWeek },
        ...(data.transportation.parkingRateType ? [{ label: "Parking", value: data.transportation.parkingRateType }] : []),
        ...(data.transportation.transitPassType ? [{ label: "Transit Pass", value: data.transportation.transitPassType }] : []),
      ],
    },
    {
      icon: Dumbbell,
      title: "Fitness & Wellness",
      color: "bg-green-100 text-green-600",
      items: [
        { label: "Membership", value: data.fitness.hasMembership === "yes" ? "Yes" : data.fitness.hasMembership === "no" ? "No" : data.fitness.hasMembership },
        ...(data.fitness.membershipTier ? [{ label: "Tier", value: data.fitness.membershipTier }] : []),
        ...(data.fitness.dropInSessionsPerWeek ? [{ label: "Drop-in Sessions", value: data.fitness.dropInSessionsPerWeek }] : []),
        ...(data.fitness.wellnessSpend.length > 0 && !data.fitness.wellnessSpend.every(w => w === "None") ? [{ label: "Wellness", value: data.fitness.wellnessSpend.filter(w => w !== "None").join(", ") }] : []),
        ...(data.fitness.hairCutFrequency && data.fitness.hairCutFrequency !== "Never" ? [{ label: "Hair Cut", value: data.fitness.hairCutFrequency }] : []),
      ],
    },
    {
      icon: Tv,
      title: "Subscriptions",
      color: "bg-violet-100 text-violet-600",
      items: [
        { label: "Has Subscriptions", value: data.subscriptions.hasSubscriptions === "yes" ? "Yes" : data.subscriptions.hasSubscriptions === "no" ? "No" : data.subscriptions.hasSubscriptions },
        ...(data.subscriptions.services.length > 0 ? [{ label: "Services", value: data.subscriptions.services.join(", ") }] : []),
        ...(data.subscriptions.other ? [{ label: "Other", value: data.subscriptions.other }] : []),
      ],
    },
    {
      icon: ShoppingBag,
      title: "Shopping",
      color: "bg-pink-100 text-pink-600",
      items: [
        { label: "Frequency", value: data.shopping.clothingFrequency },
        { label: "Buying Habit", value: data.shopping.buyingHabit?.split("(")[0].trim() },
        { label: "Style", value: data.shopping.shoppingStyle?.split("&")[0].trim() },
        { label: "Personal Care", value: data.shopping.personalCare?.split("(")[0].trim() },
      ],
    },
    {
      icon: Users,
      title: "Social",
      color: "bg-orange-100 text-orange-600",
      items: [
        { label: "Style", value: data.social.socializingStyle },
        ...(data.social.hostingFrequency ? [{ label: "Hosting", value: `${data.social.hostingFrequency} - ${data.social.hostingStyle}` }] : []),
        ...(data.social.casualFrequency ? [{ label: "Outings", value: `${data.social.casualFrequency} - ${data.social.casualType}` }] : []),
        ...(data.social.activeFrequency ? [{ label: "Activities", value: `${data.social.activeFrequency} - ${data.social.activeType}` }] : []),
        ...(data.social.nightlifeFrequency ? [{ label: "Nightlife", value: `${data.social.nightlifeFrequency} - ${data.social.nightlifeStyle}` }] : []),
        ...(data.social.buyingRounds ? [{ label: "Buying Rounds", value: data.social.buyingRounds }] : []),
      ],
    },
    {
      icon: Target,
      title: "Goals & Values",
      color: "bg-rose-100 text-rose-600",
      items: [
        { label: "Primary Goal", value: data.goals.primaryGoal?.split("(")[0].trim() },
        { label: "Values", value: data.goals.values && data.goals.values.length > 0 ? data.goals.values.join(", ") : "Not selected" },
      ],
    },
  ];

  const completedSections = sections.filter(section => 
    section.items.some(item => item.value)
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4 p-4 sm:p-5 rounded-xl bg-primary/5 border border-primary/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-base sm:text-lg">Almost done!</h3>
            <p className="text-sm text-muted-foreground">Review your answers below</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-sm py-1.5 px-3">
          {completedSections}/{sections.length} sections completed
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => {
          const Icon = section.icon;
          const hasContent = section.items.some(item => item.value);
          
          return (
            <Card key={section.title} className={`p-4 sm:p-5 transition-all ${!hasContent ? "opacity-60" : ""}`}>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg ${section.color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0 space-y-3">
                  <h4 className="font-semibold text-base">{section.title}</h4>
                  <div className="space-y-2">
                    {section.items.map((item) => (
                      item.value && (
                        <div key={item.label} className="flex flex-wrap gap-2 items-baseline">
                          <span className="text-xs sm:text-sm text-muted-foreground shrink-0">{item.label}:</span>
                          <span className="text-xs sm:text-sm font-medium break-words">{item.value}</span>
                        </div>
                      )
                    ))}
                    {!hasContent && (
                      <span className="text-sm text-muted-foreground italic">No data entered</span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <p className="text-center text-sm text-muted-foreground pt-4">
        Click "Generate Insights" to see your personalized spending analysis
      </p>
    </div>
  );
}
