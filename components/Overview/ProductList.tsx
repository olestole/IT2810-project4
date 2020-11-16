import { useQuery } from '@apollo/client';
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { ProductsQuery } from '../../graphql/generated/ProductsQuery';
import { PRODUCTS } from '../../graphql/queries';
import useProductList from '../../hooks/useProductList';
import { toggleSortIndex, updateViewMode } from '../../store/action';
import { AppState, FilterOptions } from '../../store/types';
import { Product } from '../../types/types';
import { filterGlobalToArray } from '../../utils/product';
import EmptyResultIndicator from '../Shared/EmptyResultIndicator';
import ErrorIndicator from '../Shared/ErrorIndicator';
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
  sortContainer: {
    flexDirection: 'row',
    marginTop: 5,
    padding: 0,
  },
  varenavn: {
    marginLeft: 8,
  },
});

interface IProductList {
  handleDetailNavigation: (product: Product) => void;
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
      sortIndex: filterOptions.sortIndex,
    },
  });

  const { isFetching, setIsFetching } = useProductList(data, fetchMore);

  const handleEndReached = () => {
    dispatch(updateViewMode({ field: 'initialLoad', value: false }));
    setIsFetching(true);
  };

  if (error) return <ErrorIndicator />;
  if (loading) return <LoadingIndicator />;

  return (
    <DataTable style={styles.tableContainer}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title>
          <TouchableOpacity
            style={styles.sortContainer}
            onPress={() => dispatch(toggleSortIndex())}
          >
            <FontAwesome5
              name={filterOptions.sortIndex === 1 ? 'sort-alpha-down' : 'sort-alpha-up'}
              size={15}
              color='black'
            />
            <Text style={styles.varenavn}>Varenavn</Text>
          </TouchableOpacity>
        </DataTable.Title>
        <DataTable.Title numeric>
          <TouchableWithoutFeedback style={styles.sortContainer}>
            <Text>Varetype</Text>
          </TouchableWithoutFeedback>
        </DataTable.Title>
      </DataTable.Header>

      {data &&
        !loading &&
        (data.products.length === 0 ? (
          <EmptyResultIndicator />
        ) : (
          <FlatList
            style={styles.flatList}
            onEndReachedThreshold={0.5}
            onEndReached={handleEndReached}
            data={data.products}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleDetailNavigation(item as Product)}>
                <ProductListItem varenavn={item.Varenavn} varetype={item.Varetype ?? ''} />
              </TouchableOpacity>
            )}
          />
        ))}
    </DataTable>
  );
};

export default ProductList;
