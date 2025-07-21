import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import { motion } from "framer-motion";

interface TwitterEmbedProps {
  author: string;
  authorHandle: string;
  authorAvatar: string;
  content: string;
  likes: number;
  comments: number;
  shares?: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  whyItWorked: string;
}

export function TwitterEmbed({ 
  author, 
  authorHandle, 
  authorAvatar, 
  content, 
  likes, 
  comments, 
  shares = 0, 
  sentiment,
  whyItWorked 
}: TwitterEmbedProps) {
  const sentimentColors = {
    positive: 'bg-green-100 text-green-700 dark:bg-green-950/20 dark:text-green-400',
    neutral: 'bg-blue-100 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400',
    negative: 'bg-red-100 text-red-700 dark:bg-red-950/20 dark:text-red-400'
  };

  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      className="card-hover bg-card rounded-2xl shadow-lg overflow-hidden border"
    >
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            X (Twitter)
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${sentimentColors[sentiment]}`}>
            {sentiment === 'positive' && '😊 Positive'}
            {sentiment === 'neutral' && '😐 Neutral'}  
            {sentiment === 'negative' && '😟 Negative'}
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-xl p-4 mb-4 border-l-4 border-blue-500">
          <div className="flex items-center space-x-2 mb-2">
            <img 
              src={authorAvatar} 
              alt={author}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-semibold text-sm text-card-foreground">{author}</span>
            <span className="text-muted-foreground text-sm">{authorHandle}</span>
            <span className="text-muted-foreground text-sm">• 2h</span>
          </div>
          <p className="text-card-foreground text-sm mb-3">
            {content}
          </p>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {likes.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Repeat2 className="w-4 h-4" />
              {shares.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {comments.toLocaleString()}
            </span>
          </div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-3 border-l-4 border-purple-500">
          <p className="text-sm text-card-foreground">
            <span className="font-medium text-purple-600 dark:text-purple-400">💡 Why it worked:</span>
            {" "}{whyItWorked}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
