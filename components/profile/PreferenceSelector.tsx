import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface Item {
  id: string;
  name: string;
}

interface PreferenceSelectorProps {
  title: string;
  items: Item[];
  selectedIds: string[];
  onSelect: (ids: string[]) => void;
}

export function PreferenceSelector({
  title,
  items,
  selectedIds,
  onSelect,
}: PreferenceSelectorProps) {
  const handleToggleItem = (id: string) => {
    const isSelected = selectedIds.includes(id);
    if (isSelected) {
      onSelect(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      onSelect([...selectedIds, id]);
    }
  };

  return (
    <Card variant="elevated" style={styles.card}>
      <Typography variant="h3" style={styles.title}>
        {title}
      </Typography>
      <View style={styles.itemsContainer}>
        {items.map(item => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.item,
                isSelected && styles.itemSelected,
              ]}
              onPress={() => handleToggleItem(item.id)}
            >
              <Typography
                variant="bodyMedium"
                color={isSelected ? Colors.neutral[50] : Colors.neutral[800]}
              >
                {item.name}
              </Typography>
              {isSelected && (
                <X
                  size={16}
                  color={Colors.neutral[50]}
                  style={styles.removeIcon}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Layout.spacing.m,
  },
  title: {
    marginBottom: Layout.spacing.m,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.s,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[200],
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    borderRadius: Layout.borderRadius.m,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  itemSelected: {
    backgroundColor: Colors.primary[500],
  },
  removeIcon: {
    marginLeft: Layout.spacing.xs,
  },
});