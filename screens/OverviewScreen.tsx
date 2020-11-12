import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductList from '../components/Overview/ProductList';
import LoadingIndicator from '../components/Shared/LoadingIndicator';
import { PRODUCTS } from '../graphql/queries';
import { updateViewMode } from '../store/action';
import { AppState, FilterOptions, ViewMode } from '../store/types';
import { filterGlobalToArray, getProductType } from '../utils/product';

const OverviewScreen = ({ navigation }: any) => {
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
