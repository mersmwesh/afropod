import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, SafeAreaView, Platform, FlatList, TouchableOpacity } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Play, SkipForward } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { EPISODES } from '@/data/mockData';
import useMockPlayer from '@/hooks/useMockPlayer';
import MiniPlayer from '@/components/player/MiniPlayer';

// Short audio clip type for the "For You" feed
interface AudioClip {
  id: string;
  title: string;
  podcastTitle: string;
  duration: number;
  imageUrl: string;
  audioUrl: string;
  episode: typeof EPISODES[0];
}

// Generate mock clips from episodes
const generateMockClips = (): AudioClip[] => {
  return EPISODES.flatMap(episode => {
    // Create 2-3 clips per episode
    const clips = [];
    const clipCount = Math.floor(Math.random() * 2) + 2; // 2-3 clips
    
    for (let i = 0; i < clipCount; i++) {
      clips.push({
        id: `${episode.id}-clip-${i+1}`,
        title: `${episode.title} - Highlight ${i+1}`,
        podcastTitle: episode.podcastTitle,
        duration: Math.floor(Math.random() * 60) + 30, // 30-90 seconds
        imageUrl: episode.imageUrl,
        audioUrl: episode.audioUrl,
        episode: episode,
      });
    }
    
    return clips;
  }).sort(() => Math.random() - 0.5); // Shuffle clips
};

const AUDIO_CLIPS = generateMockClips();

export default function ForYouScreen() {
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const player = useMockPlayer();
  
  const currentClip = AUDIO_CLIPS[currentClipIndex];
  
  // Play the current clip's full episode
  const playFullEpisode = () => {
    if (currentClip) {
      player.playEpisode(currentClip.episode);
    }
  };
  
  // Play next clip
  const playNextClip = () => {
    setCurrentClipIndex((prev) => 
      prev < AUDIO_CLIPS.length - 1 ? prev + 1 : 0
    );
  };

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
            <Typography variant="caption" color={Colors.neutral[500]}>
              AI-selected clips for you
            </Typography>
          </View>
          
          <View style={styles.currentClip}>
            <ImageBackground
              source={{ uri: currentClip.imageUrl }}
              style={styles.clipImage}
              imageStyle={styles.clipImageStyle}
            >
              <View style={styles.clipControls}>
                <TouchableOpacity 
                  style={styles.playButton}
                  onPress={playFullEpisode}
                >
                  <Play size={24} color={Colors.neutral[50]} />
                  <Typography variant="bodyMedium" color={Colors.neutral[50]}>
                    Full Episode
                  </Typography>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.skipButton}
                  onPress={playNextClip}
                >
                  <SkipForward size={20} color={Colors.neutral[800]} />
                </TouchableOpacity>
              </View>
            </ImageBackground>
            
            <View style={styles.clipDetails}>
              <Typography variant="h4">{currentClip.title}</Typography>
              <Typography variant="bodyMedium" color={Colors.neutral[600]}>
                {currentClip.podcastTitle}
              </Typography>
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
  currentClip: {
    borderRadius: Layout.borderRadius.m,
    overflow: 'hidden',
    backgroundColor: Colors.neutral[100],
  },
  clipImage: {
    height: 200,
    justifyContent: 'flex-end',
  },
  clipImageStyle: {
    borderTopLeftRadius: Layout.borderRadius.m,
    borderTopRightRadius: Layout.borderRadius.m,
  },
  clipControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Layout.spacing.m,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[500],
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    borderRadius: Layout.borderRadius.m,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
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
  clipDetails: {
    padding: Layout.spacing.m,
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