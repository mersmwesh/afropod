import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import { Download, Play, Clock, MoveVertical as MoreVertical } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Episode } from '@/types/podcast';

interface EpisodeItemProps {
  episode: Episode;
  onPlay: (episode: Episode) => void;
  onDownload: (episode: Episode) => void;
  onOptions: (episode: Episode) => void;
}

export function EpisodeItem({ 
  episode, 
  onPlay, 
  onDownload, 
  onOptions 
}: EpisodeItemProps) {
  // Format duration from seconds to mm:ss format
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Typography variant="bodyMedium" numberOfLines={2} style={styles.title}>
            {episode.title}
          </Typography>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => onOptions(episode)}
          >
            <MoreVertical 
              size={18} 
              color={Colors.neutral[700]} 
              strokeWidth={2}
            />
          </TouchableOpacity>
        </View>
        
        <Typography 
          variant="body" 
          numberOfLines={2} 
          color={Colors.neutral[600]} 
          style={styles.description}
        >
          {episode.description}
        </Typography>
        
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Clock 
              size={14} 
              color={Colors.neutral[500]} 
              strokeWidth={2} 
              style={styles.metaIcon}
            />
            <Typography variant="caption" color={Colors.neutral[500]}>
              {formatDuration(episode.duration)}
            </Typography>
          </View>
          
          <Typography variant="caption" color={Colors.neutral[500]}>
            {formatDate(episode.publishDate)}
          </Typography>
        </View>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.playButton}
          onPress={() => onPlay(episode)}
        >
          <Play size={18} color={Colors.neutral[50]} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.downloadButton}
          onPress={() => onDownload(episode)}
        >
          <Download 
            size={18} 
            color={Colors.neutral[700]} 
            strokeWidth={2}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: Layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  content: {
    flex: 1,
    paddingRight: Layout.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Layout.spacing.xs,
  },
  title: {
    flex: 1,
    marginRight: Layout.spacing.s,
  },
  description: {
    marginBottom: Layout.spacing.s,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    marginRight: Layout.spacing.xs,
  },
  actionsContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  downloadButton: {
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
  iconButton: {
    padding: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.round,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
});

export default EpisodeItem;