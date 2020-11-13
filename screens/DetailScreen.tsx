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
import { Button, Modal, Portal, Snackbar } from 'react-native-paper';
import { setModalOpen } from '../store/action';
import { AirbnbRating, Rating } from 'react-native-ratings';
import ReviewModal from '../components/Detail/ReviewModal';
import ProductReview from '../components/Detail/ProductReview';

const DetailScreen = ({ navigation }: any) => {
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const dispatch = useDispatch();
  const currentProduct = useSelector((state: AppState) => state.currentProduct);

  const { data, loading, error } = useQuery<SingleProductQuery>(GET_SINGLE_PRODUCT, {
    variables: { number: currentProduct ? currentProduct.Varenummer : '' },
  });

  if (error || !currentProduct) return <LoadingIndicator />;
  if (loading) return <LoadingIndicator />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProductInfo product={currentProduct} />
      {/* <ReviewModal /> */}
      <ProductReview onToggleSnackBar={onToggleSnackBar} />
      <Button
        style={styles.reviewButton}
        icon='star-half'
        mode='contained'
        onPress={() => dispatch(setModalOpen(true))}
      >
        Legg til en anmeldelse
      </Button>

      {/* <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button> */}
      <Snackbar
        duration={3000}
        style={styles.snackbar}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}
      >
        Hey there! I'm a Snackbar.
      </Snackbar>
    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    margin: 20,
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
  rating: {
    backgroundColor: 'blue',
  },
  reviewButton: {
    marginVertical: 15,
    width: 'auto',
  },
  snackbar: {
    margin: 0,
    backgroundColor: 'green',
    color: '#fff',
    position: 'absolute',
    top: 0,
  },
});
