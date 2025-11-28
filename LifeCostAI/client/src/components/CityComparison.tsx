import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Globe,
  MapPin,
  Home as HomeIcon,
  Car,
  Utensils,
  Dumbbell,
  ShoppingBag,
  Tv,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Building2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

interface CityData {
  name: string;
  country: string;
  multiplier: number;
  lat: number;
  lng: number;
  categoryMultipliers: {
    foodDining: number;
    transportation: number;
    fitness: number;
    subscriptions: number;
    shopping: number;
  };
  rentEstimate: {
    studio: number;
    oneBed: number;
    twoBed: number;
  };
  transportCosts: {
    monthlyPass: number;
    gasPerLiter: number;
    rideshareBase: number;
  };
  highlights: string[];
}

const cityData: CityData[] = [
  {
    name: "Calgary",
    country: "Canada",
    multiplier: 1.0,
    lat: 51.0447,
    lng: -114.0719,
    categoryMultipliers: {
      foodDining: 1.0,
      transportation: 1.0,
      fitness: 1.0,
      subscriptions: 1.0,
      shopping: 1.0,
    },
    rentEstimate: { studio: 1200, oneBed: 1450, twoBed: 1800 },
    transportCosts: { monthlyPass: 112, gasPerLiter: 1.45, rideshareBase: 8 },
    highlights: ["No provincial sales tax", "Lower rent than major cities", "Car-friendly infrastructure"],
  },
  {
    name: "Toronto",
    country: "Canada",
    multiplier: 1.15,
    lat: 43.6532,
    lng: -79.3832,
    categoryMultipliers: {
      foodDining: 1.12,
      transportation: 1.25,
      fitness: 1.15,
      subscriptions: 1.0,
      shopping: 1.18,
    },
    rentEstimate: { studio: 1850, oneBed: 2300, twoBed: 2900 },
    transportCosts: { monthlyPass: 156, gasPerLiter: 1.55, rideshareBase: 10 },
    highlights: ["Excellent public transit", "Vibrant food scene", "High entertainment options"],
  },
  {
    name: "Vancouver",
    country: "Canada",
    multiplier: 1.22,
    lat: 49.2827,
    lng: -123.1207,
    categoryMultipliers: {
      foodDining: 1.18,
      transportation: 1.15,
      fitness: 1.25,
      subscriptions: 1.0,
      shopping: 1.20,
    },
    rentEstimate: { studio: 2000, oneBed: 2500, twoBed: 3200 },
    transportCosts: { monthlyPass: 102, gasPerLiter: 1.85, rideshareBase: 9 },
    highlights: ["Walkable neighborhoods", "Outdoor lifestyle", "Premium wellness options"],
  },
  {
    name: "New York",
    country: "USA",
    multiplier: 1.68,
    lat: 40.7128,
    lng: -74.0060,
    categoryMultipliers: {
      foodDining: 1.55,
      transportation: 1.40,
      fitness: 1.85,
      subscriptions: 1.0,
      shopping: 1.75,
    },
    rentEstimate: { studio: 2800, oneBed: 3500, twoBed: 4500 },
    transportCosts: { monthlyPass: 132, gasPerLiter: 1.10, rideshareBase: 12 },
    highlights: ["World-class dining", "No car needed", "Premium everything"],
  },
  {
    name: "San Francisco",
    country: "USA",
    multiplier: 1.82,
    lat: 37.7749,
    lng: -122.4194,
    categoryMultipliers: {
      foodDining: 1.65,
      transportation: 1.50,
      fitness: 1.90,
      subscriptions: 1.0,
      shopping: 1.80,
    },
    rentEstimate: { studio: 2600, oneBed: 3300, twoBed: 4200 },
    transportCosts: { monthlyPass: 98, gasPerLiter: 1.35, rideshareBase: 14 },
    highlights: ["Tech hub pricing", "Health-conscious culture", "Premium organic options"],
  },
  {
    name: "Los Angeles",
    country: "USA",
    multiplier: 1.45,
    lat: 34.0522,
    lng: -118.2437,
    categoryMultipliers: {
      foodDining: 1.35,
      transportation: 1.60,
      fitness: 1.50,
      subscriptions: 1.0,
      shopping: 1.45,
    },
    rentEstimate: { studio: 1900, oneBed: 2400, twoBed: 3100 },
    transportCosts: { monthlyPass: 100, gasPerLiter: 1.40, rideshareBase: 11 },
    highlights: ["Car essential", "Fitness culture", "Entertainment industry pricing"],
  },
  {
    name: "London",
    country: "UK",
    multiplier: 1.71,
    lat: 51.5074,
    lng: -0.1278,
    categoryMultipliers: {
      foodDining: 1.50,
      transportation: 1.85,
      fitness: 1.60,
      subscriptions: 1.10,
      shopping: 1.70,
    },
    rentEstimate: { studio: 2200, oneBed: 2800, twoBed: 3600 },
    transportCosts: { monthlyPass: 180, gasPerLiter: 1.90, rideshareBase: 10 },
    highlights: ["Extensive tube network", "High transport costs", "Pub culture"],
  },
  {
    name: "Paris",
    country: "France",
    multiplier: 1.58,
    lat: 48.8566,
    lng: 2.3522,
    categoryMultipliers: {
      foodDining: 1.45,
      transportation: 1.35,
      fitness: 1.55,
      subscriptions: 1.15,
      shopping: 1.65,
    },
    rentEstimate: { studio: 1400, oneBed: 1800, twoBed: 2400 },
    transportCosts: { monthlyPass: 85, gasPerLiter: 2.00, rideshareBase: 8 },
    highlights: ["Affordable metro", "Café culture", "Fashion capital pricing"],
  },
  {
    name: "Berlin",
    country: "Germany",
    multiplier: 1.28,
    lat: 52.5200,
    lng: 13.4050,
    categoryMultipliers: {
      foodDining: 1.15,
      transportation: 1.20,
      fitness: 1.25,
      subscriptions: 1.05,
      shopping: 1.30,
    },
    rentEstimate: { studio: 1100, oneBed: 1400, twoBed: 1800 },
    transportCosts: { monthlyPass: 86, gasPerLiter: 1.85, rideshareBase: 7 },
    highlights: ["Affordable for Europe", "Great public transit", "Cultural scene"],
  },
  {
    name: "Tokyo",
    country: "Japan",
    multiplier: 1.52,
    lat: 35.6762,
    lng: 139.6503,
    categoryMultipliers: {
      foodDining: 1.30,
      transportation: 1.45,
      fitness: 1.70,
      subscriptions: 1.20,
      shopping: 1.55,
    },
    rentEstimate: { studio: 1200, oneBed: 1600, twoBed: 2200 },
    transportCosts: { monthlyPass: 120, gasPerLiter: 1.60, rideshareBase: 15 },
    highlights: ["Efficient trains", "Quality dining affordable", "Compact living"],
  },
  {
    name: "Singapore",
    country: "Singapore",
    multiplier: 1.63,
    lat: 1.3521,
    lng: 103.8198,
    categoryMultipliers: {
      foodDining: 1.25,
      transportation: 1.80,
      fitness: 1.75,
      subscriptions: 1.10,
      shopping: 1.60,
    },
    rentEstimate: { studio: 2000, oneBed: 2600, twoBed: 3400 },
    transportCosts: { monthlyPass: 128, gasPerLiter: 2.20, rideshareBase: 8 },
    highlights: ["Hawker centers affordable", "Cars extremely expensive", "Premium malls"],
  },
  {
    name: "Sydney",
    country: "Australia",
    multiplier: 1.48,
    lat: -33.8688,
    lng: 151.2093,
    categoryMultipliers: {
      foodDining: 1.40,
      transportation: 1.55,
      fitness: 1.45,
      subscriptions: 1.05,
      shopping: 1.50,
    },
    rentEstimate: { studio: 1800, oneBed: 2300, twoBed: 3000 },
    transportCosts: { monthlyPass: 150, gasPerLiter: 1.80, rideshareBase: 10 },
    highlights: ["Outdoor lifestyle", "Beach culture", "High minimum wage"],
  },
  {
    name: "Mexico City",
    country: "Mexico",
    multiplier: 0.72,
    lat: 19.4326,
    lng: -99.1332,
    categoryMultipliers: {
      foodDining: 0.55,
      transportation: 0.65,
      fitness: 0.70,
      subscriptions: 0.90,
      shopping: 0.75,
    },
    rentEstimate: { studio: 600, oneBed: 850, twoBed: 1200 },
    transportCosts: { monthlyPass: 18, gasPerLiter: 1.20, rideshareBase: 3 },
    highlights: ["Very affordable", "Amazing street food", "Growing expat scene"],
  },
  {
    name: "São Paulo",
    country: "Brazil",
    multiplier: 0.68,
    lat: -23.5505,
    lng: -46.6333,
    categoryMultipliers: {
      foodDining: 0.50,
      transportation: 0.60,
      fitness: 0.65,
      subscriptions: 0.85,
      shopping: 0.70,
    },
    rentEstimate: { studio: 550, oneBed: 750, twoBed: 1100 },
    transportCosts: { monthlyPass: 45, gasPerLiter: 1.30, rideshareBase: 4 },
    highlights: ["Low cost of living", "Vibrant nightlife", "Large expat community"],
  },
  {
    name: "Dubai",
    country: "UAE",
    multiplier: 1.35,
    lat: 25.2048,
    lng: 55.2708,
    categoryMultipliers: {
      foodDining: 1.25,
      transportation: 1.15,
      fitness: 1.50,
      subscriptions: 1.0,
      shopping: 1.45,
    },
    rentEstimate: { studio: 1400, oneBed: 1900, twoBed: 2600 },
    transportCosts: { monthlyPass: 95, gasPerLiter: 0.75, rideshareBase: 6 },
    highlights: ["No income tax", "Cheap fuel", "Luxury lifestyle options"],
  },
  {
    name: "Bogota",
    country: "Colombia",
    multiplier: 0.68,
    lat: 4.7110,
    lng: -74.0721,
    categoryMultipliers: {
      foodDining: 0.52,
      transportation: 0.62,
      fitness: 0.68,
      subscriptions: 0.85,
      shopping: 0.72,
    },
    rentEstimate: { studio: 400, oneBed: 600, twoBed: 900 },
    transportCosts: { monthlyPass: 35, gasPerLiter: 1.10, rideshareBase: 2.50 },
    highlights: ["Very affordable", "Emerging startup scene", "Mountain views", "Growing café culture"],
  },
  {
    name: "Amsterdam",
    country: "Netherlands",
    multiplier: 1.48,
    lat: 52.3676,
    lng: 4.9041,
    categoryMultipliers: {
      foodDining: 1.35,
      transportation: 1.20,
      fitness: 1.55,
      subscriptions: 1.10,
      shopping: 1.50,
    },
    rentEstimate: { studio: 1600, oneBed: 2100, twoBed: 2800 },
    transportCosts: { monthlyPass: 105, gasPerLiter: 2.15, rideshareBase: 8 },
    highlights: ["Bike-friendly culture", "Excellent transit", "Designer shops", "Quality of life"],
  },
  {
    name: "Bangkok",
    country: "Thailand",
    multiplier: 0.52,
    lat: 13.7563,
    lng: 100.5018,
    categoryMultipliers: {
      foodDining: 0.35,
      transportation: 0.50,
      fitness: 0.55,
      subscriptions: 0.80,
      shopping: 0.60,
    },
    rentEstimate: { studio: 350, oneBed: 500, twoBed: 750 },
    transportCosts: { monthlyPass: 25, gasPerLiter: 1.25, rideshareBase: 1.50 },
    highlights: ["Street food paradise", "Affordable housing", "BTS Skytrain", "Digital nomad hub"],
  },
];

