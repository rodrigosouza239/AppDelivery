import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import TabBarIcon from '../components/TabBarIcon';
import LinksScreen from '../screens/LinksScreen';
import HomeStack from './stacks/Home';
import AccountStack from './stacks/account';
import OrderstStack from './stacks/orders';
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

export default function AuthTab({ navigation, route }) {
  const dispatch = useDispatch();
  const login = useSelector(state => state.login);
  const { screen } = useSelector(state => state.notifications);
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  // React.useEffect(() => {
  //   if (screen) {
  //     const { screen: scr, stack, options } = screen;
  //     console.tron.log('navigate', screen);
  //     navigation.navigate(stack, { screen: scr, options });
  //     dispatch(NotificationActions.resetScreen());
  //   }
  // }, [screen]);

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
        component={OrderstStack}
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="package" />
          ),
        }}
      />
      {/*<BottomTab.Screen
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
        component={AccountStack}
        options={{
          title:
            login.data !== null
              ? login.data.user.name
                  .split(' ')
                  .slice(0, -1)
                  .join(' ')
              : 'Conta',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="user" />
          ),
          tabBarVisible: !route.state?.routes[0]?.state?.index,
        }}
      />
    </BottomTab.Navigator>
  );
}
