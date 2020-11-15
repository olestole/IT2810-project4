import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  errorMessage: {
    flex: 1,
    justifyContent: 'center',
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

const ErrorIndicator = () => {
  return (
    <View style={styles.errorMessage}>
      <FontAwesome5 name='sad-tear' size={80} color='black' />
      <Text style={styles.header}>Noe gikk galt</Text>
      <Text style={styles.subText}>Forsøk å restarte applikasjonen</Text>
    </View>
  );
};

export default ErrorIndicator;
