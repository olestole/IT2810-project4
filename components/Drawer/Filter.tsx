import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailScreen from '../../screens/DetailScreen';

const Filter = () => {
  return (
    // <View style={styles.rootContainer}>
    //   <TouchableOpacity onPress={() => console.log('halla')}>
    //     <Text>FilterComp</Text>
    //   </TouchableOpacity>
    // </View>
    <DetailScreen />
  );
};

export default Filter;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
