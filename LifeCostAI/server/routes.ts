import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generatePersonalizedInsights } from "./services/aiInsights";
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

  const httpServer = createServer(app);

  return httpServer;
}
