import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Download, BookOpen, Heart, Settings, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { LANGUAGES, REGIONS, CATEGORIES, DEFAULT_USER_PREFERENCES, PODCASTS } from '@/data/mockData';
import PodcastCard from '@/components/podcast/PodcastCard';
import MiniPlayer from '@/components/player/MiniPlayer';
import useMockPlayer from '@/hooks/useMockPlayer';

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'downloads' | 'favorites'>('subscriptions');
  const player = useMockPlayer();

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    preferences: DEFAULT_USER_PREFERENCES,
  };

  // Get language, region, and genre names from preferences
  const getPreferenceNames = (type: 'languages' | 'regions' | 'genres') => {
    const preferenceIds = user.preferences[type];
    
    const sourceData = type === 'languages' 
      ? LANGUAGES 
      : type === 'regions' 
        ? REGIONS 
        : CATEGORIES;
    
    return preferenceIds
      .map(id => sourceData.find(item => item.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              <Typography variant="h1" color={Colors.neutral[50]}>
                {user.name.charAt(0)}
              </Typography>
            </View>
            <View style={styles.userInfo}>
              <Typography variant="h2">{user.name}</Typography>
              <Typography variant="body" color={Colors.neutral[600]}>
                {user.email}
              </Typography>
            </View>
          </View>
          
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color={Colors.neutral[700]} />
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <Card variant="elevated" style={styles.preferencesCard}>
          <Typography variant="h3" style={styles.cardTitle}>
            Your Preferences
          </Typography>
          
          <View style={styles.preference}>
            <Typography variant="bodyMedium">Languages</Typography>
            <Typography variant="body" color={Colors.neutral[600]}>
              {getPreferenceNames('languages')}
            </Typography>
          </View>
          
          <View style={styles.preference}>
            <Typography variant="bodyMedium">Regions</Typography>
            <Typography variant="body" color={Colors.neutral[600]}>
              {getPreferenceNames('regions')}
            </Typography>
          </View>
          
          <View style={styles.preference}>
            <Typography variant="bodyMedium">Genres</Typography>
            <Typography variant="body" color={Colors.neutral[600]}>
              {getPreferenceNames('genres')}
            </Typography>
          </View>
          
          <TouchableOpacity style={styles.editButton}>
            <Typography 
              variant="bodyMedium" 
              color={Colors.primary[500]}
            >
              Edit Preferences
            </Typography>
            <ChevronRight size={16} color={Colors.primary[500]} style={styles.chevron} />
          </TouchableOpacity>
        </Card>

        {/* Content Tabs */}
        <Card variant="elevated" padding="none" style={styles.tabsCard}>
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'subscriptions' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('subscriptions')}
            >
              <BookOpen 
                size={18} 
                color={
                  activeTab === 'subscriptions'
                    ? Colors.primary[500]
                    : Colors.neutral[600]
                } 
                style={styles.tabIcon}
              />
              <Typography
                variant={activeTab === 'subscriptions' ? 'bodyMedium' : 'body'}
                color={
                  activeTab === 'subscriptions'
                    ? Colors.primary[500]
                    : Colors.neutral[600]
                }
              >
                Subscribed
              </Typography>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'downloads' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('downloads')}
            >
              <Download 
                size={18} 
                color={
                  activeTab === 'downloads'
                    ? Colors.primary[500]
                    : Colors.neutral[600]
                } 
                style={styles.tabIcon}
              />
              <Typography
                variant={activeTab === 'downloads' ? 'bodyMedium' : 'body'}
                color={
                  activeTab === 'downloads'
                    ? Colors.primary[500]
                    : Colors.neutral[600]
                }
              >
                Downloads
              </Typography>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'favorites' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('favorites')}
            >
              <Heart 
                size={18} 
                color={
                  activeTab === 'favorites'
                    ? Colors.primary[500]
                    : Colors.neutral[600]
                } 
                style={styles.tabIcon}
              />
              <Typography
                variant={activeTab === 'favorites' ? 'bodyMedium' : 'body'}
                color={
                  activeTab === 'favorites'
                    ? Colors.primary[500]
                    : Colors.neutral[600]
                }
              >
                Favorites
              </Typography>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Content based on active tab */}
        <View style={styles.tabContent}>
          {activeTab === 'subscriptions' && (
            <>
              <Typography variant="h3" style={styles.contentTitle}>
                Subscribed Podcasts
              </Typography>
              {PODCASTS.slice(0, 3).map((podcast) => (
                <PodcastCard key={podcast.id} podcast={podcast} />
              ))}
            </>
          )}
          
          {activeTab === 'downloads' && (
            <>
              <Typography variant="h3" style={styles.contentTitle}>
                Downloaded Episodes
              </Typography>
              <View style={styles.emptyState}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/7647973/pexels-photo-7647973.jpeg' }}
                  style={styles.emptyStateImage}
                />
                <Typography variant="h4" style={styles.emptyStateTitle}>
                  No downloads yet
                </Typography>
                <Typography
                  variant="body"
                  color={Colors.neutral[600]}
                  style={styles.emptyStateText}
                >
                  Download episodes to listen offline. They'll appear here.
                </Typography>
              </View>
            </>
          )}
          
          {activeTab === 'favorites' && (
            <>
              <Typography variant="h3" style={styles.contentTitle}>
                Favorite Episodes
              </Typography>
              <View style={styles.emptyState}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/7648472/pexels-photo-7648472.jpeg' }}
                  style={styles.emptyStateImage}
                />
                <Typography variant="h4" style={styles.emptyStateTitle}>
                  No favorites yet
                </Typography>
                <Typography
                  variant="body"
                  color={Colors.neutral[600]}
                  style={styles.emptyStateText}
                >
                  Heart the episodes you love and they'll be saved here.
                </Typography>
              </View>
            </>
          )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Layout.spacing.m,
    paddingTop: Platform.OS === 'android' ? 60 : Layout.spacing.xl,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: Layout.spacing.m,
  },
  settingsButton: {
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
  preferencesCard: {
    margin: Layout.spacing.m,
  },
  cardTitle: {
    marginBottom: Layout.spacing.m,
  },
  preference: {
    marginBottom: Layout.spacing.m,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: Layout.spacing.s,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  chevron: {
    marginLeft: Layout.spacing.xs,
  },
  tabsCard: {
    marginHorizontal: Layout.spacing.m,
    borderRadius: Layout.borderRadius.m,
    overflow: 'hidden',
  },
  tabsContainer: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Layout.spacing.m,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  tabIcon: {
    marginRight: Layout.spacing.xs,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary[500],
  },
  tabContent: {
    padding: Layout.spacing.m,
  },
  contentTitle: {
    marginBottom: Layout.spacing.m,
  },
  emptyState: {
    alignItems: 'center',
    padding: Layout.spacing.xl,
  },
  emptyStateImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: Layout.spacing.l,
  },
  emptyStateTitle: {
    marginBottom: Layout.spacing.s,
    textAlign: 'center',
  },
  emptyStateText: {
    textAlign: 'center',
    maxWidth: 250,
  },
});