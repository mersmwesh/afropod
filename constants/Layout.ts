import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// 8px spacing system
const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
  xxxl: 56,
};

// Breakpoints for responsive design
const breakpoints = {
  phone: 0,
  tablet: 768,
  desktop: 1024,
};

// Typography scale
const typography = {
  fontFamily: {
    heading: 'Poppins-Bold',
    subheading: 'Poppins-Medium',
    body: 'DMSans-Regular',
    bodyMedium: 'DMSans-Medium',
  },
  size: {
    xs: 12,
    s: 14,
    m: 16,
    l: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  lineHeight: {
    heading: 1.2, // 120%
    body: 1.5, // 150%
  },
};

// Border radiuses
const borderRadius = {
  s: 4,
  m: 8,
  l: 12,
  xl: 16,
  xxl: 24,
  round: 9999,
};

export default {
  width,
  height,
  spacing,
  breakpoints,
  typography,
  borderRadius,
  isSmallDevice: width < 375,
};