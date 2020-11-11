import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
});

const ProductList = () => {
  const data = () => {
    const res = [];
    for (let i = 0; i < 200; i++) {
      res.push('alskdj flaksdfj alsdk');
    }
    return res;
  };
  return (
    <View style={styles.listContainer}>
      <FlatList data={data()} renderItem={({ item }) => <Text>{item}</Text>} />
    </View>
  );
};

export default ProductList;
