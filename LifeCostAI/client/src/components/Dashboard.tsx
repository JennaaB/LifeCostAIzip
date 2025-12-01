import { useRef, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  Coffee, 
  Car, 
  Dumbbell, 
  Tv, 
  ShoppingBag,
  Users,
  Edit,
  Download,
  Sparkles,
  Loader2,
  Home,
  SlidersHorizontal,
  UtensilsCrossed,
  Smartphone,
  Heart,
  PartyPopper
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import GlobalMap from "./GlobalMap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import type { FormData } from "./LifestyleForm";
import { calculateEstimates } from "@/lib/estimationEngine";

const categoryIcons: Record<string, any> = {
  "Food & Dining": Coffee,
  "Transportation": Car,
  "Subscriptions": Tv,
  "Fitness & Wellness": Dumbbell,
  "Shopping": ShoppingBag,
  "Social": Users,
  "Coffee & Drinks": Coffee,
  "Dining Out": UtensilsCrossed,
  "Delivery & Takeout": Smartphone,
  "Streaming": Tv,
  "Apps & Services": Smartphone,
  "Gym & Fitness": Dumbbell,
  "Wellness & Self-Care": Heart,
  "Wardrobe & Style": ShoppingBag,
  "Hobbies & Extras": ShoppingBag,
  "Nights Out": PartyPopper,
  "Casual Hangouts": Users,
};

const categoryColors: Record<string, string> = {
  "Food & Dining": "text-chart-1",
  "Transportation": "text-chart-2",
  "Subscriptions": "text-chart-3",
  "Fitness & Wellness": "text-chart-4",
  "Shopping": "text-chart-5",
  "Social": "text-yellow-600",
  "Coffee & Drinks": "text-chart-1",
  "Dining Out": "text-chart-1",
  "Delivery & Takeout": "text-chart-1",
  "Streaming": "text-chart-3",
  "Apps & Services": "text-chart-3",
  "Gym & Fitness": "text-chart-4",
  "Wellness & Self-Care": "text-chart-4",
  "Wardrobe & Style": "text-chart-5",
  "Hobbies & Extras": "text-chart-5",
  "Nights Out": "text-yellow-600",
  "Casual Hangouts": "text-yellow-600",
};

const categoryBgColors: Record<string, string> = {
  "Food & Dining": "bg-chart-1/20",
  "Transportation": "bg-chart-2/20",
  "Subscriptions": "bg-chart-3/20",
  "Fitness & Wellness": "bg-chart-4/20",
  "Shopping": "bg-chart-5/20",
  "Social": "bg-amber-400/20",
  "Coffee & Drinks": "bg-chart-1/20",
  "Dining Out": "bg-chart-1/20",
  "Delivery & Takeout": "bg-chart-1/20",
  "Streaming": "bg-chart-3/20",
  "Apps & Services": "bg-chart-3/20",
  "Gym & Fitness": "bg-chart-4/20",
  "Wellness & Self-Care": "bg-chart-4/20",
  "Wardrobe & Style": "bg-chart-5/20",
  "Hobbies & Extras": "bg-chart-5/20",
  "Nights Out": "bg-amber-400/20",
  "Casual Hangouts": "bg-amber-400/20",
};

const recommendationIcons: Record<string, any> = {
  "Meal Prep Sundays": Target,
  "Make Coffee at Home": Coffee,
  "Consolidate Streaming": Tv,
};

interface DashboardProps {
  onEdit?: () => void;
  onBackToHome?: () => void;
  onSimulator?: () => void;
  onCityComparison?: () => void;
  formData?: FormData | null;
}

export default function Dashboard({ onEdit, onBackToHome, onSimulator, onCityComparison, formData }: DashboardProps) {
  const estimationData = formData ? calculateEstimates(formData) : null;
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  
  useEffect(() => {
    if (formData) {
      fetchAIInsights();
    }
  }, [formData]);
  
  const fetchAIInsights = async () => {
    if (!formData) return;
    
    setIsLoadingInsights(true);
    try {
      const response = await fetch('/api/generate-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const data = await response.json();
        setAiInsights(data);
      }
    } catch (error) {
      console.error('Error fetching AI insights:', error);
    } finally {
      setIsLoadingInsights(false);
    }
  };
  
  const dashboardData = estimationData ? {
    ...estimationData,
    biggestOpportunity: aiInsights?.biggestOpportunity || estimationData.biggestOpportunity,
    categories: estimationData.categories.map(c => ({
      ...c,
      icon: categoryIcons[c.name] || Coffee,
    })),
    topDrivers: estimationData.topDrivers.map(d => ({
      ...d,
      icon: categoryIcons[d.habit.split(":")[0]] || Coffee,
    })),
    recommendations: aiInsights?.recommendations?.map((r: any) => ({
      ...r,
      icon: Target,
    })) || estimationData.recommendations.map(r => ({
      ...r,
      icon: recommendationIcons[r.title] || Target,
    })),
  } : {
    totalMonthly: 3120,
    totalMonthlyMin: 2652,
    totalMonthlyMax: 3588,
    city: "Calgary",
    topCategory: "Food & Dining",
    biggestOpportunity: "Review your spending patterns",
    goalAlignment: 70,
    categories: [
      { name: "Coffee & Drinks", amount: 165, percentage: 5.3, icon: Coffee, color: "bg-chart-1" },
      { name: "Dining Out", amount: 320, percentage: 10.3, icon: UtensilsCrossed, color: "bg-chart-1" },
      { name: "Delivery & Takeout", amount: 300, percentage: 9.6, icon: Smartphone, color: "bg-chart-1" },
      { name: "Transportation", amount: 520, percentage: 16.7, icon: Car, color: "bg-chart-2" },
      { name: "Streaming", amount: 85, percentage: 2.7, icon: Tv, color: "bg-chart-3" },
      { name: "Apps & Services", amount: 300, percentage: 9.6, icon: Smartphone, color: "bg-chart-3" },
      { name: "Gym & Fitness", amount: 180, percentage: 5.8, icon: Dumbbell, color: "bg-chart-4" },
      { name: "Wellness & Self-Care", amount: 160, percentage: 5.1, icon: Heart, color: "bg-chart-4" },
      { name: "Wardrobe & Style", amount: 450, percentage: 14.4, icon: ShoppingBag, color: "bg-chart-5" },
      { name: "Hobbies & Extras", amount: 367, percentage: 11.8, icon: ShoppingBag, color: "bg-chart-5" },
      { name: "Nights Out", amount: 180, percentage: 5.8, icon: PartyPopper, color: "bg-amber-400" },
      { name: "Casual Hangouts", amount: 93, percentage: 3.0, icon: Users, color: "bg-amber-400" },
    ],
    topDrivers: [
      { habit: "Food delivery 2-3x/week", monthlyCost: 320, icon: Coffee },
      { habit: "Daily coffee purchases", monthlyCost: 185, icon: Coffee },
      { habit: "Shopping 2-3x/month", monthlyCost: 450, icon: ShoppingBag },
    ],
    recommendations: [
      {
        title: "Meal Prep Sundays",
        description: "Reduce delivery orders by planning meals ahead",
        savings: 180,
        icon: Target,
      },
      {
        title: "Make Coffee at Home",
        description: "Invest in a good coffee maker for your daily fix",
        savings: 120,
        icon: Coffee,
      },
      {
        title: "Consolidate Streaming",
        description: "Keep 2-3 favorites, rotate the rest seasonally",
        savings: 45,
        icon: Tv,
      },
    ],
  };
  const maxCategory = Math.max(...dashboardData.categories.map(c => c.amount));
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    if (!dashboardRef.current) return;
    
    setIsExporting(true);
    
    try {
      const element = dashboardRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;
      
      const scaledHeight = imgHeight * ratio;
      const pageHeight = pdfHeight - 20;
      let heightLeft = scaledHeight;
      let position = imgY;
      
      pdf.addImage(imgData, "PNG", imgX, position, imgWidth * ratio, scaledHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft > 0) {
        position = heightLeft - scaledHeight + imgY;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", imgX, position, imgWidth * ratio, scaledHeight);
        heightLeft -= pageHeight;
      }
      
      const date = new Date().toISOString().split("T")[0];
      pdf.save(`LifeCostAI-Snapshot-${date}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-6 bg-background">
      <div className="max-w-screen-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold">Your Lifestyle Snapshot</h1>
            <p className="text-muted-foreground mt-2">Based on typical costs in {dashboardData.city}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="lg" onClick={onEdit} data-testid="button-edit-responses" className="text-base">
              <Edit className="w-5 h-5 mr-2" />
              Edit Responses
            </Button>
            <Button variant="outline" size="lg" onClick={onBackToHome} data-testid="button-back-home" className="text-base">
              <Home className="w-5 h-5 mr-2" />
              Home
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleExportPDF} 
              disabled={isExporting}
              data-testid="button-export"
              className="text-base"
            >
              {isExporting ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Download className="w-5 h-5 mr-2" />
              )}
              {isExporting ? "Generating..." : "Export Report"}
            </Button>
          </div>
        </div>

        {/* Dashboard Content for PDF Export */}
        <div ref={dashboardRef} className="space-y-8">
          {/* Hero Metric */}
        <Card className="p-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1 text-center lg:text-left space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                AI-Generated Estimate
              </div>
              <div className="space-y-2">
                <p className="text-lg text-muted-foreground">Estimated Monthly Cost:</p>
                <div className="flex items-baseline justify-center lg:justify-start gap-2 flex-nowrap">
                  <span className="text-4xl font-bold whitespace-nowrap" data-testid="text-monthly-total">${dashboardData.totalMonthlyMin.toLocaleString()} - ${dashboardData.totalMonthlyMax.toLocaleString()}</span>
                  <span className="text-lg text-muted-foreground whitespace-nowrap">/month</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
              <Card className="p-5 text-center space-y-2 bg-muted/50">
                <p className="text-base text-muted-foreground">Top Category</p>
                <p className="text-lg font-semibold" data-testid="text-top-category">{dashboardData.topCategory}</p>
              </Card>
              <Card className="p-5 text-center space-y-2 bg-muted/50">
                <p className="text-base text-muted-foreground">Biggest Opportunity</p>
                <p className="text-lg font-semibold" data-testid="text-opportunity">{dashboardData.biggestOpportunity}</p>
              </Card>
              <Card className="p-5 text-center space-y-2 bg-muted/50">
                <p className="text-base text-muted-foreground">Goal Alignment</p>
                <p className="text-lg font-semibold text-primary" data-testid="text-goal-alignment">{dashboardData.goalAlignment}%</p>
              </Card>
            </div>
          </div>
        </Card>

        {/* Categories & Drivers Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Category Breakdown */}
          <Card className="lg:col-span-3 p-6 flex flex-col">
            <h3 className="text-xl font-semibold mb-4">Category Breakdown</h3>
            <div className="flex-1 flex flex-col justify-between">
              {dashboardData.categories.map((category) => (
                <div key={category.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded ${categoryBgColors[category.name] || 'bg-muted'} flex items-center justify-center`}>
                        <category.icon className={`w-3.5 h-3.5 ${categoryColors[category.name] || 'text-primary'}`} />
                      </div>
                      <span className="text-base font-medium">{category.name}</span>
                    </div>
                    <span className="text-base font-semibold">${category.amount}</span>
                  </div>
                  <div
                    className={`h-5 ${category.color} rounded transition-all`}
                    style={{ width: `${maxCategory > 0 ? (category.amount / maxCategory) * 100 : 0}%`, minWidth: category.amount > 0 ? '8px' : '0' }}
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Top Drivers & Chart */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Top Drivers */}
            <Card className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold">Top Spending Drivers</h3>
              </div>
              <div className="flex-1 flex flex-col justify-between gap-4">
                {dashboardData.topDrivers.map((driver, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 flex-1">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-semibold text-base leading-snug">{driver.habit}</p>
                      <p className="text-sm text-muted-foreground">
                        ~${driver.monthlyCost}/month
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Lifestyle Balance Chart */}
            <Card className="p-6 flex flex-col flex-1">
              <div className="space-y-1 mb-4">
                <h3 className="text-xl font-semibold">Lifestyle Balance</h3>
                <p className="text-sm text-muted-foreground">See how your spending balances between essentials, convenience, and enjoyment.</p>
              </div>
              {(() => {
                const essentialsCategories = ["Food & Dining", "Transportation", "Coffee & Drinks", "Dining Out", "Delivery & Takeout"];
                const convenienceCategories = ["Subscriptions", "Fitness & Wellness", "Streaming", "Apps & Services", "Gym & Fitness", "Wellness & Self-Care"];
                const enjoymentCategories = ["Shopping", "Social", "Wardrobe & Style", "Hobbies & Extras", "Nights Out", "Casual Hangouts"];
                
                const essentialsAmount = dashboardData.categories
                  .filter(c => essentialsCategories.includes(c.name))
                  .reduce((sum, c) => sum + c.amount, 0);
                const convenienceAmount = dashboardData.categories
                  .filter(c => convenienceCategories.includes(c.name))
                  .reduce((sum, c) => sum + c.amount, 0);
                const enjoymentAmount = dashboardData.categories
                  .filter(c => enjoymentCategories.includes(c.name))
                  .reduce((sum, c) => sum + c.amount, 0);
                const total = essentialsAmount + convenienceAmount + enjoymentAmount;
                
                const lifestyleGroups = [
                  { name: "Essentials", amount: essentialsAmount, percentage: Math.round((essentialsAmount / total) * 100), color: "#3b82f6", description: "Food & Transport" },
                  { name: "Convenience", amount: convenienceAmount, percentage: Math.round((convenienceAmount / total) * 100), color: "#8b5cf6", description: "Subscriptions & Wellness" },
                  { name: "Enjoyment", amount: enjoymentAmount, percentage: Math.round((enjoymentAmount / total) * 100), color: "#f59e0b", description: "Shopping & Social" },
                ];
                
                return (
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="h-[140px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={lifestyleGroups}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          paddingAngle={3}
                          dataKey="amount"
                        >
                          {lifestyleGroups.map((group, index) => (
                            <Cell key={`cell-${index}`} fill={group.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    </div>
                    <div className="space-y-3 mt-2">
                      {lifestyleGroups.map((group) => (
                        <div key={group.name} className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: group.color }} />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-sm">{group.name}</span>
                              <span className="font-semibold text-sm">{group.percentage}%</span>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{group.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </Card>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-2xl font-semibold">
              {isLoadingInsights ? "Generating Personalized Insights..." : "Personalized Recommendations"}
            </h3>
          </div>
          
          {aiInsights?.personalizedMessage && (
            <Card className="p-6 bg-primary/5 border-primary/20">
              <p className="text-base leading-relaxed">{aiInsights.personalizedMessage}</p>
            </Card>
          )}
          
          {isLoadingInsights ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6 space-y-4 animate-pulse">
                  <div className="w-12 h-12 rounded-lg bg-muted" />
                  <div className="space-y-2">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-5/6" />
                  </div>
                  <div className="h-6 bg-muted rounded w-1/2" />
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dashboardData.recommendations.map((rec: any, index: number) => (
                <Card key={index} className="p-6 space-y-4 hover-elevate">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <rec.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-lg">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{rec.description}</p>
                  </div>
                  <div className="pt-2 border-t">
                    <Badge variant="secondary" className="text-sm">
                      Save ~${rec.savings}/month
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Spending Simulator Card */}
        <Card 
          className="p-8 cursor-pointer hover:shadow-lg transition-all border-2 border-primary/20 hover:border-primary/40 bg-gradient-to-br from-primary/5 to-primary/10"
          onClick={onSimulator}
          data-testid="button-simulator"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
              <SlidersHorizontal className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left space-y-2">
              <h3 className="text-2xl font-bold">Spending Simulator</h3>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Explore "what-if" scenarios by adjusting your lifestyle habits. See how small changes like fewer coffees or less delivery orders can impact your monthly spending in real-time.
              </p>
            </div>
            <div className="shrink-0">
              <Button size="lg" className="gap-2 text-base px-6">
                Try It Now
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Global Map */}
        <GlobalMap baseAmount={dashboardData.totalMonthly} baseCity={dashboardData.city} onDeepDive={onCityComparison} />
        </div>
      </div>
    </div>
  );
}
