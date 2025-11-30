import { Card } from "@/components/ui/card";
import { ShieldCheck, X, Check } from "lucide-react";

export default function PrivacyPromise() {
  const weDoNot = [
    "Connect to your bank account",
    "Read transaction history",
    "Store sensitive financial data",
    "Share information with third parties",
  ];

  const weDo = [
    "Use anonymous lifestyle questions",
    "Apply AI to typical market prices",
    "Generate estimates locally",
    "Respect your complete privacy",
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold">Simple Insights, No Bank Data Needed</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We believe financial insights shouldn't require sacrificing your privacy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* What We DO */}
          <Card className="p-8 space-y-6 border-primary/20 bg-primary/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">We Only Use</h3>
            </div>
            
            <ul className="space-y-4">
              {weDo.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* What We DON'T Do */}
          <Card className="p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <X className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-2xl font-semibold">We Never...</h3>
            </div>
            
            <ul className="space-y-4">
              {weDoNot.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center mt-0.5 shrink-0">
                    <X className="w-3 h-3 text-destructive" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
