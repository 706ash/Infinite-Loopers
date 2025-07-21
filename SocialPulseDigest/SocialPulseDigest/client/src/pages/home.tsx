import { motion } from "framer-motion";
import { Play, MessageSquare, Youtube, Twitter, BarChart3, Brain } from "lucide-react";
import { HeroSection } from "@/components/digest/hero-section";
import { YouTubeVideoCard } from "@/components/digest/youtube-video-card";
import { TwitterPostCard } from "@/components/digest/twitter-post-card";
import { SentimentInfographic } from "@/components/digest/sentiment-infographic";
import { PerformanceMetricsDashboard } from "@/components/digest/performance-metrics-dashboard";
import { useToast } from "@/hooks/use-toast";
import { generateMockDigest } from "@/lib/mock-data";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [selectedNiche, setSelectedNiche] = useState('finance');
  const [digestData, setDigestData] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchDigest() {
      const { data, error } = await supabase
        .from('digests')
        .select('digest')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      if (error) {
        toast({ title: "Error", description: "Failed to fetch digest." });
        return;
      }
      setDigestData(data.digest);
    }
    fetchDigest();
  }, []);

  if (!digestData) {
    return <div>Loading...</div>;
  }

  const handleRegenerate = () => {
    // This function will be updated to regenerate from Supabase
    toast({
      title: "Regenerate not implemented",
      description: "Regeneration from Supabase is not yet available.",
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

  const formatNumber = (num: any) => {
    if (num === undefined || num === null || isNaN(Number(num))) return '0';
    const n = Number(num);
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toString();
  };

  function getDashboardMetrics(digestData: any) {
    const youtube = digestData?.performanceMetrics?.youtube || {};
    const twitter = digestData?.performanceMetrics?.twitter || {};
    return {
      totalVideos: digestData?.topYouTubeVideos?.length ?? 0,
      totalTweets: digestData?.trendingTweets?.length ?? 0,
      averageViews: youtube.views ?? 0,
      engagementTrend: 'stable', // or compute based on your data
      topPerformingNiche: 'N/A', // or compute if you have this info
    };
  }

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
            {digestData?.summary || "No summary available for this niche."}
          </p>
        </motion.div>

        {/* Performance Dashboard */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-16"
        >
          <PerformanceMetricsDashboard metrics={getDashboardMetrics(digestData)} />
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
            {digestData?.topYouTubeVideos?.map((video: any, index: number) => (
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
            {digestData?.trendingTweets?.map((tweet: any, index: number) => (
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
          <SentimentInfographic sentiment={digestData?.audienceSentiment || {}} />
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
            {digestData?.keyInsights?.map((insight: string, index: number) => (
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