import { Play, Eye, ThumbsUp, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  thumbnail: string;
  views: number;
  likes: number;
  comments: number;
  whyItWorked: string;
}

export function YouTubeEmbed({ title, thumbnail, views, likes, comments, whyItWorked }: YouTubeEmbedProps) {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      className="card-hover bg-card rounded-2xl shadow-lg overflow-hidden border"
    >
      <div className="relative group">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-red-600 text-white rounded-full p-3 cursor-pointer"
          >
            <Play className="w-6 h-6 fill-current" />
          </motion.div>
        </div>
        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          YouTube
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-lg text-card-foreground mb-2 line-clamp-2">
          {title}
        </h3>
        
        {/* Metrics */}
        <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground">
          <div className="flex space-x-4">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              {likes.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {comments.toLocaleString()}
            </span>
          </div>
        </div>
        
        {/* Why it worked insight */}
        <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3 border-l-4 border-blue-500">
          <p className="text-sm text-card-foreground">
            <span className="font-medium text-blue-600 dark:text-blue-400">💡 Why it worked:</span>
            {" "}{whyItWorked}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
