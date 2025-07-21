import { motion } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown, Minus, Youtube, Twitter } from "lucide-react";
import { PerformanceMetrics } from "@shared/schema";

interface PerformanceMetricsDashboardProps {
  metrics: PerformanceMetrics;
}

export function PerformanceMetricsDashboard({ metrics }: PerformanceMetricsDashboardProps) {
  const trendIcon = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Minus
  };

  const trendColor = {
    up: "text-green-500",
    down: "text-red-500", 
    stable: "text-gray-500"
  };

  const TrendIcon = trendIcon[metrics.engagementTrend];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="bg-card rounded-2xl shadow-lg p-8 border">
      <h3 className="font-bold text-2xl text-card-foreground mb-6 flex items-center gap-3">
        <BarChart3 className="text-blue-600 dark:text-blue-400" />
        Performance Dashboard
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Videos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-red-50 dark:bg-red-950/20 rounded-xl p-6 border border-red-200 dark:border-red-800"
        >
          <div className="flex items-center justify-between mb-3">
            <Youtube className="w-8 h-8 text-red-500" />
            <div className="text-right">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {metrics.totalVideos}
              </div>
              <div className="text-sm text-red-700 dark:text-red-300">Total Videos</div>
            </div>
          </div>
          <div className="w-full bg-red-200 dark:bg-red-900/30 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-red-500 h-2 rounded-full"
            />
          </div>
        </motion.div>

        {/* Total Tweets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-center justify-between mb-3">
            <Twitter className="w-8 h-8 text-blue-500" />
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatNumber(metrics.totalTweets)}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Total Tweets</div>
            </div>
          </div>
          <div className="w-full bg-blue-200 dark:bg-blue-900/30 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "90%" }}
              transition={{ duration: 1, delay: 0.7 }}
              className="bg-blue-500 h-2 rounded-full"
            />
          </div>
        </motion.div>

        {/* Average Views */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-purple-50 dark:bg-purple-950/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800"
        >
          <div className="flex items-center justify-between mb-3">
            <BarChart3 className="w-8 h-8 text-purple-500" />
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {formatNumber(metrics.averageViews)}
              </div>
              <div className="text-sm text-purple-700 dark:text-purple-300">Avg Views</div>
            </div>
          </div>
          <div className="w-full bg-purple-200 dark:bg-purple-900/30 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "85%" }}
              transition={{ duration: 1, delay: 0.9 }}
              className="bg-purple-500 h-2 rounded-full"
            />
          </div>
        </motion.div>

        {/* Engagement Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-green-50 dark:bg-green-950/20 rounded-xl p-6 border border-green-200 dark:border-green-800"
        >
          <div className="flex items-center justify-between mb-3">
            <TrendIcon className={`w-8 h-8 ${trendColor[metrics.engagementTrend]}`} />
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 capitalize">
                {metrics.engagementTrend}
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">Engagement</div>
            </div>
          </div>
          <div className="w-full bg-green-200 dark:bg-green-900/30 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: metrics.engagementTrend === 'up' ? "100%" : metrics.engagementTrend === 'down' ? "30%" : "60%" }}
              transition={{ duration: 1, delay: 1.1 }}
              className={`h-2 rounded-full ${
                metrics.engagementTrend === 'up' ? 'bg-green-500' : 
                metrics.engagementTrend === 'down' ? 'bg-red-500' : 'bg-gray-500'
              }`}
            />
          </div>
        </motion.div>
      </div>

      {/* Top Performing Niche */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800"
      >
        <h4 className="font-semibold text-lg text-card-foreground mb-2">🏆 Top Performing Niche</h4>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 capitalize">
            {metrics.topPerformingNiche.replace('-', ' ')}
          </span>
          <span className="bg-yellow-100 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-300 px-4 py-2 rounded-full text-sm font-semibold">
            Leading Category
          </span>
        </div>
      </motion.div>
    </div>
  );
}