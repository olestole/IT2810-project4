import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, View, Text } from 'react-native';
import { Button, IconButton, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import DetailScreen from '../screens/DetailScreen';
import FilterScreen from '../screens/FilterScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import OverviewScreen from '../screens/OverviewScreen';
import { setAddedReview, setCurrentProduct } from '../store/action';
import { RootStackParamList } from '../types/types';
import LinkingConfiguration from './LinkingConfiguration';

import {
  createDrawerNavigator,
  DrawerContent,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import Filter from '../components/Drawer/Filter';
import { useEffect } from 'react';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer>
      <OverviewNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const OverviewNavigator = () => {
  const { colors } = useTheme();

  const dispatch = useDispatch();

  const handleDetailBack = (navigation: any) => {
    navigation.navigate('Overview');
    // dispatch(setCurrentProduct(null));
    dispatch(setAddedReview(null));
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => <Filter {...props} />}
      sceneContainerStyle={{ backgroundColor: colors.background }}
      drawerStyle={{
        backgroundColor: colors.background,
      }}
      screenOptions={{
        headerTintColor: colors.background,
        headerStyle: {
          backgroundColor: colors.primary,
        },
      }}
    >
      <Stack.Screen
        name='Overview'
        component={OverviewScreen}
        options={({ navigation }) => ({
          title: 'Overview',
          headerTitle: 'Overview',
          headerLeft: () => (
            <IconButton color='white' icon='menu' onPress={() => navigation.toggleDrawer()}>
              Tilbake
            </IconButton>
          ),
          headerRight: () => (
            <IconButton color='white' icon='magnify' onPress={() => navigation.toggleDrawer()}>
              Tilbake
            </IconButton>
          ),
        })}
      />
      <Stack.Screen
        name='Detail'
        component={DetailScreen}
        options={({ navigation }) => ({
          headerTitle: 'Detail',

          headerLeft: () => (
            <Button
              compact
              color='white'
              icon='keyboard-backspace'
              onPress={() => handleDetailBack(navigation)}
            >
              Tilbake
            </Button>
          ),
        })}
      />
      <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Drawer.Navigator>
  );
};

// function RootNavigator() {
//   const { colors } = useTheme();

//   const dispatch = useDispatch();

//   const handleDetailBack = (navigation: any) => {
//     navigation.navigate('Overview');
//     dispatch(setCurrentProduct(null));
//     dispatch(setAddedReview(null));
//   };

//   return (
//     <Stack.Navigator
//       screenOptions={{
//         // headerShown: false,
//         cardStyle: {
//           backgroundColor: '#fff',
//         },
//         headerTintColor: '#fff',
//         headerStyle: {
//           backgroundColor: colors.primary,
//         },
//       }}
//     >
//       <Stack.Screen
//         name='Overview'
//         component={OverviewScreen}
//         options={({ navigation }) => ({
//           cardStyle: {
//             backgroundColor: '#fff',
//           },
//           title: 'Overview',
//           headerTitle: 'Overview',
//           // headerLeft: () => (
//           //   <IconButton color='white' icon='menu' onPress={() => console.log('Meny')}>
//           //     Tilbake
//           //   </IconButton>
//           // ),
//         })}
//       />
//       <Stack.Screen
//         name='Detail'
//         component={DetailScreen}
//         options={({ route, navigation }) => ({
//           headerTitle: 'Detail',
//           headerLeft: () => (
//             <Button
//               compact
//               color='white'
//               icon='keyboard-backspace'
//               onPress={() => handleDetailBack(navigation)}
//             >
//               Tilbake
//             </Button>
//           ),
//         })}
//       />
//       <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: 'Oops!' }} />
//     </Stack.Navigator>
//   );
// }
