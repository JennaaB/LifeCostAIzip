import { useRef, useState } from "react";
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
  SlidersHorizontal
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
};

const categoryColors: Record<string, string> = {
  "Food & Dining": "text-chart-1",
  "Transportation": "text-chart-2",
  "Subscriptions": "text-chart-3",
  "Fitness & Wellness": "text-chart-4",
  "Shopping": "text-chart-5",
  "Social": "text-yellow-600",
};

const categoryBgColors: Record<string, string> = {
  "Food & Dining": "bg-chart-1/20",
  "Transportation": "bg-chart-2/20",
  "Subscriptions": "bg-chart-3/20",
  "Fitness & Wellness": "bg-chart-4/20",
  "Shopping": "bg-chart-5/20",
  "Social": "bg-amber-400/20",
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
  
  const dashboardData = estimationData ? {
    ...estimationData,
    categories: estimationData.categories.map(c => ({
      ...c,
      icon: categoryIcons[c.name] || Coffee,
    })),
    topDrivers: estimationData.topDrivers.map(d => ({
      ...d,
      icon: categoryIcons[d.habit.split(":")[0]] || Coffee,
    })),
    recommendations: estimationData.recommendations.map(r => ({
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
      { name: "Food & Dining", amount: 785, percentage: 25.2, icon: Coffee, color: "bg-chart-1" },
      { name: "Transportation", amount: 520, percentage: 16.7, icon: Car, color: "bg-chart-2" },
      { name: "Subscriptions", amount: 385, percentage: 12.3, icon: Tv, color: "bg-chart-3" },
      { name: "Fitness & Wellness", amount: 340, percentage: 10.9, icon: Dumbbell, color: "bg-chart-4" },
      { name: "Shopping", amount: 817, percentage: 26.2, icon: ShoppingBag, color: "bg-chart-5" },
      { name: "Social", amount: 273, percentage: 8.7, icon: Users, color: "bg-amber-400" },
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
            <Button variant="outline" onClick={onEdit} data-testid="button-edit-responses">
              <Edit className="w-4 h-4 mr-2" />
              Edit Responses
            </Button>
            <Button variant="outline" onClick={onBackToHome} data-testid="button-back-home">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button 
              variant="outline" 
              onClick={handleExportPDF} 
              disabled={isExporting}
              data-testid="button-export"
            >
              {isExporting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
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
              <div className="space-y-1">
                <p className="text-muted-foreground text-lg">Estimated Monthly Lifestyle Cost</p>
                <div className="flex items-baseline justify-center lg:justify-start gap-2">
                  <DollarSign className="w-8 h-8 text-muted-foreground" />
                  <span className="text-4xl font-bold" data-testid="text-monthly-total">${dashboardData.totalMonthlyMin.toLocaleString()} - ${dashboardData.totalMonthlyMax.toLocaleString()}</span>
                  <span className="text-2xl text-muted-foreground">/month</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
              <Card className="p-4 text-center space-y-1 bg-muted/50">
                <p className="text-sm text-muted-foreground">Top Category</p>
                <p className="font-semibold" data-testid="text-top-category">{dashboardData.topCategory}</p>
              </Card>
              <Card className="p-4 text-center space-y-1 bg-muted/50">
                <p className="text-sm text-muted-foreground">Biggest Opportunity</p>
                <p className="font-semibold" data-testid="text-opportunity">{dashboardData.biggestOpportunity}</p>
              </Card>
              <Card className="p-4 text-center space-y-1 bg-muted/50">
                <p className="text-sm text-muted-foreground">Goal Alignment</p>
                <p className="font-semibold text-primary" data-testid="text-goal-alignment">{dashboardData.goalAlignment}%</p>
              </Card>
            </div>
          </div>
        </Card>

        {/* Categories & Drivers Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Category Breakdown */}
          <Card className="lg:col-span-3 p-6 space-y-6">
            <h3 className="text-xl font-semibold">Category Breakdown</h3>
            <div className="space-y-4">
              {dashboardData.categories.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${categoryBgColors[category.name] || 'bg-muted'} flex items-center justify-center`}>
                        <category.icon className={`w-4 h-4 ${categoryColors[category.name] || 'text-primary'}`} />
                      </div>
                      <span className={`font-medium ${categoryColors[category.name] || 'text-primary'}`}>{category.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">~${category.amount}</p>
                      <p className="text-sm text-muted-foreground">{category.percentage}%</p>
                    </div>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${category.color} transition-all`}
                      style={{ width: `${(category.amount / maxCategory) * 100}%` }}
                    />
                  </div>
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

            {/* Category Donut Chart */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Spending by Category</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={dashboardData.categories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="amount"
                  >
                    {dashboardData.categories.map((category, index) => {
                      const colors = [
                        "hsl(var(--chart-1))",
                        "hsl(var(--chart-2))",
                        "hsl(var(--chart-3))",
                        "hsl(var(--chart-4))",
                        "hsl(var(--chart-5))",
                        "#fbbf24",
                      ];
                      return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                    })}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                {dashboardData.categories.map((cat, idx) => (
                  <div key={cat.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{
                      backgroundColor: ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))", "#fbbf24"][idx % 6]
                    }} />
                    <span className="text-muted-foreground">{cat.name}: {cat.percentage}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-2xl font-semibold">Personalized Recommendations</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dashboardData.recommendations.map((rec, index) => (
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
              <Button size="lg" className="gap-2">
                Try It Now
                <SlidersHorizontal className="w-4 h-4" />
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
