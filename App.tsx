import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import ApolloWrapper from './components/ApolloWrapper';
import { Provider } from 'react-redux';
import { store } from './store/reducer';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#164075',
    accent: '#c7edff',
    background: '#ffffff',
  },
};

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloWrapper>
        <Provider store={store}>
          <SafeAreaProvider>
            <PaperProvider theme={theme}>
              <Navigation />
              <StatusBar />
            </PaperProvider>
          </SafeAreaProvider>
        </Provider>
      </ApolloWrapper>
    );
  }
}
