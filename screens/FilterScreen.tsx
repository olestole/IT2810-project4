import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FilterScreen = () => {
  return (
    <View style={styles.rootContainer}>
      <Text>FilterScreen</Text>
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  rootContainer: {
    height: '100%',
    width: '80%',
    backgroundColor: '#fff',
  },
});
