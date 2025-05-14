import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'flat';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export function Card({
  variant = 'elevated',
  padding = 'medium',
  style,
  children,
  ...props
}: CardProps) {
  return (
    <View
      style={[
        styles.card,
        styles[variant],
        styles[`${padding}Padding`],
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Layout.borderRadius.m,
    overflow: 'hidden',
  },
  elevated: {
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  outlined: {
    borderWidth: 1,
    borderColor: Colors.border,
  },
  flat: {
    // No additional styles for flat variant
  },
  nonePadding: {
    // No padding
  },
  smallPadding: {
    padding: Layout.spacing.s,
  },
  mediumPadding: {
    padding: Layout.spacing.m,
  },
  largePadding: {
    padding: Layout.spacing.l,
  },
});

export default Card;