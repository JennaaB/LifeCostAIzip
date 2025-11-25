import { Card } from "@/components/ui/card";
import { ClipboardList, Sparkles, BarChart3 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: ClipboardList,
      title: "Answer Lifestyle Questions",
      description: "Tell us about your daily habits like coffee runs, commute, and fitness routines. No numbers or bank details needed.",
    },
    {
      icon: Sparkles,
      title: "AI Analyzes Your Habits",
      description: "Our AI interprets your lifestyle using typical market prices to estimate your spending patterns.",
    },
    {
      icon: BarChart3,
      title: "Get Instant Insights",
      description: "See your spending breakdown, top drivers, personalized tips, and compare costs across global cities.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to understand your lifestyle spending
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="p-8 space-y-4 hover-elevate">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-primary/30">{index + 1}</span>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
