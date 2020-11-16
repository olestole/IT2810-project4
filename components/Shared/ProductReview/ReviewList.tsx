import { ApolloError } from '@apollo/client';
import React from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { AppState } from '../../../store/types';
import { IReview } from '../../../types/types';
import DefaultItem from './DefaultItem';
import ReviewItem from './ReviewItem';

interface IReviewList {
  reviews: IReview[];
  error?: ApolloError | null | undefined;
  user?: any;
}

const ReviewList: React.FC<IReviewList> = ({ reviews, error }) => {
  const addedReview = useSelector((state: AppState) => state.addedReview);

  const renderReviews = () => {
    if (error || !reviews) {
      return (
        <DefaultItem title={'Something wrong happened'} description={'Try to refresh the page'} />
      );
    } else if (reviews.length > 0 || addedReview) {
      if (addedReview) {
        return reviews.concat(addedReview).map((review: IReview | null, index: number) => {
          if (review !== null) {
            return <ReviewItem key={index} review={review} />;
          }
        });
      } else {
        return reviews.map((review: IReview | null, index: number) => {
          if (review !== null) {
            return <ReviewItem key={index} review={review} />;
          }
        });
      }
    } else if (reviews.length === 0) {
      return (
        <DefaultItem
          title={'Ingen produktanmeldelser'}
          description={'Dette produktet har ikke blitt anmeldt enda - vær den første!'}
        />
      );
    }
  };

  return <View style={{ marginBottom: 50 }}>{renderReviews()}</View>;
};

export default ReviewList;
