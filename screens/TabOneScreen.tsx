import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button, useTheme } from 'react-native-paper';

import EditScreenInfo from '../components/EditScreenInfo';
import ProductList from '../components/Overview/ProductList';
import { Text, View } from '../components/Themed';
import AppContext from '../context/appContext';

export default function TabOneScreen() {
  const [input, setInput] = useState('');
  const { colors } = useTheme();

  const { appState, appDispatch } = useContext(AppContext);
  useEffect(() => {
    appDispatch({ type: 'setCurrentTab', payload: 'TAB ONE' });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
      <TextInput
        placeholder='You can type here'
        style={styles.inputField}
        value={input}
        onChangeText={(text) => setInput(text)}
      />
      <Button icon='camera' mode='contained' color={colors.primary}>
        Halla
      </Button>
      <ProductList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
