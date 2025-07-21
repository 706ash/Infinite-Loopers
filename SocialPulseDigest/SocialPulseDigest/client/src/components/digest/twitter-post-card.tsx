import { motion } from "framer-motion";
import { Heart, MessageCircle, Repeat2, Eye, ExternalLink } from "lucide-react";
import { TwitterPost } from "@shared/schema";

interface TwitterPostCardProps {
  post: TwitterPost & { displayName?: string; handle?: string };
  rank: number;
}

export function TwitterPostCard({ post, rank }: TwitterPostCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const openTweet = () => {
    // In a real app, this would open the actual tweet
    console.log('Opening tweet:', post.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: rank * 0.1 }}
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      className="bg-card rounded-2xl shadow-lg overflow-hidden border cursor-pointer group"
      onClick={openTweet}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full font-bold text-lg">
              #{rank}
            </div>
            <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              X (Twitter)
            </div>
            <span className="bg-blue-100 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium capitalize">
              {post.niche.replace('-', ' ')}
            </span>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-muted/50 rounded-full p-2">
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </div>
        
        {/* Tweet Content */}
        <div className="bg-muted/30 rounded-xl p-4 mb-4 border-l-4 border-blue-500">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              @
            </div>
            <div>
              <span className="font-semibold text-card-foreground">{post.displayName || "Unknown"}</span>
              <span className="text-muted-foreground text-sm ml-2">{post.handle || "@unknown"} • {formatDate(post.date)}</span>
            </div>
          </div>
          <p className="text-card-foreground mb-3 leading-relaxed">
            {post.text}
          </p>
        </div>
        
        {/* Engagement Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-red-500 mb-1">
              <Heart className="w-4 h-4" />
            </div>
            <div className="font-bold text-card-foreground">{formatNumber(post.likes)}</div>
            <div className="text-xs text-muted-foreground">Likes</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-green-500 mb-1">
              <Repeat2 className="w-4 h-4" />
            </div>
            <div className="font-bold text-card-foreground">{formatNumber(post.retweets)}</div>
            <div className="text-xs text-muted-foreground">Retweets</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div className="font-bold text-card-foreground">{formatNumber(post.replies)}</div>
            <div className="text-xs text-muted-foreground">Replies</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-purple-500 mb-1">
              <Eye className="w-4 h-4" />
            </div>
            <div className="font-bold text-card-foreground">{formatNumber(post.views)}</div>
            <div className="text-xs text-muted-foreground">Views</div>
          </div>
        </div>
        
        {/* Top Reply */}
        {post.topReplies && (
          <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-3 border-l-4 border-green-500">
            <p className="text-sm text-card-foreground">
              <span className="font-medium text-green-600 dark:text-green-400">💬 Top Reply:</span>
              {" "}{post.topReplies}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}