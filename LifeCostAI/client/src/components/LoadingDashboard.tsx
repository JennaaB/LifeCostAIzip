import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles } from "lucide-react";

export default function LoadingDashboard() {
  return (
    <div className="min-h-screen py-12 px-6 bg-background">
      <div className="max-w-screen-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">AI Analyzing Your Lifestyle...</span>
          </div>
          <h2 className="text-3xl font-bold">Generating Your Personalized Insights</h2>
          <p className="text-muted-foreground">This will only take a moment</p>
        </div>

        {/* Hero Metric Skeleton */}
        <Card className="p-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1 text-center lg:text-left space-y-4">
              <Skeleton className="h-6 w-48 mx-auto lg:mx-0" />
              <Skeleton className="h-20 w-64 mx-auto lg:mx-0" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-4 space-y-2 bg-muted/50">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-24" />
                </Card>
              ))}
            </div>
          </div>
        </Card>

        {/* Categories & Drivers Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Card className="lg:col-span-3 p-6 space-y-6">
            <Skeleton className="h-7 w-48" />
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Skeleton className="h-3 w-full" />
                </div>
              ))}
            </div>
          </Card>

          <Card className="lg:col-span-2 p-6 space-y-6">
            <Skeleton className="h-7 w-48" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 rounded-lg bg-muted/50 space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recommendations Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6 space-y-4">
                <Skeleton className="h-12 w-12" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <Skeleton className="h-6 w-32" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
