import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, SafeAreaView, Platform } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import { Search } from 'lucide-react-native';
import PodcastCard from '@/components/podcast/PodcastCard';
import CategoriesSlider from '@/components/home/CategoriesSlider';
import MiniPlayer from '@/components/player/MiniPlayer';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { PODCASTS, CATEGORIES } from '@/data/mockData';
import useMockPlayer from '@/hooks/useMockPlayer';

export default function HomeScreen() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const player = useMockPlayer();
  
  // Filter podcasts by category
  const filteredPodcasts = selectedCategoryId
    ? PODCASTS.filter(podcast => 
        podcast.tags?.some(tag => 
          CATEGORIES.find(cat => cat.id === selectedCategoryId)?.name === tag
        )
      )
    : PODCASTS;

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Banner */}
        <ImageBackground
          source={{ uri: 'https://images.pexels.com/photos/3944454/pexels-photo-3944454.jpeg' }}
          style={styles.headerBanner}
        >
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContent}>
              <Typography variant="h1" color={Colors.neutral[50]}>
                AfriPod
              </Typography>
              <View style={styles.searchButton}>
                <Search size={24} color={Colors.neutral[800]} />
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>

        {/* Categories */}
        <CategoriesSlider
          categories={CATEGORIES}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />

        {/* Featured Podcasts */}
        <View style={styles.section}>
          <Typography variant="h2" style={styles.sectionTitle}>
            Featured Podcasts
          </Typography>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {filteredPodcasts.slice(0, 4).map((podcast) => (
              <PodcastCard 
                key={podcast.id} 
                podcast={podcast} 
                horizontal={true}
              />
            ))}
          </ScrollView>
        </View>

        {/* Popular Podcasts */}
        <View style={styles.section}>
          <Typography variant="h2" style={styles.sectionTitle}>
            Popular Podcasts
          </Typography>
          <View style={styles.podcastGrid}>
            {filteredPodcasts.map((podcast) => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </View>
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
    height: 200,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Layout.spacing.m,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  section: {
    marginBottom: Layout.spacing.xl,
  },
  sectionTitle: {
    marginHorizontal: Layout.spacing.m,
    marginBottom: Layout.spacing.m,
  },
  horizontalList: {
    paddingHorizontal: Layout.spacing.m,
  },
  podcastGrid: {
    paddingHorizontal: Layout.spacing.m,
  },
});