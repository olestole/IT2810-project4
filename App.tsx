import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { AppContextProvider } from './context';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#164075',
    accent: '#d68282',
  },
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AppContextProvider>
          <PaperProvider theme={theme}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </PaperProvider>
        </AppContextProvider>
      </SafeAreaProvider>
    );
  }
}
