import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { MessageSquarePlus } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import DiscussionCard from '@/components/community/DiscussionCard';
import UpcomingEvent from '@/components/community/UpcomingEvent';
import { DISCUSSIONS, LIVE_EVENTS } from '@/data/mockData';
import { Discussion, LiveEvent } from '@/types/community';
import MiniPlayer from '@/components/player/MiniPlayer';
import useMockPlayer from '@/hooks/useMockPlayer';

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState<'discussions' | 'events'>('discussions');
  const player = useMockPlayer();

  const handleDiscussionPress = (discussion: Discussion) => {
    // Navigate to discussion details
    console.log('View discussion:', discussion.id);
  };

  const handleJoinEvent = (event: LiveEvent) => {
    // Join live event
    console.log('Join event:', event.id);
  };

  const handleRemindEvent = (event: LiveEvent) => {
    // Set reminder for event
    console.log('Set reminder for event:', event.id);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <ImageBackground
          source={{ uri: 'https://images.pexels.com/photos/7647920/pexels-photo-7647920.jpeg' }}
          style={styles.headerBanner}
        >
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContent}>
              <Typography variant="h1" color={Colors.neutral[50]}>
                Community
              </Typography>
              <TouchableOpacity style={styles.addButton}>
                <MessageSquarePlus size={24} color={Colors.neutral[800]} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ImageBackground>

        {/* Tabs */}
        <Card variant="elevated" padding="none" style={styles.tabsCard}>
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'discussions' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('discussions')}
            >
              <Typography
                variant={activeTab === 'discussions' ? 'bodyMedium' : 'body'}
                color={
                  activeTab === 'discussions'
                    ? Colors.primary[500]
                    : Colors.neutral[600]
                }
              >
                Discussions
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'events' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('events')}
            >
              <Typography
                variant={activeTab === 'events' ? 'bodyMedium' : 'body'}
                color={
                  activeTab === 'events'
                    ? Colors.primary[500]
                    : Colors.neutral[600]
                }
              >
                Live Q&A Events
              </Typography>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Content */}
        <View style={styles.content}>
          {activeTab === 'discussions' ? (
            <>
              <Typography variant="h3" style={styles.sectionTitle}>
                Popular Discussions
              </Typography>
              {DISCUSSIONS.map((discussion) => (
                <DiscussionCard
                  key={discussion.id}
                  discussion={discussion}
                  onPress={handleDiscussionPress}
                />
              ))}
            </>
          ) : (
            <>
              <Typography variant="h3" style={styles.sectionTitle}>
                Upcoming & Live Events
              </Typography>
              {LIVE_EVENTS.map((event) => (
                <UpcomingEvent
                  key={event.id}
                  event={event}
                  onJoin={handleJoinEvent}
                  onRemind={handleRemindEvent}
                />
              ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  addButton: {
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
  tabsCard: {
    marginHorizontal: Layout.spacing.m,
    marginTop: -Layout.spacing.l,
    borderRadius: Layout.borderRadius.m,
    overflow: 'hidden',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  tab: {
    flex: 1,
    paddingVertical: Layout.spacing.m,
    alignItems: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary[500],
  },
  content: {
    padding: Layout.spacing.m,
  },
  sectionTitle: {
    marginBottom: Layout.spacing.m,
  },
});