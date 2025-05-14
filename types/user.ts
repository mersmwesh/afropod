export interface User {
  id: string;
  name: string;
  imageUrl?: string;
  email: string;
  preferences: {
    languages: string[];
    regions: string[];
    genres: string[];
  };
  savedEpisodes: string[];
  downloadedEpisodes: string[];
  subscribedPodcasts: string[];
}