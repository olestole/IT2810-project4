import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setModalOpen } from '../../../store/action';
import { AppState } from '../../../store/types';
import { MaterialIcons } from '@expo/vector-icons';

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
        <TouchableOpacity style={styles.exit} onPress={() => dispatch(setModalOpen(false))}>
          <MaterialIcons name='close' size={24} color='black' />
        </TouchableOpacity>
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
    maxHeight: '80%',
    padding: 20,
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  exit: {
    alignSelf: 'flex-end',
  },
});
