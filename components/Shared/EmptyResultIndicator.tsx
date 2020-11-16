import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  noResultContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  header: {
    marginTop: 20,
    fontWeight: '700',
    fontSize: 18,
  },
  subText: {
    fontWeight: '300',
  },
});

const EmptyResultIndicator = () => {
  return (
    <View style={styles.noResultContainer}>
      <FontAwesome5 name='sad-tear' size={80} color='black' />
      <Text style={styles.header}>Endre filteret?</Text>
      <Text style={styles.subText}>Ingen produkter møter kravet til filteret</Text>
    </View>
  );
};

export default EmptyResultIndicator;
