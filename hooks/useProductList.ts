import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateViewMode } from '../store/action';
import { AppState, FilterOptions, ViewMode } from '../store/types';
import { filterGlobalToArray } from '../utils/product';

const useProductList = (data: any, fetchMore: any) => {
  const dispatch = useDispatch();
  const searchText: string = useSelector((state: AppState) => state.searchText);
  const [isFetching, setIsFetching] = useState<Boolean>(false);
  const filterOptions: FilterOptions = useSelector((state: AppState) => state.filterOptions);
  const viewMode: ViewMode = useSelector((state: AppState) => state.viewMode);

  const loadMore = async (data: any, fetchMore: any) => {
    // fetchMore basically allows you to do a new GraphQL query and merge the result into the original result.
    if (viewMode.initialLoad) {
      dispatch(updateViewMode({ field: 'initialLoad', value: false }));
      data &&
        (await fetchMore({
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
        }));
    } else {
      data &&
        (await fetchMore({
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
        }));
    }
    setIsFetching(false);
  };

  useEffect(() => {
    if (!isFetching) return;

    loadMore(data, fetchMore);
  }, [isFetching]);

  useEffect(() => {
    if (searchText === '' || !viewMode.initialLoad) {
      return;
    }
    loadMore(data, fetchMore);
  }, [searchText, filterOptions]);

  return { searchText, isFetching, setIsFetching, filterOptions, viewMode };
};

export default useProductList;
