import { useQuery } from '@apollo/client';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LoadingIndicator from '../components/Shared/LoadingIndicator';
import { GET_REVIEWS } from '../graphql';
import { AppState } from '../store/types';
import { useDispatch, useSelector } from 'react-redux';
import ProductInfo from '../components/Detail/ProductInfo';
import { Button } from 'react-native-paper';
import { setModalOpen } from '../store/action';
import { ProductReview } from '../components/Detail/ProductReview';
import ReviewList from '../components/Shared/ProductReview/ReviewList';
import { IReview } from '../types/types';
import { GetReviewsQuery } from '../graphql/generated/GetReviewsQuery';
import ErrorIndicator from '../components/Shared/ErrorIndicator';

const styles = StyleSheet.create({
  container: {
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
});

const DetailScreen = () => {
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
      <ProductReview />
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
    </ScrollView>
  );
};

export default DetailScreen;
