import { Button } from "@/components/ui/button";
import { Sparkles, Shield, TrendingUp, Coffee, Car, Dumbbell, Tv, ShoppingBag, Target, SlidersHorizontal, CheckCircle2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

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
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Your Lifestyle Snapshot in 2 Minutes</span>
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
          </div>
          
          {/* Right: Feature Highlights */}
          <div className="relative">
            <div className="relative rounded-lg bg-gradient-to-br from-primary/10 to-chart-2/10 p-8 border border-primary/20 space-y-6">
              {/* Goal Alignment & Categories */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Align spending with your goals</p>
                <div className="bg-background/80 backdrop-blur-sm border border-border rounded-lg p-5">
                  <div className="grid grid-cols-2 gap-4 items-center">
                    {/* Goal Status */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <p className="text-sm font-semibold">Goal Alignment</p>
                      </div>
                      <p className="text-3xl font-bold text-primary">72%</p>
                      <p className="text-xs text-muted-foreground">Your habits align with your spending goals</p>
                    </div>

                    {/* Pie Chart */}
                    <div className="flex justify-center">
                      <ResponsiveContainer width={140} height={140}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Food", value: 28, color: "hsl(var(--chart-1))" },
                              { name: "Transport", value: 18, color: "hsl(var(--chart-2))" },
                              { name: "Wellness", value: 12, color: "hsl(var(--chart-4))" },
                              { name: "Other", value: 42, color: "hsl(var(--chart-5))" },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={35}
                            outerRadius={60}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {[
                              { color: "hsl(var(--chart-1))" },
                              { color: "hsl(var(--chart-2))" },
                              { color: "hsl(var(--chart-4))" },
                              { color: "hsl(var(--chart-5))" },
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              {/* Unlock Features */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Unlock powerful insights</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-background/80 backdrop-blur-sm border border-border rounded-lg p-4 space-y-2 hover-elevate transition-all">
                    <div className="w-8 h-8 rounded-lg bg-chart-2/20 flex items-center justify-center">
                      <SlidersHorizontal className="w-4 h-4 text-chart-2" />
                    </div>
                    <p className="text-xs font-semibold">Spending Simulator</p>
                    <p className="text-xs text-muted-foreground">Test "what-if" scenarios</p>
                  </div>
                  
                  <div className="bg-background/80 backdrop-blur-sm border border-border rounded-lg p-4 space-y-2 hover-elevate transition-all">
                    <div className="w-8 h-8 rounded-lg bg-chart-4/20 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-chart-4" />
                    </div>
                    <p className="text-xs font-semibold">City Comparison</p>
                    <p className="text-xs text-muted-foreground">Compare 25 global cities</p>
                  </div>

                  <div className="bg-background/80 backdrop-blur-sm border border-border rounded-lg p-4 space-y-2 hover-elevate transition-all">
                    <div className="w-8 h-8 rounded-lg bg-chart-5/20 flex items-center justify-center">
                      <Target className="w-4 h-4 text-chart-5" />
                    </div>
                    <p className="text-xs font-semibold">Smart Tips</p>
                    <p className="text-xs text-muted-foreground">Personalized recommendations</p>
                  </div>

                  <div className="bg-background/80 backdrop-blur-sm border border-border rounded-lg p-4 space-y-2 hover-elevate transition-all">
                    <div className="w-8 h-8 rounded-lg bg-chart-1/20 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-chart-1" />
                    </div>
                    <p className="text-xs font-semibold">AI-Powered</p>
                    <p className="text-xs text-muted-foreground">No bank access needed</p>
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
