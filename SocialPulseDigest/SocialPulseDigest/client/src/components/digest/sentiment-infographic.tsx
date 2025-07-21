import { motion } from "framer-motion";
import { Smile, Meh, Frown, TrendingUp, MessageSquare, Users } from "lucide-react";
import { SentimentAnalysis } from "@shared/schema";

interface SentimentInfographicProps {
  sentiment: SentimentAnalysis;
}

export function SentimentInfographic({ sentiment }: SentimentInfographicProps) {
  const totalSentiment = sentiment.positive + sentiment.neutral + sentiment.negative;
  
  return (
    <div className="bg-card rounded-2xl shadow-lg p-8 border">
      <h3 className="font-bold text-2xl text-card-foreground mb-6 flex items-center gap-3">
        <Users className="text-blue-600 dark:text-blue-400" />
        Audience Sentiment Analysis
      </h3>
      
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center bg-green-50 dark:bg-green-950/20 rounded-xl p-6 border border-green-200 dark:border-green-800"
        >
          <Smile className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
            {sentiment.positive}%
          </div>
          <div className="text-sm font-medium text-green-700 dark:text-green-300">Positive</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center bg-gray-50 dark:bg-gray-950/20 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <Meh className="w-12 h-12 text-gray-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-600 dark:text-gray-400 mb-2">
            {sentiment.neutral}%
          </div>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Neutral</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center bg-red-50 dark:bg-red-950/20 rounded-xl p-6 border border-red-200 dark:border-red-800"
        >
          <Frown className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
            {sentiment.negative}%
          </div>
          <div className="text-sm font-medium text-red-700 dark:text-red-300">Negative</div>
        </motion.div>
      </div>
      
      {/* Engagement Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-card-foreground">Total Engagement</span>
          <span className="flex items-center gap-2 text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            {sentiment.totalEngagement.toLocaleString()}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full"
          />
        </div>
      </div>
      
      {/* Top Comments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-lg text-card-foreground mb-4 flex items-center gap-2">
            <Smile className="w-5 h-5 text-green-500" />
            Top Positive Comments
          </h4>
          <div className="space-y-3">
            {sentiment.topPositiveComments.map((comment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg border-l-4 border-green-400"
              >
                <p className="text-sm text-card-foreground italic">"{comment}"</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-lg text-card-foreground mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-orange-500" />
            Top Concerns
          </h4>
          <div className="space-y-3">
            {sentiment.topConcerns.map((concern, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg border-l-4 border-orange-400"
              >
                <p className="text-sm text-card-foreground italic">"{concern}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}