import { Button } from "@/components/ui/button";
import { Sparkles, Shield, TrendingUp, Coffee, Car, Dumbbell, Tv, ShoppingBag, Target } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
  onSeeExample?: () => void;
}

export default function Hero({ onGetStarted, onSeeExample }: HeroProps) {
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
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={onSeeExample} data-testid="button-see-example">
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
          
          {/* Right: Dashboard Preview */}
          <div className="relative">
            <div className="relative rounded-lg bg-gradient-to-br from-primary/10 to-chart-2/10 p-8 border border-primary/20 space-y-5">
              {/* Main Metric Card */}
              <div className="bg-background/80 backdrop-blur-sm border border-border rounded-lg p-5 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">ESTIMATED MONTHLY COST</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">$2,400 - $3,200</span>
                  <span className="text-sm text-muted-foreground">/month</span>
                </div>
              </div>

              {/* Key Insights Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background/80 backdrop-blur-sm border border-border rounded-lg p-3 text-center space-y-1">
                  <p className="text-xs text-muted-foreground">Top Category</p>
                  <p className="text-sm font-semibold">Food & Dining</p>
                </div>
                <div className="bg-background/80 backdrop-blur-sm border border-border rounded-lg p-3 text-center space-y-1">
                  <p className="text-xs text-muted-foreground">Goal Alignment</p>
                  <p className="text-sm font-semibold text-primary">72%</p>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="bg-background/80 backdrop-blur-sm border border-border rounded-lg p-4 space-y-3">
                <p className="text-xs font-semibold text-muted-foreground">CATEGORY BREAKDOWN</p>
                <div className="space-y-2.5">
                  {[
                    { icon: Coffee, label: "Food & Dining", color: "bg-chart-1", width: 65 },
                    { icon: Car, label: "Transportation", color: "bg-chart-2", width: 45 },
                    { icon: Dumbbell, label: "Health & Wellness", color: "bg-chart-4", width: 38 },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`${item.color}/20 rounded p-1 shrink-0`}>
                            <item.icon className={`w-3 h-3 ${item.color}`} />
                          </div>
                          <span className="text-xs font-medium truncate">{item.label}</span>
                        </div>
                        <span className="text-xs text-muted-foreground ml-2">{item.width}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all`}
                          style={{ width: `${item.width}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendation Card */}
              <div className="bg-background/80 backdrop-blur-sm border border-border rounded-lg p-4 space-y-2">
                <div className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold">Meal Prep Sundays</p>
                    <p className="text-xs text-muted-foreground">Save ~$180/month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
