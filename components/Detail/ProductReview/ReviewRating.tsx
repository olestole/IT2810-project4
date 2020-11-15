import React from 'react';
import { StyleSheet } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

interface IRating {
  rating: number;
  setRating: (value: number) => void;
  inputError: boolean;
}

const ReviewRating: React.FC<IRating> = ({ rating, setRating, inputError }) => {
  const handleFinishedRating = (value: number) => {
    setRating(value);
  };

  return (
    <AirbnbRating
      count={5}
      reviews={['Terrible', 'OK', 'Good', 'Very Good', 'Unbelievable']}
      defaultRating={rating}
      size={35}
      showRating={false}
      onFinishRating={handleFinishedRating}
    />
  );
};

export default ReviewRating;

const styles = StyleSheet.create({});
