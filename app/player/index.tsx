import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Slider, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/ui/Typography';
import { ChevronDown, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Download, Share, Heart } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import useMockPlayer from '@/hooks/useMockPlayer';

export default function PlayerScreen() {
  const router = useRouter();
  const player = useMockPlayer();
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Handle navigation when no episode is playing
  useEffect(() => {
    if (!player.currentEpisode) {
      router.replace('/(tabs)');
    }
  }, [player.currentEpisode]);

  // If no episode is playing, return null instead of navigating immediately
  if (!player.currentEpisode) {
    return null;
  }

  // Handle close
  const handleClose = () => {
    router.back();
  };

  // Toggle mute
  const toggleMute = () => {
    if (isMuted) {
      player.changeVolume(0.8);
    } else {
      player.changeVolume(0);
    }
    setIsMuted(!isMuted);
  };

  // Toggle like
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleClose}
        >
          <ChevronDown size={24} color={Colors.neutral[800]} />
        </TouchableOpacity>
        <Typography variant="h4" style={styles.headerTitle}>
          Now Playing
        </Typography>
        <View style={styles.placeholder} />
      </View>

      {/* Cover Art */}
      <View style={styles.coverContainer}>
        <Image
          source={{ uri: player.currentEpisode.imageUrl }}
          style={styles.coverImage}
        />
      </View>

      {/* Episode Info */}
      <View style={styles.infoContainer}>
        <Typography variant="h3" style={styles.episodeTitle}>
          {player.currentEpisode.title}
        </Typography>
        <Typography variant="bodyMedium" color={Colors.neutral[600]}>
          {player.currentEpisode.podcastTitle}
        </Typography>
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <Slider
          value={player.progress}
          maximumValue={player.currentEpisode.duration}
          minimumTrackTintColor={Colors.primary[500]}
          maximumTrackTintColor={Colors.neutral[300]}
          thumbTintColor={Colors.primary[500]}
          style={styles.slider}
          onSlidingComplete={player.seekTo}
        />
        <View style={styles.timeContainer}>
          <Typography variant="caption" color={Colors.neutral[600]}>
            {player.formatTime(player.progress)}
          </Typography>
          <Typography variant="caption" color={Colors.neutral[600]}>
            {player.formatTime(player.currentEpisode.duration)}
          </Typography>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.secondaryControlButton}
          onPress={player.skipBackward}
        >
          <SkipBack size={24} color={Colors.neutral[800]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.primaryControlButton}
          onPress={player.togglePlay}
        >
          {player.isPlaying ? (
            <Pause size={32} color={Colors.neutral[50]} />
          ) : (
            <Play size={32} color={Colors.neutral[50]} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryControlButton}
          onPress={player.skipForward}
        >
          <SkipForward size={24} color={Colors.neutral[800]} />
        </TouchableOpacity>
      </View>

      {/* Volume Control */}
      <View style={styles.volumeContainer}>
        <TouchableOpacity
          style={styles.muteButton}
          onPress={toggleMute}
        >
          {isMuted ? (
            <VolumeX size={20} color={Colors.neutral[600]} />
          ) : (
            <Volume2 size={20} color={Colors.neutral[600]} />
          )}
        </TouchableOpacity>
        <Slider
          value={player.volume}
          maximumValue={1}
          minimumTrackTintColor={Colors.primary[500]}
          maximumTrackTintColor={Colors.neutral[300]}
          thumbTintColor={Colors.primary[500]}
          style={styles.volumeSlider}
          onValueChange={player.changeVolume}
        />
      </View>

      {/* Additional Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={toggleLike}
        >
          <Heart
            size={24}
            color={isLiked ? Colors.error[500] : Colors.neutral[600]}
            fill={isLiked ? Colors.error[500] : 'none'}
          />
          <Typography
            variant="caption"
            color={isLiked ? Colors.error[500] : Colors.neutral[600]}
            style={styles.actionText}
          >
            Like
          </Typography>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Download size={24} color={Colors.neutral[600]} />
          <Typography
            variant="caption"
            color={Colors.neutral[600]}
            style={styles.actionText}
          >
            Download
          </Typography>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Share size={24} color={Colors.neutral[600]} />
          <Typography
            variant="caption"
            color={Colors.neutral[600]}
            style={styles.actionText}
          >
            Share
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Layout.spacing.m,
    paddingTop: Platform.OS === 'android' ? 40 : Layout.spacing.xl,
    paddingBottom: Layout.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.l,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  headerTitle: {
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  coverContainer: {
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  coverImage: {
    width: '80%',
    aspectRatio: 1,
    borderRadius: Layout.borderRadius.l,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  episodeTitle: {
    textAlign: 'center',
    marginBottom: Layout.spacing.xs,
  },
  progressContainer: {
    marginBottom: Layout.spacing.xl,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  primaryControlButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Layout.spacing.l,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  secondaryControlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  muteButton: {
    marginRight: Layout.spacing.s,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  volumeSlider: {
    flex: 1,
    height: 40,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  actionText: {
    marginTop: Layout.spacing.xs,
  },
});