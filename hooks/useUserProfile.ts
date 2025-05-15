import { useState, useCallback } from 'react';
import { User } from '@/types/user';
import { DEFAULT_USER_PREFERENCES } from '@/data/mockData';

export function useUserProfile() {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    preferences: DEFAULT_USER_PREFERENCES,
    savedEpisodes: [],
    downloadedEpisodes: [],
    subscribedPodcasts: [],
  });

  const updatePreferences = useCallback((
    type: 'languages' | 'regions' | 'genres',
    values: string[]
  ) => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [type]: values,
      },
    }));
  }, []);

  const toggleSubscription = useCallback((podcastId: string) => {
    setUser(prev => {
      const isSubscribed = prev.subscribedPodcasts.includes(podcastId);
      return {
        ...prev,
        subscribedPodcasts: isSubscribed
          ? prev.subscribedPodcasts.filter(id => id !== podcastId)
          : [...prev.subscribedPodcasts, podcastId],
      };
    });
  }, []);

  const toggleEpisodeSave = useCallback((episodeId: string) => {
    setUser(prev => {
      const isSaved = prev.savedEpisodes.includes(episodeId);
      return {
        ...prev,
        savedEpisodes: isSaved
          ? prev.savedEpisodes.filter(id => id !== episodeId)
          : [...prev.savedEpisodes, episodeId],
      };
    });
  }, []);

  const toggleEpisodeDownload = useCallback((episodeId: string) => {
    setUser(prev => {
      const isDownloaded = prev.downloadedEpisodes.includes(episodeId);
      return {
        ...prev,
        downloadedEpisodes: isDownloaded
          ? prev.downloadedEpisodes.filter(id => id !== episodeId)
          : [...prev.downloadedEpisodes, episodeId],
      };
    });
  }, []);

  return {
    user,
    updatePreferences,
    toggleSubscription,
    toggleEpisodeSave,
    toggleEpisodeDownload,
  };
}