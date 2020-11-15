import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { AppContextProvider } from './context';
import ApolloWrapper from './components/ApolloWrapper';
import { Provider } from 'react-redux';
import { store } from './store/reducer';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#164075',
    accent: '#d88080',
    background: '#ffffff',
  },
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloWrapper>
        <Provider store={store}>
          <SafeAreaProvider>
            <AppContextProvider>
              <PaperProvider theme={theme}>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </PaperProvider>
            </AppContextProvider>
          </SafeAreaProvider>
        </Provider>
      </ApolloWrapper>
    );
  }
}
