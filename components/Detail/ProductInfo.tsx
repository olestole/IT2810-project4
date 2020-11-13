import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Product } from '../../types/types';

const baseURL = 'https://bilder.vinmonopolet.no/cache/800x800-0/';

interface IProductInfo {
  product: Product;
}

const ProductInfo: React.FC<IProductInfo> = ({ product }) => {
  const url = baseURL + product.Varenummer + '-1.jpg';

  return (
    <View style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: url }} style={styles.image} />
      </View>
      <ScrollView horizontal={true} style={styles.headerContainer}>
        <Text numberOfLines={1} style={styles.productName}>
          {product.Varenavn}
        </Text>
      </ScrollView>
      <Text>{product.Pris}kr</Text>
      <Text>{product.Volum}</Text>
      <Text>{product.Produsent}</Text>
      <Text>{product.Farge}</Text>
      <Text>{product.Land}</Text>
      <Text>{product.Lukt}</Text>
      <Text>{product.Smak}</Text>
    </View>
  );
};

export default ProductInfo;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 20,
    height: 400,
    width: 250,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  productName: {
    margin: 15,
    fontSize: 20,
    fontWeight: '700',
    textDecorationLine: 'underline',
    overflow: 'hidden',
  },
  headerContainer: {},
});
