import { motion } from "framer-motion";
import { Play, Eye, Calendar, Clock, ExternalLink } from "lucide-react";
import { YouTubeVideo } from "@shared/schema";

interface YouTubeVideoCardProps {
  video: YouTubeVideo;
  rank: number;
}

export function YouTubeVideoCard({ video, rank }: YouTubeVideoCardProps) {
  const getVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(video.url);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : 
    `https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=450&fit=crop`;

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const openVideo = () => {
    window.open(video.url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: rank * 0.1 }}
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      className="bg-card rounded-2xl shadow-lg overflow-hidden border cursor-pointer group"
      onClick={openVideo}
    >
      <div className="relative">
        <img 
          src={thumbnailUrl} 
          alt={video.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-red-600 text-white rounded-full p-4"
          >
            <Play className="w-8 h-8 fill-current" />
          </motion.div>
        </div>
        
        {/* Rank Badge */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full font-bold text-lg">
          #{rank}
        </div>
        
        {/* Video Type Badge */}
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            YouTube
          </div>
          {video.isShort && (
            <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Short
            </div>
          )}
        </div>
        
        {/* External Link Icon */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/90 dark:bg-black/90 text-foreground rounded-full p-2">
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-lg text-card-foreground mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {video.title}
        </h3>
        
        {/* Metrics Row */}
        <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-semibold">
              <Eye className="w-4 h-4 text-blue-600" />
              {formatViews(video.views)} views
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(video.date)}
            </span>
          </div>
        </div>
        
        {/* Niche Tag */}
        {video.niche && (
          <div className="flex justify-between items-center">
            <span className="bg-blue-100 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium capitalize">
              {video.niche.replace('-', ' ')}
            </span>
            <span className="text-xs text-muted-foreground">
              {video.commentsDisabled ? 'Comments Off' : 'Comments On'}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}