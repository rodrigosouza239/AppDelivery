import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TabBarIcon from '../components/TabBarIcon';
import HomeStack from './stacks/Home';
import AuthStack from './stacks/auth';
import { Creators as NotificationActions } from '../store/ducks/notifications';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ??
    INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Início';
    case 'Links':
      return 'Links to learn more';
    default:
      return '';
  }
}

export default function Tab({ navigation, route }) {
  const dispatch = useDispatch();
  const { screen } = useSelector(state => state.notifications);
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  React.useEffect(() => {
    if (screen) {
      const { screen: scr, stack, options } = screen;
      navigation.navigate(stack, { screen: scr, options });
      dispatch(NotificationActions.resetScreen());
    }
  }, [screen]);

  return (
    <BottomTab.Navigator
      tabBarOptions={{ activeTintColor: '#FB7944' }}
      initialRouteName={INITIAL_ROUTE_NAME}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: 'Início',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="home" />
          ),
          tabBarVisible: !route.state?.routes[0]?.state?.index,
        }}
      />
      <BottomTab.Screen
        name="Orders"
        component={AuthStack}
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="package" />
          ),
        }}
      />
      {/*<BottomTab.Screen
        name="Settings"
        component={AuthStack}
        options={{
          title: 'Configurações',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="settings" />
          ),
        }}
      />*/}
      <BottomTab.Screen
        name="Account"
        component={AuthStack}
        options={{
          title: 'Conta',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="user" />
          ),
          tabBarVisible: !route.state?.routes[0]?.state?.index,
        }}
      />
    </BottomTab.Navigator>
  );
}
