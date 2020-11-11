import { useRoute } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Appbar, Avatar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import AppContext from '../context/appContext';

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'gold',
    marginHorizontal: 20,
    marginVertical: 5,
  },
});

const Header = ({ scene, previous, navigation }: any) => {
  const { appState, appDispatch } = useContext(AppContext);
  // const title = appState.currentTab ?? '';

  return (
    <Appbar.Header style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          console.log('Halla bro');
        }}
      >
        <MaterialIcons name='menu' size={32} color='white' />
      </TouchableOpacity>
      {/* <Text>{title}</Text> */}
    </Appbar.Header>
  );
};

export default Header;
