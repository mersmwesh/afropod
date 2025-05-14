import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useRouter } from 'expo-router';
import { ChevronRight, CircleCheck as CheckCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { LANGUAGES, CATEGORIES, REGIONS, DEFAULT_USER_PREFERENCES } from '@/data/mockData';

interface SelectionItemProps {
  id: string;
  name: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const SelectionItem = ({ id, name, isSelected, onSelect }: SelectionItemProps) => (
  <TouchableOpacity
    style={[styles.selectionItem, isSelected && styles.selectionItemSelected]}
    onPress={() => onSelect(id)}
    activeOpacity={0.7}
  >
    <Typography variant="bodyMedium" color={isSelected ? Colors.neutral[50] : Colors.neutral[800]}>
      {name}
    </Typography>
    {isSelected && (
      <CheckCircle 
        size={16} 
        color={Colors.neutral[50]} 
        style={styles.checkIcon}
      />
    )}
  </TouchableOpacity>
);

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(DEFAULT_USER_PREFERENCES.languages);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(DEFAULT_USER_PREFERENCES.genres);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(DEFAULT_USER_PREFERENCES.regions);

  const handleLanguageSelect = (id: string) => {
    setSelectedLanguages(prev => 
      prev.includes(id) 
        ? prev.filter(langId => langId !== id) 
        : [...prev, id]
    );
  };

  const handleGenreSelect = (id: string) => {
    setSelectedGenres(prev => 
      prev.includes(id) 
        ? prev.filter(genreId => genreId !== id) 
        : [...prev, id]
    );
  };

  const handleRegionSelect = (id: string) => {
    setSelectedRegions(prev => 
      prev.includes(id) 
        ? prev.filter(regionId => regionId !== id) 
        : [...prev, id]
    );
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save preferences and redirect to main app
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/3944154/pexels-photo-3944154.jpeg' }} 
          style={styles.headerImage} 
        />
        <View style={styles.logoContainer}>
          <Typography variant="h1" color={Colors.neutral[50]}>
            AfriPod
          </Typography>
          <Typography variant="body" color={Colors.neutral[200]}>
            The heart of African podcasting
          </Typography>
        </View>
      </View>

      <Card variant="elevated" padding="medium" style={styles.card}>
        <View style={styles.progressContainer}>
          {[1, 2, 3].map((i) => (
            <View 
              key={i} 
              style={[
                styles.progressDot, 
                i <= step && styles.progressDotActive,
                i < step && styles.progressDotComplete
              ]} 
            />
          ))}
        </View>

        <Typography variant="h2" style={styles.title}>
          {step === 1 && 'Choose your languages'}
          {step === 2 && 'Select your interests'}
          {step === 3 && 'Regions you care about'}
        </Typography>

        <Typography variant="body" color={Colors.neutral[600]} style={styles.subtitle}>
          {step === 1 && 'Which languages do you speak or are learning?'}
          {step === 2 && 'What types of podcasts do you enjoy?'}
          {step === 3 && 'Which regions of Africa would you like to follow?'}
        </Typography>

        <ScrollView 
          style={styles.selectionContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.selectionGrid}>
            {step === 1 && LANGUAGES.map((language) => (
              <SelectionItem
                key={language.id}
                id={language.id}
                name={language.name}
                isSelected={selectedLanguages.includes(language.id)}
                onSelect={handleLanguageSelect}
              />
            ))}

            {step === 2 && CATEGORIES.map((category) => (
              <SelectionItem
                key={category.id}
                id={category.id}
                name={category.name}
                isSelected={selectedGenres.includes(category.id)}
                onSelect={handleGenreSelect}
              />
            ))}

            {step === 3 && REGIONS.map((region) => (
              <SelectionItem
                key={region.id}
                id={region.id}
                name={region.name}
                isSelected={selectedRegions.includes(region.id)}
                onSelect={handleRegionSelect}
              />
            ))}
          </View>
        </ScrollView>

        <View style={styles.actionContainer}>
          <Button
            title="Skip"
            variant="text"
            size="medium"
            onPress={handleSkip}
            style={styles.skipButton}
          />
          <Button
            title={step === 3 ? "Get Started" : "Next"}
            variant="primary"
            size="large"
            onPress={handleNextStep}
            rightIcon={<ChevronRight size={20} color={Colors.neutral[50]} />}
          />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[100],
  },
  header: {
    height: '30%',
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  card: {
    position: 'relative',
    marginTop: -30,
    marginHorizontal: Layout.spacing.m,
    borderRadius: Layout.borderRadius.l,
    paddingVertical: Layout.spacing.xl,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Layout.spacing.xl,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.neutral[300],
    marginHorizontal: Layout.spacing.xs,
  },
  progressDotActive: {
    backgroundColor: Colors.primary[500],
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  progressDotComplete: {
    backgroundColor: Colors.primary[300],
  },
  title: {
    textAlign: 'center',
    marginBottom: Layout.spacing.s,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: Layout.spacing.xl,
  },
  selectionContainer: {
    maxHeight: 300,
    marginBottom: Layout.spacing.xl,
  },
  selectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  selectionItem: {
    backgroundColor: Colors.neutral[200],
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    borderRadius: Layout.borderRadius.m,
    margin: Layout.spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  selectionItemSelected: {
    backgroundColor: Colors.primary[500],
  },
  checkIcon: {
    marginLeft: Layout.spacing.xs,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    marginRight: Layout.spacing.m,
  },
});