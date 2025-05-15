import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, SafeAreaView, Platform, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Play, SkipForward, Heart, Share2, Clock, Bookmark, ThumbsUp, ThumbsDown } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { EPISODES } from '@/data/mockData';
import useMockPlayer from '@/hooks/useMockPlayer';
import MiniPlayer from '@/components/player/MiniPlayer';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  interpolate,
  useSharedValue,
  withSequence,
  withTiming 
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Short audio clip type for the "For You" feed
interface AudioClip {
  id: string;
  title: string;
  podcastTitle: string;
  duration: number;
  imageUrl: string;
  audioUrl: string;
  episode: typeof EPISODES[0];
  topics: string[];
  transcript: string;
  highlights: {
    startTime: number;
    endTime: number;
    text: string;
  }[];
}

// Generate mock clips from episodes with enhanced data
const generateMockClips = (): AudioClip[] => {
  return EPISODES.flatMap(episode => {
    const clips = [];
    const clipCount = Math.floor(Math.random() * 2) + 2;
    
    for (let i = 0; i < clipCount; i++) {
      clips.push({
        id: `${episode.id}-clip-${i+1}`,
        title: `${episode.title} - Highlight ${i+1}`,
        podcastTitle: episode.podcastTitle,
        duration: Math.floor(Math.random() * 60) + 30,
        imageUrl: episode.imageUrl,
        audioUrl: episode.audioUrl,
        episode: episode,
        topics: ['Technology', 'Innovation', 'Africa'].sort(() => Math.random() - 0.5).slice(0, 2),
        transcript: "This is a sample transcript of the highlighted moment...",
        highlights: [
          {
            startTime: 30,
            endTime: 45,
            text: "Key moment from the episode..."
          }
        ]
      });
    }
    
    return clips;
  }).sort(() => Math.random() - 0.5);
};

const AUDIO_CLIPS = generateMockClips();

