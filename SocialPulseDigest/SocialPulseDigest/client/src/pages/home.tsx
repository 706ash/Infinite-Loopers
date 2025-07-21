import { motion } from "framer-motion";
import { Play, MessageSquare, Youtube, Twitter, BarChart3, Brain } from "lucide-react";
import { HeroSection } from "@/components/digest/hero-section";
import { YouTubeVideoCard } from "@/components/digest/youtube-video-card";
import { TwitterPostCard } from "@/components/digest/twitter-post-card";
import { SentimentInfographic } from "@/components/digest/sentiment-infographic";
import { PerformanceMetricsDashboard } from "@/components/digest/performance-metrics-dashboard";
import { useToast } from "@/hooks/use-toast";
import { generateMockDigest } from "@/lib/mock-data";
import { useState } from "react";

export default function Home() {
  const [selectedNiche, setSelectedNiche] = useState('finance');
  const [digestData, setDigestData] = useState(generateMockDigest('finance'));
  const { toast } = useToast();

  const handleRegenerate = () => {
    setDigestData(generateMockDigest(selectedNiche));
    toast({
      title: "Digest Regenerated",
      description: "Your digest has been updated with fresh content.",
    });
  };

  const handleExport = (format: string) => {
    toast({
      title: "Export Started",
      description: `Preparing your digest for ${format}...`,
    });
  };

  const niches = [
    { id: 'finance', name: 'Finance', icon: BarChart3, color: 'from-green-500 to-emerald-500' },
    { id: 'tech', name: 'Technology', icon: Brain, color: 'from-blue-500 to-cyan-500' },
    { id: 'lifestyle', name: 'Lifestyle', icon: MessageSquare, color: 'from-purple-500 to-pink-500' },
    { id: 'crypto', name: 'Cryptocurrency', icon: BarChart3, color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection
        niche={selectedNiche}
        onNicheChange={setSelectedNiche}
        onRegenerate={handleRegenerate}
        onExport={handleExport}
        niches={niches}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Digest Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {selectedNiche.charAt(0).toUpperCase() + selectedNiche.slice(1)} Digest
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {digestData.summary}
          </p>
        </motion.div>

        {/* Performance Dashboard */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-16"
        >
          <PerformanceMetricsDashboard metrics={digestData.performanceMetrics} />
        </motion.section>

        {/* Top YouTube Videos Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
            <Youtube className="text-red-600 dark:text-red-400" />
            Top 5 YouTube Videos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {digestData.topYouTubeVideos.map((video, index) => (
              <YouTubeVideoCard key={video.id} video={video} rank={index + 1} />
            ))}
          </div>
        </motion.section>

        {/* Trending Twitter Posts Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
            <Twitter className="text-blue-600 dark:text-blue-400" />
            Trending Twitter/X Posts
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {digestData.trendingTweets.map((tweet, index) => (
              <TwitterPostCard key={tweet.id} post={tweet} rank={index + 1} />
            ))}
          </div>
        </motion.section>

        {/* Audience Sentiment Analysis */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-16"
        >
          <SentimentInfographic sentiment={digestData.audienceSentiment} />
        </motion.section>

        {/* Key Insights Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
            <Brain className="text-purple-600 dark:text-purple-400" />
            Key Insights & Takeaways
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {digestData.keyInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-950/30 rounded-full p-2 flex-shrink-0">
                    <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-card-foreground font-medium">{insight}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}