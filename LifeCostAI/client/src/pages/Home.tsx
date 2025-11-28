import { useState } from "react";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import PrivacyPromise from "@/components/PrivacyPromise";
import UseCases from "@/components/UseCases";
import FinalCTA from "@/components/FinalCTA";
import LifestyleForm from "@/components/LifestyleForm";
import Dashboard from "@/components/Dashboard";
import SpendingSimulator from "@/components/SpendingSimulator";
import CityComparison from "@/components/CityComparison";
import type { FormData } from "@/components/LifestyleForm";
import { calculateEstimates } from "@/lib/estimationEngine";

type ViewState = "landing" | "form" | "dashboard" | "simulator" | "cityComparison";

export default function Home() {
  const [view, setView] = useState<ViewState>("landing");
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleGetStarted = () => {
    setView("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setView("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEdit = () => {
    setView("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToLanding = () => {
    setView("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSeeExample = () => {
    setView("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSimulator = () => {
    setView("simulator");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToDashboard = () => {
    setView("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCityComparison = () => {
    setView("cityComparison");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (view === "form") {
    return <LifestyleForm onSubmit={handleFormSubmit} onBack={handleBackToLanding} />;
  }

  if (view === "dashboard") {
    return <Dashboard onEdit={handleEdit} onBackToHome={handleBackToLanding} onSimulator={handleSimulator} onCityComparison={handleCityComparison} formData={formData} />;
  }

  if (view === "simulator") {
    const baselineTotal = formData ? calculateEstimates(formData).totalMonthly : undefined;
    return <SpendingSimulator onBack={handleBackToDashboard} baselineTotal={baselineTotal} />;
  }

  if (view === "cityComparison") {
    const estimates = formData ? calculateEstimates(formData) : null;
    const baselineCategories = estimates?.categories.map(c => ({ name: c.name, amount: c.amount }));
    const baseCity = estimates?.city || "Calgary";
    return <CityComparison onBack={handleBackToDashboard} baselineCategories={baselineCategories} baseCity={baseCity} />;
  }

  return (
    <div>
      <Hero onGetStarted={handleGetStarted} onSeeExample={handleSeeExample} />
      <HowItWorks />
      <UseCases />
      <PrivacyPromise />
      <FinalCTA onGetStarted={handleGetStarted} onSeeExample={handleSeeExample} />
    </div>
  );
}
