import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";
import {
  ArrowLeft,
  RotateCcw,
  Coffee,
  Car,
  Dumbbell,
  Tv,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
  Utensils,
  Wine,
  Sparkles,
} from "lucide-react";

interface SimulatorSettings {
  coffeesPerWeek: number;
  deliveriesPerWeek: number;
  restaurantMealsPerMonth: number;
  rideshareTripsPerWeek: number;
  shoppingTripsPerMonth: number;
  subscriptionCount: number;
  nightsOutPerMonth: number;
  wellnessVisitsPerMonth: number;
}

const defaultSettings: SimulatorSettings = {
  coffeesPerWeek: 5,
  deliveriesPerWeek: 2,
  restaurantMealsPerMonth: 4,
  rideshareTripsPerWeek: 2,
  shoppingTripsPerMonth: 3,
  subscriptionCount: 4,
  nightsOutPerMonth: 2,
  wellnessVisitsPerMonth: 2,
};

const costPerUnit = {
  coffeesPerWeek: 5.50,
  deliveriesPerWeek: 35,
  restaurantMealsPerMonth: 45,
  rideshareTripsPerWeek: 18,
  shoppingTripsPerMonth: 75,
  subscriptionCount: 15,
  nightsOutPerMonth: 65,
  wellnessVisitsPerMonth: 50,
};

const sliderConfigs = [
  { key: "coffeesPerWeek", label: "Coffees per week", icon: Coffee, max: 14, category: "Food & Dining", color: "text-chart-1" },
  { key: "deliveriesPerWeek", label: "Food deliveries per week", icon: Utensils, max: 7, category: "Food & Dining", color: "text-chart-1" },
  { key: "restaurantMealsPerMonth", label: "Restaurant meals per month", icon: Wine, max: 16, category: "Food & Dining", color: "text-chart-1" },
  { key: "rideshareTripsPerWeek", label: "Rideshare trips per week", icon: Car, max: 14, category: "Transportation", color: "text-chart-2" },
  { key: "shoppingTripsPerMonth", label: "Shopping trips per month", icon: ShoppingBag, max: 10, category: "Shopping", color: "text-chart-5" },
  { key: "subscriptionCount", label: "Active subscriptions", icon: Tv, max: 12, category: "Subscriptions", color: "text-chart-3" },
  { key: "nightsOutPerMonth", label: "Nights out per month", icon: Sparkles, max: 12, category: "Food & Dining", color: "text-chart-1" },
  { key: "wellnessVisitsPerMonth", label: "Wellness visits per month", icon: Dumbbell, max: 8, category: "Health & Wellness", color: "text-chart-4" },
];

interface SpendingSimulatorProps {
  onBack: () => void;
  baselineTotal?: number;
}

