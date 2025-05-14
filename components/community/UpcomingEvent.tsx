import React from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Calendar, Clock, Users } from 'lucide-react-native';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { LiveEvent } from '@/types/community';

interface UpcomingEventProps {
  event: LiveEvent;
  onJoin: (event: LiveEvent) => void;
  onRemind: (event: LiveEvent) => void;
}

export function UpcomingEvent({ event, onJoin, onRemind }: UpcomingEventProps) {
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  // Format time to readable format
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };
  
  // Check if event is live
  const isLive = () => {
    const now = new Date();
    const eventStart = new Date(event.startTime);
    const eventEnd = new Date(event.endTime);
    return now >= eventStart && now <= eventEnd;
  };

  return (
    <Card variant="elevated" padding="none" style={styles.card}>
      <ImageBackground
        source={{ uri: event.imageUrl }}
        style={styles.imageBackground}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <View style={styles.topSection}>
            {isLive() ? (
              <View style={styles.liveTag}>
                <View style={styles.liveDot} />
                <Typography variant="caption" color={Colors.neutral[50]}>
                  LIVE NOW
                </Typography>
              </View>
            ) : (
              <View style={styles.upcomingTag}>
                <Typography variant="caption" color={Colors.neutral[50]}>
                  UPCOMING
                </Typography>
              </View>
            )}
          </View>
          
          <View style={styles.contentContainer}>
            <Typography variant="h3" color={Colors.neutral[50]} style={styles.title}>
              {event.title}
            </Typography>
            
            <Typography variant="body" color={Colors.neutral[200]} style={styles.host}>
              Hosted by {event.host.name}
            </Typography>
            
            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <Calendar size={16} color={Colors.neutral[300]} style={styles.infoIcon} />
                <Typography variant="caption" color={Colors.neutral[300]}>
                  {formatDate(event.startTime)}
                </Typography>
              </View>
              
              <View style={styles.infoItem}>
                <Clock size={16} color={Colors.neutral[300]} style={styles.infoIcon} />
                <Typography variant="caption" color={Colors.neutral[300]}>
                  {formatTime(event.startTime)}
                </Typography>
              </View>
              
              <View style={styles.infoItem}>
                <Users size={16} color={Colors.neutral[300]} style={styles.infoIcon} />
                <Typography variant="caption" color={Colors.neutral[300]}>
                  {event.attendeesCount} attending
                </Typography>
              </View>
            </View>
            
            <View style={styles.buttonContainer}>
              <Button
                title={isLive() ? "Join Now" : "Set Reminder"}
                variant={isLive() ? "primary" : "outline"}
                size="medium"
                fullWidth
                onPress={() => isLive() ? onJoin(event) : onRemind(event)}
                style={isLive() ? styles.joinButton : styles.remindButton}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Layout.spacing.l,
    overflow: 'hidden',
    borderRadius: Layout.borderRadius.m,
  },
  imageBackground: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  backgroundImage: {
    borderRadius: Layout.borderRadius.m,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'space-between',
    padding: Layout.spacing.m,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.error[500],
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 4,
    borderRadius: Layout.borderRadius.s,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.neutral[50],
    marginRight: 6,
  },
  upcomingTag: {
    backgroundColor: Colors.secondary[500],
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 4,
    borderRadius: Layout.borderRadius.s,
  },
  contentContainer: {
    justifyContent: 'flex-end',
  },
  title: {
    marginBottom: Layout.spacing.xs,
  },
  host: {
    marginBottom: Layout.spacing.m,
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Layout.spacing.m,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.m,
    marginBottom: Layout.spacing.s,
  },
  infoIcon: {
    marginRight: Layout.spacing.xs,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  joinButton: {
    backgroundColor: Colors.error[500],
  },
  remindButton: {
    borderColor: Colors.neutral[200],
  },
});

export default UpcomingEvent;