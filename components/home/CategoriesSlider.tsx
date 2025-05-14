import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface Category {
  id: string;
  name: string;
  color: string;
}

interface CategoriesSliderProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function CategoriesSlider({ 
  categories, 
  selectedCategoryId, 
  onSelectCategory 
}: CategoriesSliderProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {/* All categories option */}
      <TouchableOpacity
        style={[
          styles.categoryButton,
          { backgroundColor: !selectedCategoryId ? Colors.primary[500] : Colors.neutral[200] },
        ]}
        onPress={() => onSelectCategory(null)}
      >
        <Typography
          variant="bodyMedium"
          color={!selectedCategoryId ? Colors.neutral[50] : Colors.neutral[800]}
        >
          All
        </Typography>
      </TouchableOpacity>

      {/* Category buttons */}
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryButton,
            {
              backgroundColor: selectedCategoryId === category.id 
                ? category.color 
                : Colors.neutral[200],
            },
          ]}
          onPress={() => onSelectCategory(category.id)}
        >
          <Typography
            variant="bodyMedium"
            color={
              selectedCategoryId === category.id ? Colors.neutral[50] : Colors.neutral[800]
            }
          >
            {category.name}
          </Typography>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.m,
  },
  categoryButton: {
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.s,
    borderRadius: Layout.borderRadius.l,
    marginRight: Layout.spacing.m,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
});

export default CategoriesSlider;