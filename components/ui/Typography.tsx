import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodyMedium' | 'caption' | 'button';
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  numberOfLines?: number;
}

export function Typography({
  variant = 'body',
  color = Colors.text,
  align = 'left',
  style,
  children,
  numberOfLines,
  ...props
}: TypographyProps) {
  return (
    <Text
      style={[
        styles[variant],
        { color, textAlign: align },
        style,
      ]}
      numberOfLines={numberOfLines}
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontFamily: Layout.typography.fontFamily.heading,
    fontSize: Layout.typography.size.xxxl,
    lineHeight: Layout.typography.size.xxxl * Layout.typography.lineHeight.heading,
    letterSpacing: -0.5,
    marginBottom: Layout.spacing.m,
  },
  h2: {
    fontFamily: Layout.typography.fontFamily.heading,
    fontSize: Layout.typography.size.xxl,
    lineHeight: Layout.typography.size.xxl * Layout.typography.lineHeight.heading,
    letterSpacing: -0.3,
    marginBottom: Layout.spacing.s,
  },
  h3: {
    fontFamily: Layout.typography.fontFamily.subheading,
    fontSize: Layout.typography.size.xl,
    lineHeight: Layout.typography.size.xl * Layout.typography.lineHeight.heading,
    letterSpacing: -0.2,
    marginBottom: Layout.spacing.s,
  },
  h4: {
    fontFamily: Layout.typography.fontFamily.subheading,
    fontSize: Layout.typography.size.l,
    lineHeight: Layout.typography.size.l * Layout.typography.lineHeight.heading,
    letterSpacing: -0.1,
    marginBottom: Layout.spacing.s,
  },
  body: {
    fontFamily: Layout.typography.fontFamily.body,
    fontSize: Layout.typography.size.m,
    lineHeight: Layout.typography.size.m * Layout.typography.lineHeight.body,
  },
  bodyMedium: {
    fontFamily: Layout.typography.fontFamily.bodyMedium,
    fontSize: Layout.typography.size.m,
    lineHeight: Layout.typography.size.m * Layout.typography.lineHeight.body,
  },
  caption: {
    fontFamily: Layout.typography.fontFamily.body,
    fontSize: Layout.typography.size.xs,
    lineHeight: Layout.typography.size.xs * Layout.typography.lineHeight.body,
    color: Colors.subtext,
  },
  button: {
    fontFamily: Layout.typography.fontFamily.bodyMedium,
    fontSize: Layout.typography.size.m,
    lineHeight: Layout.typography.size.m * Layout.typography.lineHeight.heading,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default Typography;