const categoryInfo = [
  { key: "foodDining", name: "Food & Dining", icon: Utensils, color: "hsl(var(--chart-1))" },
  { key: "transportation", name: "Transportation", icon: Car, color: "hsl(var(--chart-2))" },
  { key: "subscriptions", name: "Subscriptions", icon: Tv, color: "hsl(var(--chart-3))" },
  { key: "fitness", name: "Health & Wellness", icon: Dumbbell, color: "hsl(var(--chart-4))" },
  { key: "shopping", name: "Shopping", icon: ShoppingBag, color: "hsl(var(--chart-5))" },
];

interface CityComparisonProps {
  onBack: () => void;
  baselineCategories?: Array<{ name: string; amount: number }>;
  baseCity?: string;
}

export default function CityComparison({ onBack, baselineCategories, baseCity = "Calgary" }: CityComparisonProps) {
  const [selectedCities, setSelectedCities] = useState<string[]>([baseCity, "Toronto"]);
  const [activeTab, setActiveTab] = useState("overview");

  const defaultCategories = [
    { name: "Food & Dining", amount: 350 },
    { name: "Transportation", amount: 200 },
    { name: "Subscriptions", amount: 75 },
    { name: "Health & Wellness", amount: 120 },
    { name: "Shopping", amount: 150 },
  ];

  const categories = baselineCategories && baselineCategories.length > 0 ? baselineCategories : defaultCategories;
  const totalBaseline = categories.reduce((sum, c) => sum + c.amount, 0);

  const toggleCity = (cityName: string) => {
    if (selectedCities.includes(cityName)) {
      if (selectedCities.length > 1) {
        setSelectedCities(selectedCities.filter((c) => c !== cityName));
      }
    } else {
      if (selectedCities.length < 4) {
        setSelectedCities([...selectedCities, cityName]);
      }
    }
  };

  const selectedCityData = useMemo(() => {
    return selectedCities.map((name) => cityData.find((c) => c.name === name)!).filter(Boolean);
  }, [selectedCities]);

  const getCategoryAmount = (cityMultipliers: CityData["categoryMultipliers"], categoryName: string) => {
    const baseAmount = categories.find((c) => c.name === categoryName)?.amount || 0;
    const keyMap: Record<string, keyof CityData["categoryMultipliers"]> = {
      "Food & Dining": "foodDining",
      "Transportation": "transportation",
      "Subscriptions": "subscriptions",
      "Health & Wellness": "fitness",
      "Shopping": "shopping",
    };
    const multiplier = cityMultipliers[keyMap[categoryName]] || 1;
    return Math.round(baseAmount * multiplier);
  };

  const getCityTotal = (city: CityData) => {
    return categories.reduce((sum, cat) => sum + getCategoryAmount(city.categoryMultipliers, cat.name), 0);
  };

  const comparisonBarData = useMemo(() => {
    return categoryInfo.map((cat) => {
      const result: Record<string, any> = { category: cat.name.split(" ")[0] };
      selectedCityData.forEach((city) => {
        result[city.name] = getCategoryAmount(city.categoryMultipliers, cat.name);
      });
      return result;
    });
  }, [selectedCityData, categories]);

  const radarData = useMemo(() => {
    return categoryInfo.map((cat) => {
      const result: Record<string, any> = { category: cat.name.split(" ")[0] };
      selectedCityData.forEach((city) => {
        const keyMap: Record<string, keyof CityData["categoryMultipliers"]> = {
          "Food & Dining": "foodDining",
          "Transportation": "transportation",
          "Subscriptions": "subscriptions",
          "Health & Wellness": "fitness",
          "Shopping": "shopping",
        };
        result[city.name] = Math.round(city.categoryMultipliers[keyMap[cat.name]] * 100);
      });
      return result;
    });
  }, [selectedCityData]);

  const chartColors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

  const getDiffBadge = (multiplier: number) => {
    const diff = ((multiplier - 1) * 100).toFixed(0);
    if (multiplier > 1.05) {
      return (
        <Badge variant="destructive" className="gap-1">
          <TrendingUp className="w-3 h-3" />+{diff}%
        </Badge>
      );
    }
    if (multiplier < 0.95) {
      return (
        <Badge className="gap-1 bg-green-500 hover:bg-green-600">
          <TrendingDown className="w-3 h-3" />
          {diff}%
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="gap-1">
        <Minus className="w-3 h-3" />
        Similar
      </Badge>
    );
  };

  return (
    <div className="min-h-screen py-12 px-6 bg-background">
      <div className="max-w-screen-2xl mx-auto space-y-8">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <Globe className="w-10 h-10 text-primary" />
              City Lifestyle Comparison
            </h1>
            <p className="text-muted-foreground mt-2">
              Deep dive into how your lifestyle costs compare across cities
            </p>
          </div>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Select Cities to Compare (up to 4)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {cityData.map((city) => {
              const isSelected = selectedCities.includes(city.name);
              const isBase = city.name === baseCity;
              return (
                <div
                  key={city.name}
                  onClick={() => toggleCity(city.name)}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Checkbox checked={isSelected} className="pointer-events-none" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate flex items-center gap-1">
                      {city.name}
                      {isBase && (
                        <Badge variant="secondary" className="text-xs ml-1">
                          Base
                        </Badge>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">{city.country}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="categories" className="gap-2">
              <Utensils className="w-4 h-4" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="housing" className="gap-2">
              <HomeIcon className="w-4 h-4" />
              Housing
            </TabsTrigger>
            <TabsTrigger value="transport" className="gap-2">
              <Car className="w-4 h-4" />
              Transport
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedCityData.map((city, index) => {
                const cityTotal = getCityTotal(city);
                const isBase = city.name === baseCity;
                return (
                  <Card
                    key={city.name}
                    className={`p-6 space-y-4 ${isBase ? "border-primary bg-primary/5" : ""}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <MapPin
                            className="w-5 h-5"
                            style={{ color: chartColors[index] }}
                          />
                          <h3 className="font-bold text-lg">{city.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{city.country}</p>
                      </div>
                      {isBase ? (
                        <Badge>Your Base</Badge>
                      ) : (
                        getDiffBadge(city.multiplier)
                      )}
                    </div>
                    <div className="space-y-2">
                      <p className="text-3xl font-bold">~${cityTotal.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">/month lifestyle cost</p>
                    </div>
                    <div className="pt-3 border-t space-y-1">
                      {city.highlights.slice(0, 2).map((h, i) => (
                        <p key={i} className="text-xs text-muted-foreground">
                          • {h}
                        </p>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Cost Index Comparison</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={30} domain={[0, 200]} />
                    {selectedCityData.map((city, index) => (
                      <Radar
                        key={city.name}
                        name={city.name}
                        dataKey={city.name}
                        stroke={chartColors[index]}
                        fill={chartColors[index]}
                        fillOpacity={0.2}
                      />
                    ))}
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground text-center mt-4">
                100 = baseline cost index. Higher values indicate more expensive categories.
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Category-by-Category Breakdown</h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonBarData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(v) => `$${v}`} />
                    <YAxis dataKey="category" type="category" width={100} />
                    <Tooltip formatter={(value: number) => `$${value}`} />
                    <Legend />
                    {selectedCityData.map((city, index) => (
                      <Bar
                        key={city.name}
                        dataKey={city.name}
                        fill={chartColors[index]}
                        radius={[0, 4, 4, 0]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {categoryInfo.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Card key={cat.key} className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${cat.color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: cat.color }} />
                      </div>
                      <h4 className="font-semibold text-lg">{cat.name}</h4>
                    </div>
                    <div className="space-y-3">
                      {selectedCityData.map((city, index) => {
                        const amount = getCategoryAmount(city.categoryMultipliers, cat.name);
                        const baseAmount = categories.find((c) => c.name === cat.name)?.amount || 0;
                        const keyMap: Record<string, keyof CityData["categoryMultipliers"]> = {
                          "Food & Dining": "foodDining",
                          "Transportation": "transportation",
                          "Subscriptions": "subscriptions",
                          "Fitness & Wellness": "fitness",
                          "Shopping": "shopping",
                        };
                        const multiplier = city.categoryMultipliers[keyMap[cat.name]];
                        const maxAmount = Math.max(
                          ...selectedCityData.map((c) => getCategoryAmount(c.categoryMultipliers, cat.name))
                        );
                        return (
                          <div key={city.name} className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                              <span className="font-medium">{city.name}</span>
                              <div className="flex items-center gap-2">
                                <span className="font-bold">~${amount}</span>
                                {city.name !== baseCity && getDiffBadge(multiplier)}
                              </div>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all"
                                style={{
                                  width: `${(amount / maxAmount) * 100}%`,
                                  backgroundColor: chartColors[index],
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="housing" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Monthly Rent Estimates</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Average monthly rent for different apartment sizes in city centers
              </p>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">City</th>
                      <th className="text-right py-3 px-4 font-semibold">Studio</th>
                      <th className="text-right py-3 px-4 font-semibold">1 Bedroom</th>
                      <th className="text-right py-3 px-4 font-semibold">2 Bedroom</th>
                      <th className="text-right py-3 px-4 font-semibold">vs Base</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCityData.map((city, index) => {
                      const baseRent = cityData.find((c) => c.name === baseCity)?.rentEstimate.oneBed || 1450;
                      const diff = ((city.rentEstimate.oneBed - baseRent) / baseRent) * 100;
                      return (
                        <tr key={city.name} className="border-b hover:bg-muted/50">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: chartColors[index] }}
                              />
                              <span className="font-medium">{city.name}</span>
                              {city.name === baseCity && (
                                <Badge variant="secondary" className="text-xs">
                                  Base
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right font-semibold">
                            ${city.rentEstimate.studio.toLocaleString()}
                          </td>
                          <td className="py-4 px-4 text-right font-semibold">
                            ${city.rentEstimate.oneBed.toLocaleString()}
                          </td>
                          <td className="py-4 px-4 text-right font-semibold">
                            ${city.rentEstimate.twoBed.toLocaleString()}
                          </td>
                          <td className="py-4 px-4 text-right">
                            {city.name === baseCity ? (
                              <span className="text-muted-foreground">—</span>
                            ) : (
                              <span
                                className={`font-semibold ${
                                  diff > 0 ? "text-destructive" : "text-green-600"
                                }`}
                              >
                                {diff > 0 ? "+" : ""}
                                {diff.toFixed(0)}%
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedCityData.slice(0, 3).map((city, index) => (
                  <Card key={city.name} className="p-4 bg-muted/50">
                    <h4 className="font-semibold mb-2" style={{ color: chartColors[index] }}>
                      {city.name} Housing Tips
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {city.highlights.map((h, i) => (
                        <li key={i}>• {h}</li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="transport" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Car className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Transportation Cost Breakdown</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card className="p-4 bg-muted/50">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Badge variant="outline">Public Transit</Badge>
                    Monthly Pass
                  </h4>
                  <div className="space-y-3">
                    {selectedCityData.map((city, index) => (
                      <div key={city.name} className="flex justify-between items-center">
                        <span className="text-sm font-medium">{city.name}</span>
                        <span className="font-bold" style={{ color: chartColors[index] }}>
                          ${city.transportCosts.monthlyPass}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-4 bg-muted/50">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Badge variant="outline">Driving</Badge>
                    Gas per Liter
                  </h4>
                  <div className="space-y-3">
                    {selectedCityData.map((city, index) => (
                      <div key={city.name} className="flex justify-between items-center">
                        <span className="text-sm font-medium">{city.name}</span>
                        <span className="font-bold" style={{ color: chartColors[index] }}>
                          ${city.transportCosts.gasPerLiter.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-4 bg-muted/50">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Badge variant="outline">Rideshare</Badge>
                    Base Fare
                  </h4>
                  <div className="space-y-3">
                    {selectedCityData.map((city, index) => (
                      <div key={city.name} className="flex justify-between items-center">
                        <span className="text-sm font-medium">{city.name}</span>
                        <span className="font-bold" style={{ color: chartColors[index] }}>
                          ${city.transportCosts.rideshareBase}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Transportation Category Multipliers</h4>
                <p className="text-sm text-muted-foreground">
                  How your transportation spending would scale in each city based on local costs
                </p>
                <div className="space-y-3">
                  {selectedCityData.map((city, index) => {
                    const transportAmount = getCategoryAmount(city.categoryMultipliers, "Transportation");
                    const maxAmount = Math.max(
                      ...selectedCityData.map((c) => getCategoryAmount(c.categoryMultipliers, "Transportation"))
                    );
                    return (
                      <div key={city.name} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{city.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="font-bold">~${transportAmount}/month</span>
                            {city.name !== baseCity &&
                              getDiffBadge(city.categoryMultipliers.transportation)}
                          </div>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${(transportAmount / maxAmount) * 100}%`,
                              backgroundColor: chartColors[index],
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
              <Globe className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Your Lifestyle, Any City</h3>
              <p className="text-muted-foreground">
                These estimates are based on your current spending patterns adjusted for local cost-of-living
                differences. Actual costs may vary based on specific neighborhoods and personal choices.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
