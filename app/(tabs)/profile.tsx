import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Download, BookOpen, Heart, Settings, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { LANGUAGES, REGIONS, CATEGORIES, PODCASTS } from '@/data/mockData';
import PodcastCard from '@/components/podcast/PodcastCard';
import MiniPlayer from '@/components/player/MiniPlayer';
import { PreferenceSelector } from '@/components/profile/PreferenceSelector';
import useMockPlayer from '@/hooks/useMockPlayer';
import { useUserProfile } from '@/hooks/useUserProfile';

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'downloads' | 'favorites'>('subscriptions');
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const player = useMockPlayer();
  const router = useRouter();
  const { user, updatePreferences } = useUserProfile();

  // Get subscribed podcasts
  const subscribedPodcasts = PODCASTS.filter(podcast => 
    user.subscribedPodcasts.includes(podcast.id)
  );

  // Handle preference updates
  const handlePreferenceUpdate = (
    type: 'languages' | 'regions' | 'genres',
    values: string[]
  ) => {
    updatePreferences(type, values);
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
          
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => router.push('/settings')}
          >
            <Settings size={24} color={Colors.neutral[700]} />
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        {isEditingPreferences ? (
          <View style={styles.preferencesContainer}>
            <PreferenceSelector
              title="Languages"
              items={LANGUAGES}
              selectedIds={user.preferences.languages}
              onSelect={(ids) => handlePreferenceUpdate('languages', ids)}
            />
            
            <PreferenceSelector
              title="Regions"
              items={REGIONS}
              selectedIds={user.preferences.regions}
              onSelect={(ids) => handlePreferenceUpdate('regions', ids)}
            />
            
            <PreferenceSelector
              title="Genres"
              items={CATEGORIES}
              selectedIds={user.preferences.genres}
              onSelect={(ids) => handlePreferenceUpdate('genres', ids)}
            />
            
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setIsEditingPreferences(false)}
            >
              <Typography variant="bodyMedium" color={Colors.primary[500]}>
                Done
              </Typography>
            </TouchableOpacity>
          </View>
        ) : (
          <Card variant="elevated" style={styles.preferencesCard}>
            <Typography variant="h3" style={styles.cardTitle}>
              Your Preferences
            </Typography>
            
            <View style={styles.preference}>
              <Typography variant="bodyMedium">Languages</Typography>
              <Typography variant="body" color={Colors.neutral[600]}>
                {LANGUAGES.filter(lang => 
                  user.preferences.languages.includes(lang.id)
                ).map(lang => lang.name).join(', ')}
              </Typography>
            </View>
            
            <View style={styles.preference}>
              <Typography variant="bodyMedium">Regions</Typography>
              <Typography variant="body" color={Colors.neutral[600]}>
                {REGIONS.filter(region => 
                  user.preferences.regions.includes(region.id)
                ).map(region => region.name).join(', ')}
              </Typography>
            </View>
            
            <View style={styles.preference}>
              <Typography variant="bodyMedium">Genres</Typography>
              <Typography variant="body" color={Colors.neutral[600]}>
                {CATEGORIES.filter(category => 
                  user.preferences.genres.includes(category.id)
                ).map(category => category.name).join(', ')}
              </Typography>
            </View>
            
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => setIsEditingPreferences(true)}
            >
              <Typography 
                variant="bodyMedium" 
                color={Colors.primary[500]}
              >
                Edit Preferences
              </Typography>
              <ChevronRight size={16} color={Colors.primary[500]} style={styles.chevron} />
            </TouchableOpacity>
          </Card>
        )}

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
              {subscribedPodcasts.length > 0 ? (
                subscribedPodcasts.map((podcast) => (
                  <PodcastCard key={podcast.id} podcast={podcast} />
                ))
              ) : (
                <Card variant="elevated" style={styles.emptyState}>
                  <Typography variant="h4" style={styles.emptyStateTitle}>
                    No subscriptions yet
                  </Typography>
                  <Typography
                    variant="body"
                    color={Colors.neutral[600]}
                    style={styles.emptyStateText}
                  >
                    Subscribe to podcasts to see them here and get notified about new episodes.
                  </Typography>
                </Card>
              )}
            </>
          )}
          
          {activeTab === 'downloads' && (
            <>
              <Typography variant="h3" style={styles.contentTitle}>
                Downloaded Episodes
              </Typography>
              <Card variant="elevated" style={styles.emptyState}>
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
              </Card>
            </>
          )}
          
          {activeTab === 'favorites' && (
            <>
              <Typography variant="h3" style={styles.contentTitle}>
                Favorite Episodes
              </Typography>
              <Card variant="elevated" style={styles.emptyState}>
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
              </Card>
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
  preferencesContainer: {
    padding: Layout.spacing.m,
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
  doneButton: {
    alignSelf: 'flex-end',
    padding: Layout.spacing.s,
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
  emptyStateTitle: {
    marginBottom: Layout.spacing.s,
    textAlign: 'center',
  },
  emptyStateText: {
    textAlign: 'center',
    maxWidth: 250,
  },
});