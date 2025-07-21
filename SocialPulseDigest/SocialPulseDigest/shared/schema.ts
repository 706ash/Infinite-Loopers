import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const brands = pgTable("brands", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  niche: text("niche").notNull(),
  tone: text("tone").notNull(),
  colorPreferences: jsonb("color_preferences").$type<string[]>(),
  audienceDescription: text("audience_description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const digests = pgTable("digests", {
  id: serial("id").primaryKey(),
  brandId: integer("brand_id").references(() => brands.id).notNull(),
  title: text("title").notNull(),
  content: jsonb("content").$type<DigestContent>().notNull(),
  isPublished: boolean("is_published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const digestMetrics = pgTable("digest_metrics", {
  id: serial("id").primaryKey(),
  digestId: integer("digest_id").references(() => digests.id).notNull(),
  totalMentions: integer("total_mentions").default(0),
  risingCreators: integer("rising_creators").default(0),
  viralPosts: integer("viral_posts").default(0),
  positivesentiment: integer("positive_sentiment").default(0),
  neutralSentiment: integer("neutral_sentiment").default(0),
  negativeSentiment: integer("negative_sentiment").default(0),
});

export interface DigestContent {
  summary: string;
  topYouTubeVideos: YouTubeVideo[];
  trendingTweets: TwitterPost[];
  audienceSentiment: SentimentAnalysis;
  keyInsights: string[];
  performanceMetrics: PerformanceMetrics;
}

export interface YouTubeVideo {
  id: number;
  title: string;
  url: string;
  views: number;
  date: string;
  comments?: any;
  commentsDisabled: boolean;
  isShort: boolean;
  niche?: string;
}

export interface TwitterPost {
  id: number;
  text: string;
  date: string;
  replies: number;
  retweets: number;
  likes: number;
  views: number;
  topReplies?: string;
  niche: string;
}

export interface SentimentAnalysis {
  positive: number;
  neutral: number;
  negative: number;
  totalEngagement: number;
  topPositiveComments: string[];
  topConcerns: string[];
}

export interface PerformanceMetrics {
  totalVideos: number;
  totalTweets: number;
  averageViews: number;
  topPerformingNiche: string;
  engagementTrend: 'up' | 'down' | 'stable';
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  niche: string;
  followers: number;
  engagement: number;
  latestPost: {
    title: string;
    metrics: {
      views: number;
      likes: number;
      comments: number;
    };
  };
  status: 'rising' | 'hot' | 'trending';
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'content' | 'audience' | 'engagement' | 'trends';
}

export interface ContentIdea {
  id: string;
  title: string;
  description: string;
  platform: string[];
  impact: 'high' | 'medium' | 'low';
  trending: boolean;
}

export interface AudienceInsight {
  trendingKeywords: string[];
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  conversations: {
    id: string;
    author: string;
    authorAvatar: string;
    content: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    engagement: {
      likes: number;
      replies: number;
      shares?: number;
    };
    type: 'positive' | 'question' | 'results';
  }[];
}

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertBrandSchema = createInsertSchema(brands).omit({
  id: true,
  createdAt: true,
});

export const insertDigestSchema = createInsertSchema(digests).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertBrand = z.infer<typeof insertBrandSchema>;
export type InsertDigest = z.infer<typeof insertDigestSchema>;
export type User = typeof users.$inferSelect;
export type Brand = typeof brands.$inferSelect;
export type Digest = typeof digests.$inferSelect;
export type DigestMetric = typeof digestMetrics.$inferSelect;
