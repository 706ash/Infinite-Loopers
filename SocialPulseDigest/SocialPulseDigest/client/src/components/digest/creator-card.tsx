import { motion } from "framer-motion";
import { TrendingUp, Flame, Star, Eye, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Creator } from "@shared/schema";

interface CreatorCardProps {
  creator: Creator;
}

export function CreatorCard({ creator }: CreatorCardProps) {
  const statusConfig = {
    rising: { icon: TrendingUp, color: 'bg-yellow-400 text-yellow-900', label: 'Rising' },
    hot: { icon: Flame, color: 'bg-red-400 text-red-900', label: 'Hot' },
    trending: { icon: Star, color: 'bg-purple-400 text-purple-900', label: 'Trending' }
  };

  const { icon: StatusIcon, color: statusColor, label: statusLabel } = statusConfig[creator.status];

  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      className="card-hover bg-card rounded-2xl shadow-lg overflow-hidden border"
    >
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className={`absolute top-4 right-4 ${statusColor} px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1`}>
          <StatusIcon className="w-3 h-3" />
          {statusLabel}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <img 
            src={creator.avatar} 
            alt={creator.name}
            className="w-16 h-16 rounded-full object-cover border-4 border-background -mt-8 relative z-10"
          />
          <div>
            <h3 className="font-semibold text-lg text-card-foreground">{creator.name}</h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium">{creator.handle}</p>
            <p className="text-sm text-muted-foreground">{creator.niche}</p>
          </div>
        </div>
        
        {/* Latest Post Preview */}
        <div className="bg-muted/50 rounded-lg p-3 mb-4">
          <p className="text-sm text-card-foreground mb-2">"{creator.latestPost.title}"</p>
          <div className="flex space-x-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {creator.latestPost.metrics.views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {creator.latestPost.metrics.likes.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              {creator.latestPost.metrics.comments}
            </span>
          </div>
        </div>
        
        {/* Engagement Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {creator.followers > 1000 ? `${Math.round(creator.followers / 1000)}K` : creator.followers}
            </div>
            <div className="text-xs text-muted-foreground">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              {creator.engagement}%
            </div>
            <div className="text-xs text-muted-foreground">Engagement</div>
          </div>
        </div>
        
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Follow Creator
        </Button>
      </div>
    </motion.div>
  );
}
