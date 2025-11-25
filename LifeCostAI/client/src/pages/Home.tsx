import { useState } from "react";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import PrivacyPromise from "@/components/PrivacyPromise";
import UseCases from "@/components/UseCases";
import FinalCTA from "@/components/FinalCTA";
import LifestyleForm from "@/components/LifestyleForm";
import Dashboard from "@/components/Dashboard";
import type { FormData } from "@/components/LifestyleForm";

type ViewState = "landing" | "form" | "dashboard";

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

  if (view === "form") {
    return <LifestyleForm onSubmit={handleFormSubmit} onBack={handleBackToLanding} />;
  }

  if (view === "dashboard") {
    return <Dashboard onEdit={handleEdit} />;
  }

  return (
    <div>
      <Hero onGetStarted={handleGetStarted} onSeeExample={handleSeeExample} />
      <HowItWorks />
      <PrivacyPromise />
      <UseCases />
      <FinalCTA onGetStarted={handleGetStarted} />
    </div>
  );
}
