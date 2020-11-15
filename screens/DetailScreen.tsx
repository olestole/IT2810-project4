import { useQuery } from '@apollo/client';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LoadingIndicator from '../components/Shared/LoadingIndicator';
import { GET_REVIEWS, GET_SINGLE_PRODUCT } from '../graphql';
import { AppState } from '../store/types';
import { useDispatch, useSelector } from 'react-redux';
import { SingleProductQuery } from '../graphql/generated/SingleProductQuery';
import ProductInfo from '../components/Detail/ProductInfo';
import { Button, Snackbar } from 'react-native-paper';
import { setModalOpen } from '../store/action';
import { ProductReview } from '../components/Detail/ProductReview';
import ReviewList from '../components/Shared/ProductReview/ReviewList';
import { IReview } from '../types/types';
import { GetReviewsQuery } from '../graphql/generated/GetReviewsQuery';
import ErrorIndicator from '../components/Shared/ErrorIndicator';

const styles = StyleSheet.create({
  container: {
    margin: 20,
    // flex: 1,
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

const DetailScreen = ({ navigation }: any) => {
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const dispatch = useDispatch();
  const currentProduct = useSelector((state: AppState) => state.currentProduct);

  const { data: reviewData, loading, error } = useQuery<GetReviewsQuery>(GET_REVIEWS, {
    variables: { reviewsVarenummer: currentProduct ? currentProduct.Varenummer : '' },
    fetchPolicy: 'network-only',
  });

  if (error || !currentProduct) return <ErrorIndicator />;
  if (loading || loading) return <LoadingIndicator />;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
    >
      <ProductInfo product={currentProduct} />
      <ProductReview onToggleSnackBar={onToggleSnackBar} />
      <Button
        style={styles.reviewButton}
        icon='star-half'
        mode='contained'
        onPress={() => dispatch(setModalOpen(true))}
      >
        Legg til en anmeldelse
      </Button>

      {loading ? (
        <Text>Laster anmeldelser</Text>
      ) : (
        <ReviewList reviews={reviewData ? (reviewData.reviews as IReview[]) : []} />
      )}

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
