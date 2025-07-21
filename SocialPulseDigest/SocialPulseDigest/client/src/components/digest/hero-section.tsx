import { motion } from "framer-motion";
import { Clock, RefreshCw, Download, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Niche {
  id: string;
  name: string;
  icon: any;
  color: string;
}

interface HeroSectionProps {
  niche: string;
  onNicheChange: (niche: string) => void;
  onRegenerate: () => void;
  onExport: (format: string) => void;
  niches: Niche[];
}

export function HeroSection({ niche, onNicheChange, onRegenerate, onExport, niches }: HeroSectionProps) {
  return (
    <section className="relative min-h-[70vh] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 text-yellow-500 dark:text-yellow-400 text-4xl opacity-20"
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          ₿
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-green-500 dark:text-green-400 text-3xl opacity-20"
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        >
          $
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-1/4 text-blue-500 dark:text-blue-400 text-5xl opacity-20"
          animate={{ y: [-15, 25, -15] }}
          transition={{ duration: 6, repeat: Infinity, delay: 4 }}
        >
          📈
        </motion.div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-16 pb-24">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-white/70 dark:bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
          >
            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="font-medium text-foreground">Last 48 Hours</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-bold text-5xl md:text-7xl text-foreground mb-4 leading-tight"
          >
            Your {niche.charAt(0).toUpperCase() + niche.slice(1)} 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400">
              {" "}Social Digest
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Curated insights from YouTube and X for <strong>{niche}</strong> brands
          </motion.p>
          
          {/* Niche Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {niches.map((nicheItem) => (
              <button
                key={nicheItem.id}
                onClick={() => onNicheChange(nicheItem.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  niche === nicheItem.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/80 dark:bg-black/20 text-foreground hover:bg-blue-50 dark:hover:bg-blue-950/30'
                }`}
              >
                <nicheItem.icon className="w-4 h-4 inline mr-2" />
                {nicheItem.name}
              </button>
            ))}
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={onRegenerate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Regenerate Digest
            </Button>
            <Button
              onClick={() => onExport('slack')}
              variant="outline"
              className="px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-white/80 dark:bg-black/20 backdrop-blur-sm"
            >
              <Download className="w-5 h-5 mr-2" />
              Export Digest
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-foreground/30 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}