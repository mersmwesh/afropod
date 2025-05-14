import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Play, Heart } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Podcast } from '@/types/podcast';

interface PodcastCardProps {
  podcast: Podcast;
  horizontal?: boolean;
}

export function PodcastCard({ podcast, horizontal = false }: PodcastCardProps) {
  const router = useRouter();

  // Handle navigation to podcast details
  const handlePress = () => {
    router.push(`/podcast/${podcast.id}`);
  };

  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.8}
      style={[
        styles.container, 
        horizontal ? styles.horizontalContainer : null
      ]}
    >
      <Card
        variant="elevated"
        padding="none"
        style={horizontal ? styles.horizontalCard : styles.card}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: podcast.coverImage }}
            style={horizontal ? styles.horizontalImage : styles.image}
            resizeMode="cover"
          />
          <View style={styles.playButton}>
            <Play size={18} color={Colors.neutral[50]} />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Typography 
              variant="h4" 
              numberOfLines={horizontal ? 1 : 2}
              style={horizontal ? styles.horizontalTitle : {}}
            >
              {podcast.title}
            </Typography>
            <TouchableOpacity style={styles.favoriteButton}>
              <Heart 
                size={20} 
                color={Colors.neutral[500]} 
                strokeWidth={1.5}
              />
            </TouchableOpacity>
          </View>
          <Typography 
            variant="body" 
            numberOfLines={horizontal ? 1 : 2} 
            color={Colors.subtext}
          >
            {podcast.creator}
          </Typography>
          <View style={styles.infoContainer}>
            <View style={styles.tagContainer}>
              <View style={styles.languageTag}>
                <Typography variant="caption" color={Colors.secondary[700]}>
                  {podcast.language}
                </Typography>
              </View>
              {podcast.tags && podcast.tags.length > 0 && (
                <View style={styles.categoryTag}>
                  <Typography variant="caption" color={Colors.primary[700]}>
                    {podcast.tags[0]}
                  </Typography>
                </View>
              )}
            </View>
            <Typography variant="caption" color={Colors.subtext}>
              {podcast.totalEpisodes} episodes
            </Typography>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: Layout.spacing.m,
  },
  horizontalContainer: {
    width: 280,
    marginRight: Layout.spacing.m,
  },
  card: {
    width: '100%',
  },
  horizontalCard: {
    width: '100%',
    flexDirection: 'column',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    borderTopLeftRadius: Layout.borderRadius.m,
    borderTopRightRadius: Layout.borderRadius.m,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  horizontalImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 16/9,
  },
  playButton: {
    position: 'absolute',
    bottom: Layout.spacing.m,
    right: Layout.spacing.m,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  contentContainer: {
    padding: Layout.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Layout.spacing.xs,
  },
  horizontalTitle: {
    width: '85%',
  },
  favoriteButton: {
    padding: Layout.spacing.xs,
    marginRight: -Layout.spacing.xs,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  infoContainer: {
    marginTop: Layout.spacing.s,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
  },
  languageTag: {
    backgroundColor: Colors.secondary[100],
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.s,
    marginRight: Layout.spacing.xs,
  },
  categoryTag: {
    backgroundColor: Colors.primary[100],
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.s,
  },
});

export default PodcastCard;