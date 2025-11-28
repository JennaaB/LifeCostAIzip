import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

interface FinalCTAProps {
  onGetStarted: () => void;
  onSeeExample: () => void;
}

export default function FinalCTA({ onGetStarted, onSeeExample }: FinalCTAProps) {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-primary/5 to-chart-2/5">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Ready to Understand Your Lifestyle?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take 3 minutes to answer simple questions about your daily habits and get instant AI-powered insights about your spending patterns.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={onGetStarted} className="text-lg px-8 py-6" data-testid="button-cta-start">
            Start Your Snapshot
            <Sparkles className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={onSeeExample} data-testid="button-cta-example">
            See Example Dashboard
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        <div className="pt-8 border-t">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>No Sign-Up Required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Privacy Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
