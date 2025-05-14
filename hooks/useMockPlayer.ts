import { useState, useEffect } from 'react';
import { Episode } from '@/types/podcast';

// Hook to simulate audio player functionality
export default function useMockPlayer() {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);

  // Simulate the playing behavior
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPlaying && currentEpisode) {
      timer = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 1;
          // Reset when reaching the end
          if (newProgress >= currentEpisode.duration) {
            setIsPlaying(false);
            return 0;
          }
          return newProgress;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, currentEpisode]);

  // Play an episode
  const playEpisode = (episode: Episode) => {
    setCurrentEpisode(episode);
    setIsPlaying(true);
    setProgress(0);
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (currentEpisode) {
      setIsPlaying(!isPlaying);
    }
  };

  // Seek to a specific position
  const seekTo = (seconds: number) => {
    if (currentEpisode && seconds >= 0 && seconds <= currentEpisode.duration) {
      setProgress(seconds);
    }
  };

  // Skip forward 30 seconds
  const skipForward = () => {
    if (currentEpisode) {
      const newProgress = Math.min(progress + 30, currentEpisode.duration);
      setProgress(newProgress);
    }
  };

  // Skip backward 15 seconds
  const skipBackward = () => {
    if (currentEpisode) {
      const newProgress = Math.max(progress - 15, 0);
      setProgress(newProgress);
    }
  };

  // Set volume (0-1)
  const changeVolume = (value: number) => {
    if (value >= 0 && value <= 1) {
      setVolume(value);
    }
  };

  return {
    currentEpisode,
    isPlaying,
    progress,
    volume,
    playEpisode,
    togglePlay,
    seekTo,
    skipForward,
    skipBackward,
    changeVolume,
    formatTime: (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    },
  };
}