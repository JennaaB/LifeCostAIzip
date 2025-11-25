import { Button } from "@/components/ui/button";
import { Sparkles, Shield, TrendingUp } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-6 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Privacy-First Financial Insights</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              AI that reads your{" "}
              <span className="text-primary">lifestyle</span>
              <br />
              — not your bank account
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              Understand your spending habits without ever sharing sensitive financial data. 
              Answer simple lifestyle questions and get personalized insights backed by AI.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={onGetStarted} className="text-lg px-8 py-6" data-testid="button-get-started">
                Start Your Snapshot
                <Sparkles className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" data-testid="button-see-example">
                See Example Dashboard
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                No bank connections
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                No personal data
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Free forever
              </div>
            </div>
          </div>
          
          {/* Right: Visual */}
          <div className="relative">
            <div className="relative rounded-lg bg-gradient-to-br from-primary/10 to-chart-2/10 p-12 border border-primary/20">
              <div className="space-y-6">
                {/* Lifestyle Icons */}
                <div className="grid grid-cols-3 gap-4">
                  {["☕", "🚇", "💪", "📱", "🛍️", "✈️"].map((icon, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-4xl hover-elevate"
                    >
                      {icon}
                    </div>
                  ))}
                </div>
                
                {/* Arrow/Transform Indicator */}
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                </div>
                
                {/* Data Visualization Preview */}
                <div className="space-y-3 bg-background/80 backdrop-blur-sm border border-border rounded-lg p-4">
                  {[
                    { label: "Food & Dining", value: 65, color: "bg-chart-1" },
                    { label: "Transportation", value: 45, color: "bg-chart-2" },
                    { label: "Fitness", value: 30, color: "bg-chart-3" },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.label}</span>
                        <span className="text-muted-foreground">{item.value}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
