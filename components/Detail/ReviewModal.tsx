import React from 'react';
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';
import { useDispatch, useSelector } from 'react-redux';
import { setModalOpen } from '../../store/action';
import { AppState } from '../../store/types';
import ReviewInput from './ReviewInput';

const ReviewModal: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state: AppState) => state.modalOpen);

  return (
    <Portal>
      <Modal
        visible={modalOpen}
        onDismiss={() => dispatch(setModalOpen(false))}
        contentContainerStyle={styles.modal}
      >
        {children}
      </Modal>
    </Portal>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fff',
    width: '80%',
    height: '80%',
    padding: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
});
