import { useQuery } from '@apollo/client';
import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { ProductsQuery, ProductsQuery_products } from '../../graphql/generated/ProductsQuery';
import { PRODUCTS } from '../../graphql/queries';
import useProductList from '../../hooks/useProductList';
import { updateViewMode } from '../../store/action';
import { AppState, FilterOptions } from '../../store/types';
import { filterGlobalToArray } from '../../utils/product';
import LoadingIndicator from '../Shared/LoadingIndicator';
import ProductListItem from './ProductListItem';

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
  tableHeader: {},
  flatList: {
    width: '100%',
    height: '94%',
  },
  tableContainer: {
    width: '100%',
  },
});

interface IProductList {
  handleDetailNavigation: (product: ProductsQuery_products) => void;
}

const ProductList: React.FC<IProductList> = ({ handleDetailNavigation }) => {
  const dispatch = useDispatch();
  let filterOptions: FilterOptions = useSelector((state: AppState) => state.filterOptions);
  const searchText: string = useSelector((state: AppState) => state.searchText);

  const { data, loading, error, fetchMore } = useQuery<ProductsQuery>(PRODUCTS, {
    variables: {
      matchedString: searchText,
      filterIndex: 0,
      typer: filterGlobalToArray(filterOptions),
      prisgt: filterOptions.minPrice,
      prisls: filterOptions.maxPrice,
      volumgt: filterOptions.minVolum,
      volumls: filterOptions.maxVolum,
      sortIndex: 1,
    },
  });

  const { isFetching, setIsFetching } = useProductList(data, fetchMore);

  const handleEndReached = () => {
    dispatch(updateViewMode({ field: 'initialLoad', value: false }));
    setIsFetching(true);
  };

  if (error) return <Text>Noe gikk feil</Text>;

  if (loading) return <LoadingIndicator />;

  return (
    <DataTable style={styles.tableContainer}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title>Varenavn</DataTable.Title>
        <DataTable.Title numeric>Varetype</DataTable.Title>
      </DataTable.Header>

      {data && !loading && (
        <FlatList
          style={styles.flatList}
          onEndReachedThreshold={0.5}
          onEndReached={handleEndReached}
          data={data.products}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleDetailNavigation(item)}>
              <ProductListItem varenavn={item.Varenavn} varetype={item.Varetype ?? ''} />
            </TouchableOpacity>
          )}
        />
      )}
    </DataTable>
  );
};

export default ProductList;
