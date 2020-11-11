import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Button, ColorSchemeName } from 'react-native';
import Header from '../components/Header';
import DetailScreen from '../screens/DetailScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import OverviewScreen from '../screens/OverviewScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerLeft: () => <Button title='halla' onPress={() => console.log('hallais')} />,
        // title: 'Hallais',
        // header: ({ scene, previous, navigation }) => (
        //   <Header scene={scene} previous={previous} navigation={navigation} />
        // ),
      }}
    >
      <Stack.Screen
        name='Overview'
        component={OverviewScreen}
        options={{
          title: 'Overview',
          headerTitle: 'Overview',
          headerLeft: () => <Button title='yo' onPress={() => console.log('hallais')} />,
        }}
      />
      <Stack.Screen
        name='Detail'
        component={DetailScreen}
        options={{
          headerTitle: 'Detail',
        }}
      />
      <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
