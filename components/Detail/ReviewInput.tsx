import React from 'react';
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { TextInput } from 'react-native-paper';

const styles = StyleSheet.create({});

interface IProductInput {
  description: string;
  setDescription: (value: string) => void;
  inputError: boolean;
}

export const ReviewDescription: React.FC<IProductInput> = ({
  description,
  setDescription,
  inputError,
}) => {
  return (
    <TextInput
      blurOnSubmit
      label='Beskrivelse av produktet'
      multiline
      mode='outlined'
      defaultValue={description}
      onChangeText={(value) => setDescription(value)}
      error={inputError && !description}
    />
  );
};

interface IReviewTitle {
  reviewTitle: string;
  setReviewTitle: (value: string) => void;
  inputError: boolean;
}

export const ReviewTitle: React.FC<IReviewTitle> = ({
  reviewTitle,
  setReviewTitle,
  inputError,
}) => {
  const handleChange = (value: string) => {
    setReviewTitle(value);
  };
  return (
    <TextInput
      label='Tittel på anmeldelse'
      mode='outlined'
      defaultValue={reviewTitle}
      onChangeText={handleChange}
      error={inputError && !reviewTitle}
    />
  );
};
