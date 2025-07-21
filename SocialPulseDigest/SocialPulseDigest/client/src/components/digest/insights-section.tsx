import { motion } from "framer-motion";
import { Brain, Key, Lightbulb, CheckCircle, TrendingUp, Users, Target } from "lucide-react";
import { Insight, ContentIdea } from "@shared/schema";

interface InsightsSectionProps {
  insights: Insight[];
  keyTakeaways: string[];
  contentIdeas: ContentIdea[];
}

export function InsightsSection({ insights, keyTakeaways, contentIdeas }: InsightsSectionProps) {
  const categoryIcons = {
    content: Target,
    audience: Users,
    engagement: TrendingUp,
    trends: Brain
  };

  const impactColors = {
    high: 'bg-green-50 dark:bg-green-950/20 border-green-400 text-green-700 dark:text-green-400',
    medium: 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-400 text-yellow-700 dark:text-yellow-400',
    low: 'bg-blue-50 dark:bg-blue-950/20 border-blue-400 text-blue-700 dark:text-blue-400'
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-bold text-4xl text-foreground mb-4 flex items-center justify-center gap-3">
            <Brain className="text-blue-600 dark:text-blue-400" />
            What This Means For You
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-powered insights and actionable recommendations for your brand
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Key Takeaways */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl shadow-lg p-8"
          >
            <h3 className="font-semibold text-2xl text-card-foreground mb-6 flex items-center gap-3">
              <Key className="text-blue-600 dark:text-blue-400" />
              Key Takeaways
            </h3>
            
            <div className="space-y-6">
              {keyTakeaways.map((takeaway, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-xl border-l-4 border-green-400"
                >
                  <div className="bg-green-400 text-white rounded-full p-2 flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <p className="text-card-foreground">{takeaway}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Content Ideas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl shadow-lg p-8"
          >
            <h3 className="font-semibold text-2xl text-card-foreground mb-6 flex items-center gap-3">
              <Lightbulb className="text-blue-600 dark:text-blue-400" />
              Next Content Ideas
            </h3>
            
            <div className="space-y-6">
              {contentIdeas.map((idea, index) => (
                <motion.div
                  key={idea.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`rounded-xl p-4 border ${impactColors[idea.impact]}`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-blue-600 dark:bg-blue-500 text-white rounded-full p-2">
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <h4 className="font-semibold text-card-foreground">{idea.title}</h4>
                    {idea.trending && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        🔥 Trending
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-card-foreground/80 mb-2">{idea.description}</p>
                  <div className="flex space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${impactColors[idea.impact]}`}>
                      {idea.impact.charAt(0).toUpperCase() + idea.impact.slice(1)} Impact
                    </span>
                    {idea.platform.map((platform) => (
                      <span key={platform} className="text-xs bg-blue-100 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                        {platform}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Additional Insights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 bg-card rounded-2xl shadow-lg p-8"
        >
          <h3 className="font-semibold text-2xl text-card-foreground mb-6 text-center">
            Detailed Insights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.map((insight, index) => {
              const IconComponent = categoryIcons[insight.category];
              return (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`p-4 rounded-xl border ${impactColors[insight.impact]}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-600 dark:bg-blue-500 text-white rounded-full p-2 flex-shrink-0">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-1">{insight.title}</h4>
                      <p className="text-sm text-card-foreground/80">{insight.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
