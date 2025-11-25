import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, TrendingUp, TrendingDown, Minus } from "lucide-react";

//todo: remove mock functionality
const cityData = [
  { name: "Calgary", country: "Canada", multiplier: 1.0, lat: 51.0447, lng: -114.0719 },
  { name: "Toronto", country: "Canada", multiplier: 1.15, lat: 43.6532, lng: -79.3832 },
  { name: "Vancouver", country: "Canada", multiplier: 1.22, lat: 49.2827, lng: -123.1207 },
  { name: "New York", country: "USA", multiplier: 1.68, lat: 40.7128, lng: -74.0060 },
  { name: "San Francisco", country: "USA", multiplier: 1.82, lat: 37.7749, lng: -122.4194 },
  { name: "Los Angeles", country: "USA", multiplier: 1.45, lat: 34.0522, lng: -118.2437 },
  { name: "London", country: "UK", multiplier: 1.71, lat: 51.5074, lng: -0.1278 },
  { name: "Paris", country: "France", multiplier: 1.58, lat: 48.8566, lng: 2.3522 },
  { name: "Berlin", country: "Germany", multiplier: 1.28, lat: 52.5200, lng: 13.4050 },
  { name: "Tokyo", country: "Japan", multiplier: 1.52, lat: 35.6762, lng: 139.6503 },
  { name: "Singapore", country: "Singapore", multiplier: 1.63, lat: 1.3521, lng: 103.8198 },
  { name: "Sydney", country: "Australia", multiplier: 1.48, lat: -33.8688, lng: 151.2093 },
  { name: "Mexico City", country: "Mexico", multiplier: 0.72, lat: 19.4326, lng: -99.1332 },
  { name: "São Paulo", country: "Brazil", multiplier: 0.68, lat: -23.5505, lng: -46.6333 },
  { name: "Dubai", country: "UAE", multiplier: 1.35, lat: 25.2048, lng: 55.2708 },
];

interface GlobalMapProps {
  baseAmount: number;
  baseCity: string;
}

export default function GlobalMap({ baseAmount, baseCity }: GlobalMapProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const getTrendIcon = (multiplier: number) => {
    if (multiplier > 1.05) return <TrendingUp className="w-4 h-4 text-destructive" />;
    if (multiplier < 0.95) return <TrendingDown className="w-4 h-4 text-chart-2" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  const getDifference = (multiplier: number) => {
    const diff = ((multiplier - 1) * 100);
    const diffStr = diff.toFixed(0);
    return diff > 0 ? `+${diffStr}%` : `${diffStr}%`;
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Globe className="w-5 h-5 text-primary" />
        <h3 className="text-2xl font-semibold">Global Cost Comparison</h3>
      </div>

      <p className="text-muted-foreground">
        See how your lifestyle would cost in major cities around the world, adjusted for local cost of living.
      </p>

      {/* Map Placeholder - Visual representation */}
      <div className="relative h-96 bg-gradient-to-br from-primary/5 to-chart-2/5 rounded-lg border overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2 p-6">
            <Globe className="w-16 h-16 text-primary/40 mx-auto" />
            <p className="text-sm text-muted-foreground">Interactive world map visualization</p>
            <p className="text-xs text-muted-foreground">Click cities below to see detailed comparisons</p>
          </div>
        </div>
        
        {/* Decorative dots for cities */}
        {cityData.slice(0, 8).map((city, i) => (
          <div
            key={city.name}
            className="absolute w-3 h-3 rounded-full bg-primary cursor-pointer hover-elevate"
            style={{
              left: `${15 + (i * 10)}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            onClick={() => setSelectedCity(city.name)}
            data-testid={`map-pin-${city.name.toLowerCase()}`}
          />
        ))}
      </div>

      {/* City List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {cityData.map((city) => {
          const adjustedCost = Math.round(baseAmount * city.multiplier);
          const isBase = city.name === baseCity;
          const isSelected = selectedCity === city.name;

          return (
            <div
              key={city.name}
              onClick={() => setSelectedCity(city.name)}
              className={`p-4 rounded-lg border cursor-pointer hover-elevate transition-all ${
                isSelected ? "ring-2 ring-primary bg-primary/5" : ""
              } ${isBase ? "border-primary bg-primary/5" : ""}`}
              data-testid={`city-card-${city.name.toLowerCase()}`}
            >
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold truncate">{city.name}</h4>
                    {isBase && <Badge variant="secondary" className="text-xs">Base</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{city.country}</p>
                </div>
                
                <div className="text-right shrink-0">
                  <p className="font-bold text-lg">${adjustedCost.toLocaleString()}</p>
                  <div className="flex items-center gap-1 justify-end text-xs">
                    {getTrendIcon(city.multiplier)}
                    <span className={city.multiplier > 1 ? "text-destructive" : city.multiplier < 1 ? "text-chart-2" : "text-muted-foreground"}>
                      {getDifference(city.multiplier)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedCity && (
        <Card className="p-4 bg-muted/50 border-primary/20">
          <p className="text-sm">
            <span className="font-semibold">{selectedCity}:</span> Your lifestyle would cost{" "}
            <span className="font-bold text-primary">
              ${Math.round(baseAmount * (cityData.find(c => c.name === selectedCity)?.multiplier || 1)).toLocaleString()}/month
            </span>
            {" "}based on local cost of living adjustments.
          </p>
        </Card>
      )}
    </Card>
  );
}
