import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBrandSchema, insertDigestSchema } from "@shared/schema";
import { generateMockDigest } from "../client/src/lib/mock-data";

export async function registerRoutes(app: Express): Promise<Server> {
  // Brand routes
  app.post("/api/brands", async (req, res) => {
    try {
      const validatedData = insertBrandSchema.parse(req.body);
      const brand = await storage.createBrand(validatedData);
      res.json(brand);
    } catch (error) {
      res.status(400).json({ message: "Invalid brand data" });
    }
  });

  app.get("/api/brands/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const brands = await storage.getBrandsByUserId(userId);
      res.json(brands);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch brands" });
    }
  });

  // Digest routes
  app.post("/api/digests", async (req, res) => {
    try {
      const validatedData = insertDigestSchema.parse(req.body);
      const digest = await storage.createDigest(validatedData);
      res.json(digest);
    } catch (error) {
      res.status(400).json({ message: "Invalid digest data" });
    }
  });

  app.get("/api/digests/:brandId", async (req, res) => {
    try {
      const brandId = parseInt(req.params.brandId);
      const digests = await storage.getDigestsByBrandId(brandId);
      res.json(digests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch digests" });
    }
  });

  // Generate new digest
  app.post("/api/digests/generate", async (req, res) => {
    try {
      const { brandId, niche } = req.body;
      
      // Generate mock digest content based on niche
      const digestContent = generateMockDigest(niche || 'finance');
      
      const digest = await storage.createDigest({
        brandId,
        title: `Social Digest - ${new Date().toLocaleDateString()}`,
        content: digestContent,
        isPublished: true,
      });

      // Create associated metrics
      await storage.createDigestMetrics({
        digestId: digest.id,
        totalMentions: digestContent.audienceInsights.sentiment.positive + 
                      digestContent.audienceInsights.sentiment.neutral + 
                      digestContent.audienceInsights.sentiment.negative,
        risingCreators: digestContent.risingCreators.length,
        viralPosts: digestContent.topContent.filter(c => c.metrics.views && c.metrics.views > 100000).length,
        positivesentiment: digestContent.audienceInsights.sentiment.positive,
        neutralSentiment: digestContent.audienceInsights.sentiment.neutral,
        negativeSentiment: digestContent.audienceInsights.sentiment.negative,
      });

      res.json(digest);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate digest" });
    }
  });

  // Export digest
  app.post("/api/digests/:id/export", async (req, res) => {
    try {
      const digestId = parseInt(req.params.id);
      const { type } = req.body; // 'slack', 'notion', 'pdf'
      
      const digest = await storage.getDigest(digestId);
      if (!digest) {
        return res.status(404).json({ message: "Digest not found" });
      }

      // Simulate export functionality
      const exportData = {
        success: true,
        type,
        message: `Digest exported to ${type} successfully!`,
        timestamp: new Date().toISOString(),
      };

      res.json(exportData);
    } catch (error) {
      res.status(500).json({ message: "Failed to export digest" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
