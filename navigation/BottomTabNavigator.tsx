import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ProfileScreen from '../screens/ProfileScreen';
import TabOneScreen from '../screens/TabOneScreen';
import { BottomTabParamList, ProfileParamList, TabOneParamList, TabTwoParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName='Overview'
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name='Overview'
        component={ProductOverviewNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name='ios-person' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='Profile'
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name='ios-code' color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ProductOverviewStack = createStackNavigator<TabOneParamList>();

function ProductOverviewNavigator() {
  return (
    <ProductOverviewStack.Navigator>
      <ProductOverviewStack.Screen
        name='TabOneScreen'
        component={TabOneScreen}
        options={{ headerShown: false }}
      />
    </ProductOverviewStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileParamList>();

const ProfileNavigator = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name='Profile'
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
  </ProfileStack.Navigator>
);
