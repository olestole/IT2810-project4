import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { AppState } from '../../../store/types';
import { AddReviewMutation } from '../../../graphql/generated/AddReviewMutation';
import { ADD_REVIEW } from '../../../graphql';
import { InputReview } from '../../../types/graphql-global-types';
import { setAddedReview, setModalOpen } from '../../../store/action';
import ReviewModal from './ReviewModal';
import { Button } from 'react-native-paper';
import ReviewRating from './ReviewRating';
import { ReviewDescription, ReviewTitle } from './ReviewInput';

const ProductReview = () => {
  const currentProduct = useSelector((state: AppState) => state.currentProduct);
  const dispatch = useDispatch();

  const [addReview] = useMutation<AddReviewMutation>(ADD_REVIEW);

  const [inputError, setInputError] = useState(false);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');

  const submitReview = async () => {
    const review = {
      // The userEmail is set like this because I don't implement Auth0 the same way as in project3, while reusing most of the backend
      userEmail: 'test@prosjekt4.com',
      varenummer: currentProduct!.Varenummer,
      title: reviewTitle,
      description: description,
      rating: rating,
    } as InputReview;

    await addReview({
      variables: { addReviewReview: review },
    });

    // Don't wait for the data from useMutation when we already have it locally
    dispatch(setAddedReview(review));
  };

  const handleSubmitReview = async () => {
    // If any of the fields haven't been filled out
    if (!currentProduct) {
      // TODO: Add a feedback in the form of a snackbar or a toast
      return;
    }
    if (!(rating >= 1 && rating <= 5 && description !== '' && reviewTitle !== '')) {
      setInputError(true);
    } else {
      await submitReview();
      dispatch(setModalOpen(false));

      setRating(0);
      setDescription('');
      setReviewTitle('');
      setInputError(false);
    }
  };

  return (
    <ReviewModal>
      <ReviewTitle
        reviewTitle={reviewTitle}
        setReviewTitle={setReviewTitle}
        inputError={inputError}
      />
      <ReviewRating rating={rating} setRating={setRating} inputError={inputError} />
      <ReviewDescription
        description={description}
        setDescription={setDescription}
        inputError={inputError}
      />
      <Button mode='contained' onPress={handleSubmitReview}>
        Lagre anmeldelse
      </Button>
    </ReviewModal>
  );
};

export default ProductReview;
