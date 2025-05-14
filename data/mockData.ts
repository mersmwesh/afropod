import { Podcast, Episode, Review } from '@/types/podcast';
import { Discussion, LiveEvent } from '@/types/community';
import Colors from '@/constants/Colors';

// Mock podcasts data
export const PODCASTS: Podcast[] = [
  {
    id: '1',
    title: 'African Tech Roundup',
    description: 'Weekly discussions on technology developments across the African continent with leading entrepreneurs and innovators.',
    coverImage: 'https://images.pexels.com/photos/5082237/pexels-photo-5082237.jpeg',
    creator: 'Andile Masuku',
    language: 'English',
    tags: ['Technology', 'Business'],
    totalEpisodes: 128,
    subscribers: 15000,
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Naija Stories',
    description: 'Contemporary storytelling celebrating Nigerian culture, traditions, and modern life experiences.',
    coverImage: 'https://images.pexels.com/photos/6670752/pexels-photo-6670752.jpeg',
    creator: 'Chioma Nnadi',
    language: 'English/Pidgin',
    tags: ['Culture', 'Stories'],
    totalEpisodes: 45,
    subscribers: 8500,
    rating: 4.6,
  },
  {
    id: '3',
    title: 'Le Journal de l\'Afrique',
    description: 'Actualités quotidiennes sur les développements politiques, économiques et culturels à travers l\'Afrique francophone.',
    coverImage: 'https://images.pexels.com/photos/3944154/pexels-photo-3944154.jpeg',
    creator: 'Radio Africa',
    language: 'French',
    tags: ['News', 'Politics'],
    totalEpisodes: 312,
    subscribers: 22000,
    rating: 4.5,
  },
  {
    id: '4',
    title: 'Sauti za Afrika',
    description: 'Conversations with change-makers across East Africa on social innovation, entrepreneurship, and sustainable development.',
    coverImage: 'https://images.pexels.com/photos/7648050/pexels-photo-7648050.jpeg',
    creator: 'Makena Wanjiru',
    language: 'Swahili/English',
    tags: ['Society', 'Development'],
    totalEpisodes: 86,
    subscribers: 12300,
    rating: 4.7,
  },
  {
    id: '5',
    title: 'Ìtàn Àlóre',
    description: 'Traditional Yoruba folktales and contemporary stories exploring the rich cultural heritage of West Africa.',
    coverImage: 'https://images.pexels.com/photos/4064781/pexels-photo-4064781.jpeg',
    creator: 'Folake Adeyemi',
    language: 'Yoruba/English',
    tags: ['Culture', 'Stories'],
    totalEpisodes: 52,
    subscribers: 9800,
    rating: 4.9,
  },
  {
    id: '6',
    title: 'Cairo Calling',
    description: 'Interviews with Egyptian artists, musicians, and creatives navigating the dynamic cultural landscape of modern Cairo.',
    coverImage: 'https://images.pexels.com/photos/1011302/pexels-photo-1011302.jpeg',
    creator: 'Ahmed Hassan',
    language: 'Arabic/English',
    tags: ['Culture', 'Arts'],
    totalEpisodes: 74,
    subscribers: 11200,
    rating: 4.5,
  },
];

// Mock episodes data
export const EPISODES: Episode[] = [
  {
    id: '101',
    podcastId: '1',
    podcastTitle: 'African Tech Roundup',
    title: 'The Rise of African Fintech Startups',
    description: 'In this episode, we explore the explosive growth of financial technology companies across Africa and their impact on financial inclusion.',
    audioUrl: 'https://example.com/episodes/101.mp3',
    imageUrl: 'https://images.pexels.com/photos/5082237/pexels-photo-5082237.jpeg',
    duration: 2845, // in seconds
    publishDate: '2023-09-15T10:00:00Z',
  },
  {
    id: '102',
    podcastId: '1',
    podcastTitle: 'African Tech Roundup',
    title: 'E-commerce Revolution in Africa',
    description: 'Discussing how digital marketplaces are transforming retail across the continent despite infrastructure challenges.',
    audioUrl: 'https://example.com/episodes/102.mp3',
    imageUrl: 'https://images.pexels.com/photos/5082237/pexels-photo-5082237.jpeg',
    duration: 3120,
    publishDate: '2023-09-01T10:00:00Z',
  },
  {
    id: '103',
    podcastId: '1',
    podcastTitle: 'African Tech Roundup',
    title: 'Internet Connectivity: Bridging the Digital Divide',
    description: 'Examining innovative solutions to expand internet access in rural and underserved communities across Africa.',
    audioUrl: 'https://example.com/episodes/103.mp3',
    imageUrl: 'https://images.pexels.com/photos/5082237/pexels-photo-5082237.jpeg',
    duration: 2730,
    publishDate: '2023-08-15T10:00:00Z',
  },
  {
    id: '201',
    podcastId: '2',
    podcastTitle: 'Naija Stories',
    title: 'Lagos Life: Hustle and Flow',
    description: 'Stories from the vibrant streets of Lagos, exploring the resilience and creativity of its inhabitants.',
    audioUrl: 'https://example.com/episodes/201.mp3',
    imageUrl: 'https://images.pexels.com/photos/6670752/pexels-photo-6670752.jpeg',
    duration: 1800,
    publishDate: '2023-09-10T14:30:00Z',
  },
  {
    id: '202',
    podcastId: '2',
    podcastTitle: 'Naija Stories',
    title: 'Family Traditions: Old Meets New',
    description: 'Exploring how traditional family values evolve in contemporary Nigerian society.',
    audioUrl: 'https://example.com/episodes/202.mp3',
    imageUrl: 'https://images.pexels.com/photos/6670752/pexels-photo-6670752.jpeg',
    duration: 2100,
    publishDate: '2023-08-27T14:30:00Z',
  },
];

