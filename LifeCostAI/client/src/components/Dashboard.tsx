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
  Edit,
  Download,
  Sparkles,
  Loader2,
  Home
} from "lucide-react";
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
};

const recommendationIcons: Record<string, any> = {
  "Meal Prep Sundays": Target,
  "Make Coffee at Home": Coffee,
  "Consolidate Streaming": Tv,
};

interface DashboardProps {
  onEdit?: () => void;
  onBackToHome?: () => void;
  formData?: FormData | null;
}

export default function Dashboard({ onEdit, onBackToHome, formData }: DashboardProps) {
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
    totalMonthly: 2847,
    totalMonthlyMin: 2420,
    totalMonthlyMax: 3274,
    city: "Calgary",
    topCategory: "Food & Dining",
    biggestOpportunity: "Review your spending patterns",
    goalAlignment: 70,
    categories: [
      { name: "Food & Dining", amount: 785, percentage: 27.6, icon: Coffee, color: "bg-chart-1" },
      { name: "Transportation", amount: 520, percentage: 18.3, icon: Car, color: "bg-chart-2" },
      { name: "Subscriptions", amount: 385, percentage: 13.5, icon: Tv, color: "bg-chart-3" },
      { name: "Fitness & Wellness", amount: 340, percentage: 11.9, icon: Dumbbell, color: "bg-chart-4" },
      { name: "Shopping", amount: 817, percentage: 28.7, icon: ShoppingBag, color: "bg-chart-5" },
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
          <div className="flex gap-3">
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
                      <div className={`w-8 h-8 rounded-lg ${category.color}/20 flex items-center justify-center`}>
                        <category.icon className={`w-4 h-4 text-chart-${dashboardData.categories.indexOf(category) + 1}`} />
                      </div>
                      <span className={`font-medium text-chart-${dashboardData.categories.indexOf(category) + 1}`}>{category.name}</span>
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

          {/* Top Drivers */}
          <Card className="lg:col-span-2 p-6 space-y-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold">Top Spending Drivers</h3>
            </div>
            <div className="space-y-4">
              {dashboardData.topDrivers.map((driver, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-primary">{index + 1}</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium leading-snug">{driver.habit}</p>
                    <p className="text-sm text-muted-foreground">
                      ~${driver.monthlyCost}/month
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
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

        {/* Global Map */}
        <GlobalMap baseAmount={dashboardData.totalMonthly} baseCity={dashboardData.city} />
        </div>
      </div>
    </div>
  );
}