export default function ForYouScreen() {
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [likedClips, setLikedClips] = useState<Set<string>>(new Set());
  const [savedClips, setSavedClips] = useState<Set<string>>(new Set());
  const player = useMockPlayer();
  
  const currentClip = AUDIO_CLIPS[currentClipIndex];
  const likeScale = useSharedValue(1);
  const saveScale = useSharedValue(1);
  
  // Play the current clip's full episode
  const playFullEpisode = () => {
    if (currentClip) {
      player.playEpisode(currentClip.episode);
    }
  };
  
  // Play next clip with animation
  const playNextClip = () => {
    setCurrentClipIndex((prev) => 
      prev < AUDIO_CLIPS.length - 1 ? prev + 1 : 0
    );
  };

  // Handle like animation and state
  const handleLike = useCallback(() => {
    const clipId = currentClip.id;
    setLikedClips(prev => {
      const newSet = new Set(prev);
      if (prev.has(clipId)) {
        newSet.delete(clipId);
      } else {
        newSet.add(clipId);
        likeScale.value = withSequence(
          withSpring(1.2),
          withSpring(1)
        );
      }
      return newSet;
    });
  }, [currentClip, likeScale]);

  // Handle save animation and state
  const handleSave = useCallback(() => {
    const clipId = currentClip.id;
    setSavedClips(prev => {
      const newSet = new Set(prev);
      if (prev.has(clipId)) {
        newSet.delete(clipId);
      } else {
        newSet.add(clipId);
        saveScale.value = withSequence(
          withSpring(1.2),
          withSpring(1)
        );
      }
      return newSet;
    });
  }, [currentClip, saveScale]);

  const likeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: likeScale.value }]
  }));

  const saveAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: saveScale.value }]
  }));

  // Render a clip item
  const renderClipItem = ({ item, index }: { item: AudioClip; index: number }) => (
    <TouchableOpacity
      style={[
        styles.clipItem,
        index === currentClipIndex && styles.clipItemActive,
      ]}
      onPress={() => setCurrentClipIndex(index)}
      activeOpacity={0.7}
    >
      <View style={styles.clipIndex}>
        <Typography
          variant="bodyMedium"
          color={index === currentClipIndex ? Colors.primary[500] : Colors.neutral[500]}
        >
          {index + 1}
        </Typography>
      </View>
      <View style={styles.clipInfo}>
        <Typography variant="bodyMedium" numberOfLines={1}>
          {item.title}
        </Typography>
        <Typography variant="caption" color={Colors.neutral[600]} numberOfLines={1}>
          {item.podcastTitle} · {Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, '0')}
        </Typography>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <ImageBackground
          source={{ uri: 'https://images.pexels.com/photos/6953878/pexels-photo-6953878.jpeg' }}
          style={styles.headerBanner}
        >
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContent}>
              <Typography variant="h1" color={Colors.neutral[50]}>
                For You
              </Typography>
            </View>
          </SafeAreaView>
        </ImageBackground>

        {/* Current Clip Player */}
        <Card variant="elevated" style={styles.playerCard}>
          <View style={styles.playerHeader}>
            <Typography variant="h3">Now Playing</Typography>
            <View style={styles.topicsContainer}>
              {currentClip.topics.map((topic, index) => (
                <View key={index} style={styles.topicTag}>
                  <Typography variant="caption" color={Colors.secondary[700]}>
                    {topic}
                  </Typography>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.currentClip}>
            <ImageBackground
              source={{ uri: currentClip.imageUrl }}
              style={styles.clipImage}
              imageStyle={styles.clipImageStyle}
            >
              <View style={styles.clipControls}>
                <View style={styles.controlsRow}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => {}}
                  >
                    <ThumbsDown size={24} color={Colors.neutral[50]} />
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.playButton}
                    onPress={playFullEpisode}
                  >
                    <Play size={32} color={Colors.neutral[50]} />
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => {}}
                  >
                    <ThumbsUp size={24} color={Colors.neutral[50]} />
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
            
            <View style={styles.clipDetails}>
              <View style={styles.titleRow}>
                <Typography variant="h4" style={styles.clipTitle}>
                  {currentClip.title}
                </Typography>
                <TouchableOpacity 
                  style={styles.skipButton}
                  onPress={playNextClip}
                >
                  <SkipForward size={20} color={Colors.neutral[800]} />
                </TouchableOpacity>
              </View>

              <Typography variant="bodyMedium" color={Colors.neutral[600]} style={styles.podcastTitle}>
                {currentClip.podcastTitle}
              </Typography>

              <View style={styles.highlightContainer}>
                <Typography variant="caption" color={Colors.neutral[500]} style={styles.transcriptLabel}>
                  Transcript Highlight
                </Typography>
                <Typography variant="body" color={Colors.neutral[700]} style={styles.transcriptText}>
                  {currentClip.highlights[0].text}
                </Typography>
              </View>

              <View style={styles.actionsContainer}>
                <Animated.View style={likeAnimatedStyle}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={handleLike}
                  >
                    <Heart 
                      size={24} 
                      color={likedClips.has(currentClip.id) ? Colors.error[500] : Colors.neutral[600]}
                      fill={likedClips.has(currentClip.id) ? Colors.error[500] : 'none'}
                    />
                  </TouchableOpacity>
                </Animated.View>

                <Animated.View style={saveAnimatedStyle}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={handleSave}
                  >
                    <Bookmark 
                      size={24} 
                      color={savedClips.has(currentClip.id) ? Colors.primary[500] : Colors.neutral[600]}
                      fill={savedClips.has(currentClip.id) ? Colors.primary[500] : 'none'}
                    />
                  </TouchableOpacity>
                </Animated.View>

                <TouchableOpacity style={styles.actionButton}>
                  <Share2 size={24} color={Colors.neutral[600]} />
                </TouchableOpacity>

                <View style={styles.durationContainer}>
                  <Clock size={16} color={Colors.neutral[500]} style={styles.durationIcon} />
                  <Typography variant="caption" color={Colors.neutral[500]}>
                    {Math.floor(currentClip.duration / 60)}:{(currentClip.duration % 60).toString().padStart(2, '0')}
                  </Typography>
                </View>
              </View>
            </View>
          </View>
        </Card>

        {/* Up Next */}
        <View style={styles.upNextSection}>
          <Typography variant="h3" style={styles.upNextTitle}>
            Up Next
          </Typography>
          
          <FlatList
            data={AUDIO_CLIPS}
            keyExtractor={(item) => item.id}
            renderItem={renderClipItem}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      {/* Mini Player */}
      {player.currentEpisode && (
        <MiniPlayer
          episode={player.currentEpisode}
          isPlaying={player.isPlaying}
          onPlay={player.togglePlay}
          onPause={player.togglePlay}
          onSkipForward={player.skipForward}
          onClose={() => {
            // Would normally stop playback and close
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  headerBanner: {
    height: 180,
    width: '100%',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerContent: {
    flex: 1,
    paddingHorizontal: Layout.spacing.m,
    paddingTop: Platform.OS === 'android' ? 40 : 0,
    justifyContent: 'center',
  },
  playerCard: {
    margin: Layout.spacing.m,
  },
  playerHeader: {
    marginBottom: Layout.spacing.m,
  },
  topicsContainer: {
    flexDirection: 'row',
    marginTop: Layout.spacing.s,
  },
  topicTag: {
    backgroundColor: Colors.secondary[100],
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 4,
    borderRadius: Layout.borderRadius.s,
    marginRight: Layout.spacing.s,
  },
  currentClip: {
    borderRadius: Layout.borderRadius.m,
    overflow: 'hidden',
    backgroundColor: Colors.neutral[100],
  },
  clipImage: {
    height: 300,
    justifyContent: 'flex-end',
  },
  clipImageStyle: {
    borderTopLeftRadius: Layout.borderRadius.m,
    borderTopRightRadius: Layout.borderRadius.m,
  },
  clipControls: {
    padding: Layout.spacing.m,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  clipDetails: {
    padding: Layout.spacing.m,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  clipTitle: {
    flex: 1,
    marginRight: Layout.spacing.m,
  },
  podcastTitle: {
    marginBottom: Layout.spacing.m,
  },
  highlightContainer: {
    backgroundColor: Colors.neutral[100],
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.m,
    marginBottom: Layout.spacing.m,
  },
  transcriptLabel: {
    marginBottom: Layout.spacing.xs,
  },
  transcriptText: {
    fontStyle: 'italic',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Layout.spacing.m,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationIcon: {
    marginRight: Layout.spacing.xs,
  },
  skipButton: {
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
  upNextSection: {
    padding: Layout.spacing.m,
  },
  upNextTitle: {
    marginBottom: Layout.spacing.m,
  },
  clipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  clipItemActive: {
    backgroundColor: Colors.primary[50],
    borderRadius: Layout.borderRadius.m,
    paddingHorizontal: Layout.spacing.s,
  },
  clipIndex: {
    width: 30,
    alignItems: 'center',
  },
  clipInfo: {
    flex: 1,
    marginLeft: Layout.spacing.s,
  },
});