// Mock reviews data
export const REVIEWS: Review[] = [
  {
    id: '1001',
    userId: 'user1',
    userName: 'Kwame',
    podcastId: '1',
    rating: 5,
    content: 'This podcast keeps me informed about the latest tech developments in Africa. The hosts are knowledgeable and the discussions are insightful.',
    createdAt: '2023-08-20T15:30:00Z',
  },
  {
    id: '1002',
    userId: 'user2',
    userName: 'Fatima',
    podcastId: '1',
    rating: 4,
    content: 'Great content but sometimes the episodes are too technical for a casual listener. Nevertheless, I learn something new each time.',
    createdAt: '2023-07-12T09:45:00Z',
  },
  {
    id: '2001',
    userId: 'user3',
    userName: 'Olusegun',
    podcastId: '2',
    rating: 5,
    content: 'The storytelling is captivating! It brings me back to the stories my grandmother used to tell, but with a modern twist.',
    createdAt: '2023-09-05T18:20:00Z',
  },
];

// Mock categories
export const CATEGORIES = [
  { id: '1', name: 'Technology', color: Colors.primary[500] },
  { id: '2', name: 'Culture', color: Colors.secondary[500] },
  { id: '3', name: 'News', color: Colors.accent[500] },
  { id: '4', name: 'Stories', color: Colors.secondary[700] },
  { id: '5', name: 'Business', color: Colors.primary[600] },
  { id: '6', name: 'Politics', color: Colors.error[600] },
  { id: '7', name: 'Arts', color: Colors.accent[600] },
  { id: '8', name: 'Music', color: Colors.primary[800] },
];

// Mock languages
export const LANGUAGES = [
  { id: '1', name: 'English' },
  { id: '2', name: 'French' },
  { id: '3', name: 'Swahili' },
  { id: '4', name: 'Arabic' },
  { id: '5', name: 'Yoruba' },
  { id: '6', name: 'Zulu' },
  { id: '7', name: 'Amharic' },
  { id: '8', name: 'Hausa' },
  { id: '9', name: 'Pidgin' },
];

// Mock regions
export const REGIONS = [
  { id: '1', name: 'West Africa' },
  { id: '2', name: 'East Africa' },
  { id: '3', name: 'North Africa' },
  { id: '4', name: 'Southern Africa' },
  { id: '5', name: 'Central Africa' },
];

// Mock discussions
export const DISCUSSIONS: Discussion[] = [
  {
    id: '1',
    title: 'What are your favorite podcasts in Swahili?',
    content: 'I\'m trying to improve my Swahili and I\'m looking for engaging podcasts. I enjoy storytelling and educational content. Any recommendations would be appreciated!',
    topic: 'Recommendations',
    createdAt: '2023-09-10T08:30:00Z',
    author: {
      id: 'user1',
      name: 'Jabari Kimathi',
    },
    commentsCount: 12,
    likesCount: 24,
  },
  {
    id: '2',
    title: 'The importance of local language podcasts',
    content: 'I believe podcasts in indigenous African languages are crucial for preserving cultures and reaching audiences who may not be fluent in colonial languages. What are your thoughts on this?',
    topic: 'Cultural Preservation',
    createdAt: '2023-09-08T14:45:00Z',
    author: {
      id: 'user2',
      name: 'Amara Nwosu',
    },
    commentsCount: 35,
    likesCount: 67,
  },
  {
    id: '3',
    title: 'Internet accessibility issues for podcast listeners',
    content: 'Many rural areas still struggle with reliable internet access, making streaming podcasts difficult. How can creators better serve these audiences? Should more focus be put on downloadable content?',
    topic: 'Accessibility',
    createdAt: '2023-09-05T11:20:00Z',
    author: {
      id: 'user3',
      name: 'Tendai Mutasa',
    },
    commentsCount: 28,
    likesCount: 41,
  },
];

// Mock live events
export const LIVE_EVENTS: LiveEvent[] = [
  {
    id: '1',
    title: 'The Future of African Storytelling',
    description: 'Join our panel of renowned storytellers as they discuss how traditional narrative techniques are evolving in the digital age.',
    imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
    host: {
      id: 'host1',
      name: 'Chimamanda Adichie',
    },
    startTime: '2023-09-20T18:00:00Z',
    endTime: '2023-09-20T19:30:00Z',
    attendeesCount: 450,
  },
  {
    id: '2',
    title: 'Building a Podcast Studio on a Budget',
    description: 'Learn how to create professional-sounding podcasts without breaking the bank, with tips on equipment, software, and techniques.',
    imageUrl: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg',
    host: {
      id: 'host2',
      name: 'David Oyelowo',
    },
    startTime: '2023-09-25T15:00:00Z',
    endTime: '2023-09-25T16:00:00Z',
    attendeesCount: 325,
  },
];

// Default user preferences for demo
export const DEFAULT_USER_PREFERENCES = {
  languages: ['1', '3'], // English, Swahili
  regions: ['1', '2'], // West Africa, East Africa
  genres: ['1', '2', '4'], // Technology, Culture, Stories
};