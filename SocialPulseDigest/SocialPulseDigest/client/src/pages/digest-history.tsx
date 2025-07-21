import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Eye, TrendingUp, Users, Zap } from "lucide-react";
import { generateMockDigest } from "@/lib/mock-data";
import type { DigestContent } from "@shared/schema";

interface DigestHistoryItem {
  id: number;
  title: string;
  createdAt: Date;
  content: DigestContent;
  metrics: {
    totalMentions: number;
    risingCreators: number;
    viralPosts: number;
  };
}

export default function DigestHistory() {
  const [digests, setDigests] = useState<DigestHistoryItem[]>([]);
  const [selectedDigest, setSelectedDigest] = useState<DigestHistoryItem | null>(null);

  useEffect(() => {
    // Generate mock digest history
    const mockDigests: DigestHistoryItem[] = [
      {
        id: 1,
        title: "Social Digest - Today",
        createdAt: new Date(),
        content: generateMockDigest('finance'),
        metrics: { totalMentions: 1247, risingCreators: 8, viralPosts: 3 }
      },
      {
        id: 2,
        title: "Social Digest - Yesterday", 
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        content: generateMockDigest('finance'),
        metrics: { totalMentions: 892, risingCreators: 5, viralPosts: 2 }
      },
      {
        id: 3,
        title: "Social Digest - 2 days ago",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), 
        content: generateMockDigest('finance'),
        metrics: { totalMentions: 1034, risingCreators: 6, viralPosts: 4 }
      }
    ];
    setDigests(mockDigests);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Digest History</h1>
          <p className="text-xl text-muted-foreground">
            Browse through your previous social media digests
          </p>
        </div>

        {selectedDigest ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setSelectedDigest(null)}
              >
                ← Back to History
              </Button>
              <div className="text-sm text-muted-foreground">
                {selectedDigest.createdAt.toLocaleDateString()}
              </div>
            </div>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">{selectedDigest.title}</h2>
                <p className="text-muted-foreground mb-6">
                  {selectedDigest.content.summary}
                </p>

                {/* Metrics Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">
                      {selectedDigest.metrics.totalMentions.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Mentions</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">
                      {selectedDigest.metrics.risingCreators}
                    </div>
                    <div className="text-sm text-muted-foreground">Rising Creators</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">
                      {selectedDigest.metrics.viralPosts}
                    </div>
                    <div className="text-sm text-muted-foreground">Viral Posts</div>
                  </div>
                </div>

                {/* Key Insights */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Key Insights</h3>
                  <ul className="space-y-2">
                    {selectedDigest.content.keyInsights?.map((insight, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span className="text-muted-foreground">{insight}</span>
                      </li>
                    )) || []}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid gap-6">
            {digests.map((digest, index) => (
              <motion.div
                key={digest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent 
                    className="p-6"
                    onClick={() => setSelectedDigest(digest)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-1">
                          {digest.title}
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarDays className="w-4 h-4 mr-1" />
                          {digest.createdAt.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Digest
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-muted-foreground">
                          {digest.metrics.totalMentions.toLocaleString()} mentions
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-muted-foreground">
                          {digest.metrics.risingCreators} rising creators
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-muted-foreground">
                          {digest.metrics.viralPosts} viral posts
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {digest.content.summary}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