export default function SpendingSimulator({ onBack, baselineTotal }: SpendingSimulatorProps) {
  const [settings, setSettings] = useState<SimulatorSettings>(defaultSettings);
  
  const baselineAmount = baselineTotal || calculateTotal(defaultSettings);
  
  function calculateTotal(s: SimulatorSettings): number {
    return Math.round(
      (s.coffeesPerWeek * costPerUnit.coffeesPerWeek * 4.33) +
      (s.deliveriesPerWeek * costPerUnit.deliveriesPerWeek * 4.33) +
      (s.restaurantMealsPerMonth * costPerUnit.restaurantMealsPerMonth) +
      (s.rideshareTripsPerWeek * costPerUnit.rideshareTripsPerWeek * 4.33) +
      (s.shoppingTripsPerMonth * costPerUnit.shoppingTripsPerMonth) +
      (s.subscriptionCount * costPerUnit.subscriptionCount) +
      (s.nightsOutPerMonth * costPerUnit.nightsOutPerMonth) +
      (s.wellnessVisitsPerMonth * costPerUnit.wellnessVisitsPerMonth)
    );
  }

  function calculateCategoryTotals(s: SimulatorSettings) {
    const foodDining = Math.round(
      (s.coffeesPerWeek * costPerUnit.coffeesPerWeek * 4.33) +
      (s.deliveriesPerWeek * costPerUnit.deliveriesPerWeek * 4.33) +
      (s.restaurantMealsPerMonth * costPerUnit.restaurantMealsPerMonth) +
      (s.nightsOutPerMonth * costPerUnit.nightsOutPerMonth)
    );
    const transportation = Math.round(s.rideshareTripsPerWeek * costPerUnit.rideshareTripsPerWeek * 4.33);
    const shopping = Math.round(s.shoppingTripsPerMonth * costPerUnit.shoppingTripsPerMonth);
    const subscriptions = Math.round(s.subscriptionCount * costPerUnit.subscriptionCount);
    const fitness = Math.round(s.wellnessVisitsPerMonth * costPerUnit.wellnessVisitsPerMonth);

    return [
      { name: "Food & Dining", amount: foodDining, fill: "hsl(var(--chart-1))" },
      { name: "Transportation", amount: transportation, fill: "hsl(var(--chart-2))" },
      { name: "Subscriptions", amount: subscriptions, fill: "hsl(var(--chart-3))" },
      { name: "Health & Wellness", amount: fitness, fill: "hsl(var(--chart-4))" },
      { name: "Shopping", amount: shopping, fill: "hsl(var(--chart-5))" },
    ].filter(c => c.amount > 0);
  }

  const currentTotal = useMemo(() => calculateTotal(settings), [settings]);
  const categoryData = useMemo(() => calculateCategoryTotals(settings), [settings]);
  const difference = currentTotal - baselineAmount;
  const percentChange = baselineAmount > 0 ? ((difference / baselineAmount) * 100).toFixed(1) : "0";

  const handleSliderChange = (key: keyof SimulatorSettings, value: number[]) => {
    setSettings(prev => ({ ...prev, [key]: value[0] }));
  };

  const handleReset = () => {
    setSettings(defaultSettings);
  };

  const chartConfig = {
    "Food & Dining": { label: "Food & Dining", color: "hsl(var(--chart-1))" },
    "Transportation": { label: "Transportation", color: "hsl(var(--chart-2))" },
    "Subscriptions": { label: "Subscriptions", color: "hsl(var(--chart-3))" },
    "Fitness & Wellness": { label: "Fitness & Wellness", color: "hsl(var(--chart-4))" },
    "Shopping": { label: "Shopping", color: "hsl(var(--chart-5))" },
  };

  const comparisonData = [
    { label: "Baseline", amount: baselineAmount, fill: "hsl(var(--muted-foreground))" },
    { label: "Current", amount: currentTotal, fill: difference > 0 ? "hsl(var(--destructive))" : "hsl(var(--chart-4))" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <Button variant="outline" onClick={handleReset} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset All
          </Button>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Spending Simulator</h1>
          <p className="text-muted-foreground">
            Adjust the sliders to see how lifestyle changes affect your monthly spending
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6 space-y-6">
            <h2 className="text-xl font-semibold">Lifestyle Habits</h2>
            <div className="space-y-6">
              {sliderConfigs.map((config) => {
                const IconComponent = config.icon;
                const value = settings[config.key as keyof SimulatorSettings];
                const monthlyCost = config.key === "restaurantMealsPerMonth" || 
                                    config.key === "shoppingTripsPerMonth" || 
                                    config.key === "subscriptionCount" ||
                                    config.key === "nightsOutPerMonth" ||
                                    config.key === "wellnessVisitsPerMonth"
                  ? value * costPerUnit[config.key as keyof typeof costPerUnit]
                  : value * costPerUnit[config.key as keyof typeof costPerUnit] * 4.33;

                return (
                  <div key={config.key} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center`}>
                          <IconComponent className={`w-4 h-4 ${config.color}`} />
                        </div>
                        <div>
                          <p className="font-medium">{config.label}</p>
                          <p className="text-xs text-muted-foreground">{config.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">{value}</p>
                        <p className="text-sm text-muted-foreground">~${Math.round(monthlyCost)}/mo</p>
                      </div>
                    </div>
                    <Slider
                      value={[value]}
                      onValueChange={(v) => handleSliderChange(config.key as keyof SimulatorSettings, v)}
                      max={config.max}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0</span>
                      <span>{config.max}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Monthly Total</h2>
              <div className="text-center space-y-2">
                <p className="text-4xl font-bold">~${currentTotal.toLocaleString()}</p>
                <div className="flex items-center justify-center gap-2">
                  {difference !== 0 && (
                    <Badge
                      variant={difference > 0 ? "destructive" : "default"}
                      className={`gap-1 ${difference <= 0 ? "bg-green-500 hover:bg-green-600" : ""}`}
                    >
                      {difference > 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {difference > 0 ? "+" : ""}{percentChange}%
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {difference > 0
                    ? `$${difference} more than baseline`
                    : difference < 0
                    ? `$${Math.abs(difference)} less than baseline`
                    : "Same as baseline"}
                </p>
              </div>

              <div className="pt-4 border-t space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Baseline</span>
                  <span className="font-medium">~${baselineAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current</span>
                  <span className="font-medium">~${currentTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold pt-2 border-t">
                  <span>Difference</span>
                  <span className={difference > 0 ? "text-destructive" : difference < 0 ? "text-green-500" : ""}>
                    {difference > 0 ? "+" : ""}{difference === 0 ? "$0" : `$${difference.toLocaleString()}`}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Comparison</h2>
              <div className="h-48">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <BarChart data={comparisonData} layout="vertical" margin={{ left: 10, right: 30 }}>
                    <XAxis type="number" tickFormatter={(v) => `$${v}`} />
                    <YAxis dataKey="label" type="category" width={70} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="amount" radius={4}>
                      {comparisonData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Category Breakdown</h2>
              <div className="h-64">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="amount"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) => `${name.split(" ")[0]} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </div>
              <div className="space-y-2">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: cat.fill }} />
                      <span>{cat.name}</span>
                    </div>
                    <span className="font-medium">~${cat.amount}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Scenarios</h2>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => setSettings({ ...settings, coffeesPerWeek: 0, deliveriesPerWeek: 0 })}
            >
              Cut Coffees & Delivery
            </Button>
            <Button
              variant="outline"
              onClick={() => setSettings({ ...settings, rideshareTripsPerWeek: 0 })}
            >
              No Rideshare
            </Button>
            <Button
              variant="outline"
              onClick={() => setSettings({ ...settings, subscriptionCount: 2 })}
            >
              Minimize Subscriptions
            </Button>
            <Button
              variant="outline"
              onClick={() => setSettings({
                coffeesPerWeek: 2,
                deliveriesPerWeek: 1,
                restaurantMealsPerMonth: 2,
                rideshareTripsPerWeek: 1,
                shoppingTripsPerMonth: 1,
                subscriptionCount: 2,
                nightsOutPerMonth: 1,
                wellnessVisitsPerMonth: 1,
              })}
            >
              Frugal Mode
            </Button>
            <Button
              variant="outline"
              onClick={() => setSettings({
                coffeesPerWeek: 10,
                deliveriesPerWeek: 4,
                restaurantMealsPerMonth: 8,
                rideshareTripsPerWeek: 5,
                shoppingTripsPerMonth: 5,
                subscriptionCount: 8,
                nightsOutPerMonth: 4,
                wellnessVisitsPerMonth: 4,
              })}
            >
              Lifestyle Upgrade
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
