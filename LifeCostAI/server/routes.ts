import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generatePersonalizedInsights, generateCityCostComparison } from "./services/aiInsights";
import { calculateEstimates } from "../client/src/lib/estimationEngine";

export async function registerRoutes(app: Express): Promise<Server> {
  // AI Insights endpoint
  app.post("/api/generate-insights", async (req, res) => {
    try {
      const formData = req.body;
      
      if (!formData) {
        return res.status(400).json({ error: "Form data is required" });
      }

      // Calculate estimates first
      const estimates = calculateEstimates(formData);
      
      // Generate AI insights
      const insights = await generatePersonalizedInsights(
        formData,
        estimates.totalMonthly,
        estimates.topCategory
      );

      res.json(insights);
    } catch (error) {
      console.error("Error generating insights:", error);
      res.status(500).json({ error: "Failed to generate insights" });
    }
  });

  // AI City Cost Comparison endpoint
  app.post("/api/compare-cities", async (req, res) => {
    try {
      const { formData, selectedCities, baselineTotal } = req.body;
      
      if (!formData || !selectedCities || selectedCities.length === 0) {
        return res.status(400).json({ error: "Form data and selected cities are required" });
      }

      const comparison = await generateCityCostComparison(
        formData,
        selectedCities,
        baselineTotal || 0
      );

      res.json(comparison);
    } catch (error) {
      console.error("Error generating city comparison:", error);
      res.status(500).json({ error: "Failed to generate city comparison" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
