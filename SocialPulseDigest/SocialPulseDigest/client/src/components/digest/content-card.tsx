import { ContentItem } from "@shared/schema";
import { YouTubeEmbed } from "./youtube-embed";
import { TwitterEmbed } from "./twitter-embed";

interface ContentCardProps {
  content: ContentItem;
}

export function ContentCard({ content }: ContentCardProps) {
  if (content.type === 'youtube' && content.thumbnail && content.metrics.views) {
    return (
      <YouTubeEmbed
        videoId={content.videoId || ''}
        title={content.title}
        thumbnail={content.thumbnail}
        views={content.metrics.views}
        likes={content.metrics.likes}
        comments={content.metrics.comments}
        whyItWorked={content.whyItWorked}
      />
    );
  }

  if (content.type === 'twitter') {
    return (
      <TwitterEmbed
        author={content.author}
        authorHandle={content.authorHandle}
        authorAvatar={content.authorAvatar}
        content={content.content}
        likes={content.metrics.likes}
        comments={content.metrics.comments}
        shares={content.metrics.shares}
        sentiment={content.sentiment}
        whyItWorked={content.whyItWorked}
      />
    );
  }

  return null;
}
