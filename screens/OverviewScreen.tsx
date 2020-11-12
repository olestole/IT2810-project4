import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProductList from '../components/Overview/ProductList';

const OverviewScreen = ({ navigation }: any) => {
  console.log(navigation);

  const handleDetailNavigation = (varenummer: string) => {
    navigation.navigate('Detail');
  };

  return (
    <View style={styles.container}>
      <ProductList handleDetailNavigation={handleDetailNavigation} />
    </View>
  );
};

export default OverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  inputField: {
    width: '80%',
    padding: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    textAlign: 'center',
    borderRadius: 6,
  },
});
