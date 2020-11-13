import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import LoadingIndicator from '../components/Shared/LoadingIndicator';
import { GET_SINGLE_PRODUCT } from '../graphql';
import { AppState } from '../store/types';
import { useDispatch, useSelector } from 'react-redux';
import { SingleProductQuery } from '../graphql/generated/SingleProductQuery';
import ProductInfo from '../components/Detail/ProductInfo';
import { Button, Modal, Portal } from 'react-native-paper';
import { setModalOpen } from '../store/action';

const DetailScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const currentProduct = useSelector((state: AppState) => state.currentProduct);
  const modalOpen = useSelector((state: AppState) => state.modalOpen);

  const { data, loading, error } = useQuery<SingleProductQuery>(GET_SINGLE_PRODUCT, {
    variables: { number: currentProduct ? currentProduct.Varenummer : '' },
  });

  if (error || !currentProduct) return <LoadingIndicator />;
  if (loading) return <LoadingIndicator />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProductInfo product={currentProduct} />
      <Portal>
        <Modal
          visible={modalOpen}
          onDismiss={() => console.log('lukk')}
          contentContainerStyle={styles.modal}
        >
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <Button style={{ marginTop: 30 }} onPress={() => dispatch(setModalOpen(true))}>
        Show
      </Button>
    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
  modal: {},
});
