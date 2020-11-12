import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
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
  const [data, setData] = useState<IProduct[]>([]);

  const dataGenerator = () => {
    const res = [];
    for (let i = 0; i < 40; i++) {
      res.push({
        varenavn: 'Dom Perignon',
        varetype: 'Musserende',
      } as IProduct);
    }
    setData(res);
  };

  useEffect(() => {
    dataGenerator();
  }, []);

  return (
    <DataTable style={styles.tableContainer}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title>Varenavn</DataTable.Title>
        <DataTable.Title numeric>Varetype</DataTable.Title>
      </DataTable.Header>

      {data && (
        <FlatList
          style={styles.flatList}
          onEndReachedThreshold={0.5}
          onEndReached={() => console.log('END')}
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleDetailNavigation(item.varenavn)}>
              <ProductListItem varenavn={item.varenavn} varetype={item.varetype} />
            </TouchableOpacity>
          )}
        />
      )}
    </DataTable>
  );
};

export default ProductList;
