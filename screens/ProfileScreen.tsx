import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: 'blue',
  },
});

const ProfileScreen = () => {
  return (
    <View style={styles.listContainer}>
      <Text>Profile</Text>
    </View>
  );
};

export default ProfileScreen;
