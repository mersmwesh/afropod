import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import EpisodeItem from '@/components/podcast/EpisodeItem';
import MiniPlayer from '@/components/player/MiniPlayer';
import { Heart, ChevronLeft, Star, Share, Download } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { PODCASTS, EPISODES, REVIEWS } from '@/data/mockData';
import useMockPlayer from '@/hooks/useMockPlayer';
import { Episode } from '@/types/podcast';

export default function PodcastDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const player = useMockPlayer();
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // Find podcast data
  const podcast = PODCASTS.find((p) => p.id === id);
  
  // Find episodes for this podcast
  const podcastEpisodes = EPISODES.filter((e) => e.podcastId === id);
  
  // Average rating calculation
  const podcastReviews = REVIEWS.filter((r) => r.podcastId === id);
  const averageRating = podcastReviews.length > 0
    ? podcastReviews.reduce((acc, review) => acc + review.rating, 0) / podcastReviews.length
    : 0;
  
  if (!podcast) {
    return (
      <View style={styles.containerCenter}>
        <Typography variant="h3">Podcast not found</Typography>
        <Button 
          title="Go Back" 
          variant="primary" 
          onPress={() => router.back()} 
          style={styles.backButton}
        />
      </View>
    );
  }

  // Handle episode play
  const handlePlayEpisode = (episode: Episode) => {
    player.playEpisode(episode);
  };
  
  // Handle episode download
  const handleDownloadEpisode = (episode: Episode) => {
    console.log('Download episode:', episode.id);
  };
  
  // Handle episode options
  const handleEpisodeOptions = (episode: Episode) => {
    console.log('Episode options:', episode.id);
  };
  
  // Toggle subscription
  const toggleSubscription = () => {
    setIsSubscribed(!isSubscribed);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color={Colors.neutral[800]} />
          </TouchableOpacity>
        </View>
        
        {/* Podcast Info */}
        <View style={styles.podcastInfo}>
          <Image 
            source={{ uri: podcast.coverImage }} 
            style={styles.podcastImage} 
          />
          
          <View style={styles.infoContainer}>
            <Typography variant="h2" style={styles.podcastTitle}>
              {podcast.title}
            </Typography>
            
            <Typography variant="bodyMedium" color={Colors.neutral[700]}>
              {podcast.creator}
            </Typography>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Star 
                  size={16} 
                  color={Colors.primary[500]} 
                  fill={Colors.primary[500]} 
                  style={styles.statIcon} 
                />
                <Typography variant="body" color={Colors.neutral[700]}>
                  {averageRating.toFixed(1)}
                </Typography>
              </View>
              
              <View style={styles.statItem}>
                <Typography variant="body" color={Colors.neutral[700]}>
                  {podcast.totalEpisodes} episodes
                </Typography>
              </View>
              
              <View style={styles.languageTag}>
                <Typography variant="caption" color={Colors.secondary[700]}>
                  {podcast.language}
                </Typography>
              </View>
            </View>
            
            <View style={styles.actionButtons}>
              <Button
                title={isSubscribed ? "Subscribed" : "Subscribe"}
                variant={isSubscribed ? "outline" : "primary"}
                size="medium"
                onPress={toggleSubscription}
                style={styles.subscribeButton}
              />
              
              <TouchableOpacity style={styles.iconButton}>
                <Share size={20} color={Colors.neutral[700]} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.iconButton}>
                <Heart size={20} color={Colors.neutral[700]} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        {/* Description */}
        <Card variant="elevated" style={styles.descriptionCard}>
          <Typography variant="h3" style={styles.sectionTitle}>
            About this podcast
          </Typography>
          <Typography variant="body" color={Colors.neutral[700]}>
            {podcast.description}
          </Typography>
        </Card>
        
        {/* Episodes */}
        <Card variant="elevated" style={styles.episodesCard}>
          <Typography variant="h3" style={styles.sectionTitle}>
            Episodes
          </Typography>
          
          {podcastEpisodes.map((episode) => (
            <EpisodeItem
              key={episode.id}
              episode={episode}
              onPlay={handlePlayEpisode}
              onDownload={handleDownloadEpisode}
              onOptions={handleEpisodeOptions}
            />
          ))}
        </Card>
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
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.m,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Layout.spacing.m,
    paddingTop: Platform.OS === 'android' ? 40 : Layout.spacing.xl,
    paddingBottom: Layout.spacing.m,
  },
  backButton: {
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
  podcastInfo: {
    paddingHorizontal: Layout.spacing.m,
    marginBottom: Layout.spacing.l,
  },
  podcastImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: Layout.borderRadius.m,
    marginBottom: Layout.spacing.m,
  },
  infoContainer: {
    width: '100%',
  },
  podcastTitle: {
    marginBottom: Layout.spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: Layout.spacing.s,
    marginBottom: Layout.spacing.m,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.m,
    marginBottom: Layout.spacing.xs,
  },
  statIcon: {
    marginRight: Layout.spacing.xs,
  },
  languageTag: {
    backgroundColor: Colors.secondary[100],
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.s,
    marginBottom: Layout.spacing.xs,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subscribeButton: {
    flex: 1,
    marginRight: Layout.spacing.m,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Layout.spacing.s,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  descriptionCard: {
    marginHorizontal: Layout.spacing.m,
    marginBottom: Layout.spacing.m,
  },
  episodesCard: {
    marginHorizontal: Layout.spacing.m,
    marginBottom: Layout.spacing.xl,
  },
  sectionTitle: {
    marginBottom: Layout.spacing.m,
  },
});