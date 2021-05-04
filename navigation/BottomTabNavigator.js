import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import Home from '../screens/Home';
import LinksScreen from '../screens/LinksScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator
      tabBarOptions={{ activeTintColor: '#FB7944' }}
      initialRouteName={INITIAL_ROUTE_NAME}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Início',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="home" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Orders"
        component={LinksScreen}
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="package" />
          ),
        }}
      />
      {/* <BottomTab.Screen
        name="Settings"
        component={LinksScreen}
        options={{
          title: 'Configurações',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="settings" />
          ),
        }}
      />*/}
      <BottomTab.Screen
        name="Account"
        component={LinksScreen}
        options={{
          title: 'Conta',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="user" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ??
    INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Início';
    case 'Links':
      return 'Links to learn more';
  }
}
