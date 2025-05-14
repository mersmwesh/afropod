export interface Podcast {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  creator: string;
  language: string;
  tags?: string[];
  totalEpisodes: number;
  subscribers?: number;
  rating?: number;
}

export interface Episode {
  id: string;
  podcastId: string;
  podcastTitle: string;
  title: string;
  description: string;
  audioUrl: string;
  imageUrl: string;
  duration: number;
  publishDate: string;
  isDownloaded?: boolean;
  progress?: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  podcastId: string;
  rating: number;
  content: string;
  createdAt: string;
}