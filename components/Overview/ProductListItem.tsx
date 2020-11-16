import React from 'react';
import { View } from 'react-native';
import { DataTable } from 'react-native-paper';

interface IProductListItem {
  varenavn: string;
  varetype: string;
}

const ProductListItem: React.FC<IProductListItem> = ({ varenavn, varetype }) => {
  return (
    <View>
      <DataTable.Row>
        <DataTable.Cell>{varenavn}</DataTable.Cell>
        <DataTable.Cell numeric>{varetype}</DataTable.Cell>
      </DataTable.Row>
    </View>
  );
};

export default ProductListItem;
