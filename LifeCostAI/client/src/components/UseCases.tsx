import { Card } from "@/components/ui/card";
import { MapPin, Target, Lightbulb } from "lucide-react";

export default function UseCases() {
  const useCases = [
    {
      icon: MapPin,
      title: "Planning a Move?",
      description: "Compare your current lifestyle costs with cities you're considering. Make informed decisions about relocation based on real spending patterns.",
      color: "bg-chart-1",
    },
    {
      icon: Target,
      title: "Setting Financial Goals?",
      description: "Identify your biggest spending drivers and get personalized recommendations to align your habits with your financial objectives.",
      color: "bg-chart-2",
    },
    {
      icon: Lightbulb,
      title: "Curious About Habits?",
      description: "Get instant clarity on where your money goes each month. No spreadsheets, no bank connections—just honest insights about your lifestyle.",
      color: "bg-chart-3",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold">Who Is This For?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're planning, optimizing, or just exploring—we've got you covered
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <Card key={index} className="p-8 space-y-6 hover-elevate">
              <div className={`w-14 h-14 rounded-lg ${useCase.color}/20 flex items-center justify-center`}>
                <useCase.icon className={`w-7 h-7 text-chart-${index + 1}`} />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">{useCase.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{useCase.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
