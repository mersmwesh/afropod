import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { MessageCircle, ThumbsUp, Share2 } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Discussion } from '@/types/community';

interface DiscussionCardProps {
  discussion: Discussion;
  onPress: (discussion: Discussion) => void;
}

export function DiscussionCard({ discussion, onPress }: DiscussionCardProps) {
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = diffMs / (1000 * 60 * 60);
    
    if (diffHrs < 24) {
      return `${Math.floor(diffHrs)}h ago`;
    } else if (diffHrs < 48) {
      return 'yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(discussion)}
      activeOpacity={0.8}
    >
      <Card variant="elevated" style={styles.card}>
        <View style={styles.header}>
          <View style={styles.topicTag}>
            <Typography variant="caption" color={Colors.secondary[700]}>
              {discussion.topic}
            </Typography>
          </View>
          <Typography variant="caption" color={Colors.neutral[500]}>
            {formatDate(discussion.createdAt)}
          </Typography>
        </View>
        
        <Typography variant="h4" style={styles.title}>
          {discussion.title}
        </Typography>
        
        <Typography
          variant="body"
          numberOfLines={3}
          color={Colors.neutral[700]}
          style={styles.content}
        >
          {discussion.content}
        </Typography>
        
        <View style={styles.footer}>
          <View style={styles.authorContainer}>
            <View style={styles.authorInitials}>
              <Typography 
                variant="caption" 
                color={Colors.neutral[50]}
              >
                {discussion.author.name.split(' ').map(n => n[0]).join('')}
              </Typography>
            </View>
            <Typography variant="caption" color={Colors.neutral[700]}>
              {discussion.author.name}
            </Typography>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <MessageCircle
                size={16}
                color={Colors.neutral[500]}
                style={styles.statIcon}
              />
              <Typography variant="caption" color={Colors.neutral[500]}>
                {discussion.commentsCount}
              </Typography>
            </View>
            
            <View style={styles.statItem}>
              <ThumbsUp
                size={16}
                color={Colors.neutral[500]}
                style={styles.statIcon}
              />
              <Typography variant="caption" color={Colors.neutral[500]}>
                {discussion.likesCount}
              </Typography>
            </View>
            
            <TouchableOpacity style={styles.shareButton}>
              <Share2 size={16} color={Colors.neutral[500]} />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Layout.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  topicTag: {
    backgroundColor: Colors.secondary[100],
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 4,
    borderRadius: Layout.borderRadius.s,
  },
  title: {
    marginBottom: Layout.spacing.s,
  },
  content: {
    marginBottom: Layout.spacing.m,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Layout.spacing.s,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorInitials: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.secondary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.m,
  },
  statIcon: {
    marginRight: Layout.spacing.xs,
  },
  shareButton: {
    padding: 4,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
});

export default DiscussionCard;