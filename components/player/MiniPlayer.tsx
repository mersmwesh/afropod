import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/ui/Typography';
import { Play, Pause, SkipForward, X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Episode } from '@/types/podcast';

interface MiniPlayerProps {
  episode: Episode | null;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onSkipForward: () => void;
  onClose: () => void;
}

export function MiniPlayer({
  episode,
  isPlaying,
  onPlay,
  onPause,
  onSkipForward,
  onClose,
}: MiniPlayerProps) {
  const router = useRouter();

  if (!episode) return null;

  // Handle navigation to full player
  const handlePress = () => {
    router.push('/player');
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <Image 
        source={{ uri: episode.imageUrl }} 
        style={styles.image} 
      />
      
      <View style={styles.infoContainer}>
        <Typography 
          variant="bodyMedium" 
          color={Colors.neutral[50]} 
          numberOfLines={1}
        >
          {episode.title}
        </Typography>
        <Typography 
          variant="caption" 
          color={Colors.neutral[300]} 
          numberOfLines={1}
        >
          {episode.podcastTitle}
        </Typography>
      </View>
      
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={isPlaying ? onPause : onPlay}
        >
          {isPlaying ? (
            <Pause size={20} color={Colors.neutral[50]} />
          ) : (
            <Play size={20} color={Colors.neutral[50]} />
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.controlButton}
          onPress={onSkipForward}
        >
          <SkipForward size={20} color={Colors.neutral[50]} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        >
          <X size={20} color={Colors.neutral[400]} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: Colors.neutral[800],
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.s,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[700],
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: Layout.borderRadius.s,
    marginRight: Layout.spacing.m,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    padding: Layout.spacing.s,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  closeButton: {
    padding: Layout.spacing.s,
    marginLeft: Layout.spacing.xs,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
});

export default MiniPlayer;