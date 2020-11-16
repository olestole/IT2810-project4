import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import ProductList from '../components/Overview/ProductList';
import { setCurrentProduct } from '../store/action';
import { Product } from '../types/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
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

const OverviewScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const handleDetailNavigation = (product: Product) => {
    navigation.navigate('Detail');
    dispatch(setCurrentProduct(product));
  };

  return (
    <View style={styles.container}>
      <ProductList handleDetailNavigation={handleDetailNavigation} />
    </View>
  );
};

export default OverviewScreen;
