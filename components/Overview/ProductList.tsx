import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { ProductsQuery } from '../../graphql/generated/ProductsQuery';
import { PRODUCTS } from '../../graphql/queries';
import { updateViewMode } from '../../store/action';
import { AppState, FilterOptions, ViewMode } from '../../store/types';
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

interface IProduct {
  varenavn: string;
  varetype: string;
}

interface IProductList {
  handleDetailNavigation: (varenummer: string) => void;
}

const ProductList: React.FC<IProductList> = ({ handleDetailNavigation }) => {
  const searchText: string = useSelector((state: AppState) => state.searchText);
  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState<Boolean>(false);
  let filterOptions: FilterOptions = useSelector((state: AppState) => state.filterOptions);
  let viewMode: ViewMode = useSelector((state: AppState) => state.viewMode);

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

  let loadMore = () => {
    /*
    fetchMore basically allows you to do a new GraphQL query and merge the result into the original result.
    */
    if (viewMode.initialLoad) {
      dispatch(updateViewMode({ field: 'initialLoad', value: false }));
      fetchMore({
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
        updateQuery: (prev: any, { fetchMoreResult }: any) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            products: [...fetchMoreResult.products],
          });
        },
      });
    } else {
      fetchMore({
        variables: {
          matchedString: searchText,
          filterIndex: data ? data.products.length : 0,
          typer: filterGlobalToArray(filterOptions),
          prisgt: filterOptions.minPrice,
          prisls: filterOptions.maxPrice,
          volumgt: filterOptions.minVolum,
          volumls: filterOptions.maxVolum,
          sortIndex: 1,
        },
        updateQuery: (prev: any, { fetchMoreResult }: any) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            products: [...prev.products, ...fetchMoreResult.products],
          });
        },
      });
    }
    setIsFetching(false);
  };

  const handleEndReached = () => {
    dispatch(updateViewMode({ field: 'initialLoad', value: false }));
    setIsFetching(true);
  };

  useEffect(() => {
    if (!isFetching) return;

    loadMore();
  }, [isFetching]);

  useEffect(() => {
    if (searchText === '' || !viewMode.initialLoad) {
      return;
    }
    loadMore();
  }, [searchText, filterOptions]);

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
            <TouchableOpacity onPress={() => handleDetailNavigation(item.Varenavn)}>
              <ProductListItem varenavn={item.Varenavn} varetype={item.Varetype ?? ''} />
            </TouchableOpacity>
          )}
        />
      )}
    </DataTable>
  );
};

export default ProductList;
