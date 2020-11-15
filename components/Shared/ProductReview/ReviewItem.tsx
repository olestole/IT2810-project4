import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { IReview } from '../../../types/types';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 4,
    padding: 10,

    backgroundColor: '#fff',

    borderRadius: 5,

    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  textContainer: {
    margin: 0,
    padding: 0,
    marginLeft: 20,
    flexDirection: 'column',
  },
  ratingContainer: {
    flexDirection: 'column',

    justifyContent: 'center',
  },
  header: {
    fontWeight: '700',
    margin: 0,
    marginBottom: 5,
    padding: 0,
  },
  icon: {
    color: 'gold',
    margin: 0,
  },
});

interface IReviewItem {
  review: IReview;
}

const ReviewItem = ({ review }: IReviewItem) => {
  return (
    <View style={styles.root}>
      <View style={styles.ratingContainer}>
        <MaterialIcons name='mood' size={24} color='gold' />
        <Text>{`${review.rating}/5`}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.header}>{review.title}</Text>
        <Text>{review.description}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
