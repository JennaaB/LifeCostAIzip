import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, TrendingUp, TrendingDown, Minus, Plus, ArrowRight } from "lucide-react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

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
  { name: "Bogota", country: "Colombia", multiplier: 0.68, lat: 4.7110, lng: -74.0721 },
  { name: "Amsterdam", country: "Netherlands", multiplier: 1.48, lat: 52.3676, lng: 4.9041 },
  { name: "Bangkok", country: "Thailand", multiplier: 0.52, lat: 13.7563, lng: 100.5018 },
  { name: "Cairo", country: "Egypt", multiplier: 0.45, lat: 30.0444, lng: 31.2357 },
  { name: "Johannesburg", country: "South Africa", multiplier: 0.65, lat: -26.2023, lng: 28.0436 },
  { name: "Moscow", country: "Russia", multiplier: 1.12, lat: 55.7558, lng: 37.6173 },
  { name: "Santiago", country: "Chile", multiplier: 0.85, lat: -33.4489, lng: -70.6693 },
  { name: "Lima", country: "Peru", multiplier: 0.72, lat: -12.0464, lng: -77.0428 },
  { name: "Casablanca", country: "Morocco", multiplier: 0.58, lat: 33.5731, lng: -7.5898 },
  { name: "Monaco", country: "Monaco", multiplier: 2.15, lat: 43.7384, lng: 7.4246 },
];

interface GlobalMapProps {
  baseAmount: number;
  baseCity: string;
  onDeepDive?: () => void;
}

export default function GlobalMap({ baseAmount, baseCity, onDeepDive }: GlobalMapProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 1));
  };

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

  const getMarkerColor = (multiplier: number) => {
    if (multiplier > 1.5) return "#ef4444";
    if (multiplier > 1.2) return "#f97316";
    if (multiplier > 0.95) return "#3b82f6";
    return "#22c55e";
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

      <div className="relative h-96 bg-gradient-to-br from-primary/5 to-chart-2/5 rounded-lg border overflow-hidden">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 120,
            center: [0, 30],
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <ZoomableGroup zoom={zoom}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#e2e8f0"
                    stroke="#cbd5e1"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#cbd5e1", outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>
            {cityData.map((city) => {
              const isSelected = selectedCity === city.name;
              const isBase = city.name === baseCity;
              return (
                <Marker
                  key={city.name}
                  coordinates={[city.lng, city.lat]}
                  onClick={() => setSelectedCity(city.name)}
                >
                  <circle
                    r={isSelected || isBase ? 8 : 6}
                    fill={getMarkerColor(city.multiplier)}
                    stroke="#fff"
                    strokeWidth={2}
                    style={{ cursor: "pointer" }}
                    className="transition-all duration-200 hover:opacity-80"
                  />
                  {(isSelected || isBase) && (
                    <>
                      <text
                        textAnchor="middle"
                        y={-22}
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 10,
                          fontWeight: 600,
                          fill: "#1e293b",
                        }}
                      >
                        {city.name}
                      </text>
                      {isSelected && (
                        <text
                          textAnchor="middle"
                          y={-12}
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: 9,
                            fontWeight: 500,
                            fill: "#64748b",
                            pointerEvents: "none",
                          }}
                        >
                          (~${Math.round(baseAmount * city.multiplier)})
                        </text>
                      )}
                    </>
                  )}
                </Marker>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>
        
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-10 w-10 p-0 bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm"
            onClick={handleZoomIn}
            title="Zoom in"
          >
            <Plus className="w-5 h-5" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-10 w-10 p-0 bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm"
            onClick={handleZoomOut}
            title="Zoom out"
          >
            <Minus className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-md p-2 text-xs space-y-1 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span>Lower cost (&lt;-5%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span>Similar cost</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500"></span>
            <span>Higher cost (+20%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span>Much higher (&gt;+50%)</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {(() => {
          // Get base city multiplier
          const baseCityData = cityData.find(c => c.name === baseCity);
          const baseMultiplier = baseCityData?.multiplier || 1;
          
          // Get most expensive city (excluding base)
          const mostExpensive = cityData.reduce((max, city) => 
            city.name !== baseCity && city.multiplier > max.multiplier ? city : max,
            { multiplier: -Infinity }
          );
          
          // Get most similar price city (closest to base multiplier, excluding base)
          const mostSimilar = cityData.reduce((closest, city) => {
            if (city.name === baseCity) return closest;
            const diff = Math.abs(city.multiplier - baseMultiplier);
            const closestDiff = Math.abs(closest.multiplier - baseMultiplier);
            return diff < closestDiff ? city : closest;
          }, { multiplier: Infinity });
          
          // Get least expensive city
          const leastExpensive = cityData.reduce((min, city) =>
            city.multiplier < min.multiplier ? city : min,
            { multiplier: Infinity }
          );
          
          // Build the cities to display in order
          const citiesToDisplay = [
            baseCityData,
            mostSimilar.multiplier !== Infinity ? mostSimilar : null,
            mostExpensive.multiplier !== -Infinity ? mostExpensive : null,
            leastExpensive.multiplier !== Infinity ? leastExpensive : null,
          ].filter(Boolean) as typeof cityData;
          
          return citiesToDisplay.map((city) => {
            const adjustedCost = Math.round(baseAmount * city.multiplier);
            const isBase = city.name === baseCity;
            const isSelected = selectedCity === city.name;

            return (
              <div key={city.name}>
                <div
                  onClick={() => setSelectedCity(city.name)}
                  className={`p-3 rounded-lg border cursor-pointer hover-elevate transition-all ${
                    isSelected ? "ring-2 ring-primary bg-primary/5" : ""
                  } ${isBase ? "border-primary bg-primary/5" : ""}`}
                  data-testid={`city-card-${city.name.toLowerCase()}`}
                >
                  <div className="flex justify-between items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-base truncate">{city.name}</h4>
                        {isBase && <Badge variant="secondary" className="text-sm">Base</Badge>}
                        {"name" in mostExpensive && city.name === mostExpensive.name && <Badge variant="secondary" className="text-sm">Most Expensive</Badge>}
                        {"name" in mostSimilar && city.name === mostSimilar.name && <Badge variant="secondary" className="text-sm">Most Similar</Badge>}
                        {"name" in leastExpensive && city.name === leastExpensive.name && <Badge variant="secondary" className="text-sm">Least Expensive</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{city.country}</p>
                    </div>
                    
                    <div className="text-right shrink-0">
                      <p className="font-bold text-base">${adjustedCost.toLocaleString()}</p>
                      <div className="flex items-center gap-1 justify-end text-xs">
                        {getTrendIcon(city.multiplier)}
                        <span className={city.multiplier > 1 ? "text-destructive" : city.multiplier < 1 ? "text-chart-2" : "text-muted-foreground"}>
                          {getDifference(city.multiplier)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          });
        })()}
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

      {onDeepDive && (
        <Card 
          className="p-6 cursor-pointer hover:shadow-lg transition-all border-2 border-primary/20 hover:border-primary/40 bg-gradient-to-br from-chart-2/5 to-chart-4/5"
          onClick={onDeepDive}
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
              <Globe className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-xl font-bold">City Lifestyle Comparison (Deep Dive)</h4>
              <p className="text-muted-foreground">
                Compare multiple cities side-by-side with detailed category breakdowns, housing costs, and transportation analysis
              </p>
            </div>
            <Button size="lg" className="gap-2 shrink-0 text-base px-6 py-6">
              Explore
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      )}
    </Card>
  );
}
