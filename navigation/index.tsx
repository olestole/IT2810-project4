import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, IconButton, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import DetailScreen from '../screens/DetailScreen';
import OverviewScreen from '../screens/OverviewScreen';
import { setAddedReview, setCurrentProduct } from '../store/action';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Filter from '../components/Drawer/Filter';

// If you are not familiar with React Navigation, I recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation() {
  return (
    <NavigationContainer>
      <OverviewNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const OverviewNavigator = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const handleDetailBack = (navigation: any) => {
    navigation.navigate('Overview');
    dispatch(setCurrentProduct(null));
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
            <IconButton color='white' icon='magnify' onPress={() => navigation.toggleDrawer()} />
          ),
        })}
      />
      <Stack.Screen
        name='Detail'
        component={DetailScreen}
        options={({ navigation }) => ({
          headerTitle: 'Detail',

          headerLeft: () => (
            <IconButton
              color='white'
              icon='keyboard-backspace'
              onPress={() => handleDetailBack(navigation)}
            />
          ),
        })}
      />
    </Drawer.Navigator>
  );
};
