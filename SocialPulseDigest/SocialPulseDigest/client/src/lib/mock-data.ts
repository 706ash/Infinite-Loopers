import { DigestContent, YouTubeVideo, TwitterPost, SentimentAnalysis, PerformanceMetrics } from "@shared/schema";

export function generateMockDigest(niche: string = 'finance'): DigestContent {
  // Top 5 YouTube Videos
  const topYouTubeVideos: YouTubeVideo[] = [
    {
      id: 1,
      title: "The Psychology of Money: Why We Make Bad Financial Decisions",
      url: "https://www.youtube.com/watch?v=4qZ3EKp2H5I",
      views: 2847693,
      date: "2024-01-15",
      commentsDisabled: false,
      isShort: false,
      niche: "finance"
    },
    {
      id: 2,
      title: "How I Built $1M Portfolio by Age 30 (Step by Step)",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      views: 1934821,
      date: "2024-01-14",
      commentsDisabled: false,
      isShort: false,
      niche: "investment"
    },
    {
      id: 3,
      title: "Crypto in 2024: What Nobody Tells You",
      url: "https://www.youtube.com/watch?v=abc123def456",
      views: 1256743,
      date: "2024-01-13",
      commentsDisabled: false,
      isShort: true,
      niche: "cryptocurrency"
    },
    {
      id: 4,
      title: "Budget Like a Millionaire: The 50/30/20 Rule Explained",
      url: "https://www.youtube.com/watch?v=xyz789uvw012",
      views: 987654,
      date: "2024-01-12",
      commentsDisabled: false,
      isShort: false,
      niche: "budgeting"
    },
    {
      id: 5,
      title: "Emergency Fund vs Investing: What's More Important?",
      url: "https://www.youtube.com/watch?v=def456ghi789",
      views: 743291,
      date: "2024-01-11",
      commentsDisabled: false,
      isShort: false,
      niche: "personal-finance"
    }
  ];

  // Trending Twitter Posts
  const trendingTweets: TwitterPost[] = [
    {
      id: 1,
      text: "🧵 THREAD: I analyzed 100+ millionaire portfolios. Here are the 5 patterns I found that 99% of people ignore:",
      date: "2024-01-15",
      replies: 2847,
      retweets: 12456,
      likes: 34892,
      views: 892456,
      topReplies: "This is exactly what I needed to hear right now. Thanks for sharing!",
      niche: "investment"
    },
    {
      id: 2,
      text: "Your salary is not your wealth. Your savings rate is. Your investments are. Your financial literacy is. Stop focusing on the wrong metrics.",
      date: "2024-01-14",
      replies: 1293,
      retweets: 8934,
      likes: 23847,
      views: 567834,
      topReplies: "This hit different. Time to focus on what actually matters.",
      niche: "personal-finance"
    },
    {
      id: 3,
      text: "Bitcoin just hit $47K and everyone's asking if it's too late to buy. Remember: You're not late, you're early to the next cycle. 📈",
      date: "2024-01-13",
      replies: 3847,
      retweets: 15672,
      likes: 41923,
      views: 1234567,
      topReplies: "Been DCA'ing since $20K and this gives me confidence to keep going.",
      niche: "cryptocurrency"
    },
    {
      id: 4,
      text: "Daily reminder: The stock market is a voting machine in the short run, but a weighing machine in the long run. - Benjamin Graham",
      date: "2024-01-12",
      replies: 567,
      retweets: 4321,
      likes: 18945,
      views: 287456,
      topReplies: "Classic wisdom that never gets old. Thank you for the reminder.",
      niche: "investment"
    },
    {
      id: 5,
      text: "If you're struggling with money, start here: 1. Track every expense for 30 days 2. Cut the bottom 20% 3. Automate savings 4. Invest the rest Simple but not easy.",
      date: "2024-01-11",
      replies: 1847,
      retweets: 7865,
      likes: 28473,
      views: 456789,
      topReplies: "Step 1 was eye-opening for me. I had no idea where my money was going.",
      niche: "budgeting"
    }
  ];

  // Audience Sentiment Analysis
  const audienceSentiment: SentimentAnalysis = {
    positive: 78,
    neutral: 18,
    negative: 4,
    totalEngagement: 2847692,
    topPositiveComments: [
      "This changed my entire perspective on investing!",
      "Finally someone explains this in simple terms",
      "Started implementing this strategy and already seeing results",
      "Best financial advice I've received all year",
      "This should be taught in schools"
    ],
    topConcerns: [
      "Market volatility is making me nervous",
      "Not sure if this strategy works for low income",
      "Worried about inflation eating my savings",
      "Tax implications are confusing"
    ]
  };

  // Performance Metrics
  const performanceMetrics: PerformanceMetrics = {
    totalVideos: 156,
    totalTweets: 2847,
    averageViews: 1453726,
    topPerformingNiche: "investment",
    engagementTrend: "up"
  };

  return {
    summary: `Comprehensive analysis of financial content performance from the past 48 hours, featuring top YouTube videos, trending Twitter discussions, and audience sentiment insights.`,
    topYouTubeVideos,
    trendingTweets,
    audienceSentiment,
    keyInsights: [
      "Investment-focused content drives 3x higher engagement than general finance topics",
      "Video content under 10 minutes performs 40% better than longer formats",
      "Personal success stories generate the most positive audience responses",
      "Cryptocurrency content sees highest volatility in engagement",
      "Educational threads consistently outperform promotional content"
    ],
    performanceMetrics
  };
}