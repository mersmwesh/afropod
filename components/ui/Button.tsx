import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';
import Typography from './Typography';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
}

export function Button({
  title,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled = false,
  style,
  ...props
}: ButtonProps) {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[`${size}Size`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textColor = getTextColor(variant, disabled);

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={disabled || isLoading}
      {...props}
    >
      <View style={styles.contentContainer}>
        {leftIcon && !isLoading && <View style={styles.iconLeft}>{leftIcon}</View>}
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={textColor}
            style={styles.loader}
          />
        ) : (
          <Typography
            variant="button"
            color={textColor}
            style={styles.text}
          >
            {title}
          </Typography>
        )}
        {rightIcon && !isLoading && <View style={styles.iconRight}>{rightIcon}</View>}
      </View>
    </TouchableOpacity>
  );
}

const getTextColor = (variant: string, disabled: boolean) => {
  if (disabled) return Colors.neutral[500];
  
  switch (variant) {
    case 'primary':
      return Colors.neutral[50];
    case 'secondary':
      return Colors.neutral[50];
    case 'outline':
      return Colors.primary[500];
    case 'text':
      return Colors.primary[500];
    default:
      return Colors.neutral[50];
  }
};

const styles = StyleSheet.create({
  button: {
    borderRadius: Layout.borderRadius.m,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: Colors.primary[500],
  },
  secondary: {
    backgroundColor: Colors.secondary[500],
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary[500],
  },
  text: {
    backgroundColor: 'transparent',
  },
  smallSize: {
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.m,
  },
  mediumSize: {
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.l,
  },
  largeSize: {
    paddingVertical: Layout.spacing.m,
    paddingHorizontal: Layout.spacing.xl,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    backgroundColor: Colors.neutral[200],
    borderColor: Colors.neutral[300],
  },
  loader: {
    marginHorizontal: Layout.spacing.s,
  },
  text: {},
  iconLeft: {
    marginRight: Layout.spacing.s,
  },
  iconRight: {
    marginLeft: Layout.spacing.s,
  },
});

export default Button;