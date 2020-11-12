import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoadingIndicator from '../components/Shared/LoadingIndicator';
import { GET_SINGLE_PRODUCT } from '../graphql';
import { AppState } from '../store/types';
import { useDispatch, useSelector } from 'react-redux';

const DetailScreen = ({ navigation }: any) => {
  const { data, loading, error } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { number: '255' },
  });
  const currentProduct = useSelector((state: AppState) => state.currentProduct);
  const modalOpen = useSelector((state: AppState) => state.modalOpen);

  useEffect(() => {
    console.log(currentProduct);
  }, [currentProduct]);

  if (loading) return <LoadingIndicator />;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Overview')}>
        <Text>Detail-screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
