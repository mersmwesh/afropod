import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { Chrome as Home, Radio, Users, User } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary[500],
        tabBarInactiveTintColor: Colors.neutral[500],
        tabBarLabelStyle: {
          fontFamily: 'DMSans-Medium',
          fontSize: 12,
        },
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: Colors.neutral[200],
          height: 60,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 10,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="for-you"
        options={{
          title: 'For You',
          tabBarIcon: ({ color, size }) => (
            <Radio size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ color, size }) => (
            <Users size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}