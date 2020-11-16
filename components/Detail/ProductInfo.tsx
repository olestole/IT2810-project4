import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Product } from '../../types/types';

import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

      <View>
        <View style={styles.priceContainer}>
          <View style={styles.priceContainer}>
            <MaterialIcons name='attach-money' size={24} color='black' />
            <Text style={styles.price}>{product.Pris}kr</Text>
          </View>
          <View style={styles.priceContainer}>
            <MaterialCommunityIcons name='water-outline' size={24} color='black' />
            <Text style={styles.price}>{product.Volum}L</Text>
          </View>
          <View style={styles.priceContainer}>
            <MaterialIcons name='face' size={24} color='black' />
            <Text style={styles.price}>{product.Produsent}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductInfo;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  imageContainer: {
    height: 400,
    width: 250,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 20,
    fontWeight: '700',
    textDecorationLine: 'underline',
    overflow: 'hidden',
  },
  headerContainer: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 18,
  },
});
