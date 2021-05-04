import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage, Alert } from 'react-native';
import * as RootNavigation from '../services/navigation';

import Tab from './Tab';
import AuthTab from './AuthTab';
import Loading from '../screens/Loading';
import { Creators as LoginActions } from '../store/ducks/login';
import { Creators as OrderActions } from '../store/ducks/order';

const Stack = createStackNavigator();

export default function Router({ isLoadingComplete }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const login = useSelector(state => state.login);

  useEffect(() => {
    const askPermission = async dp => {
      const { status } = await Permissions.askAsync(
        Permissions.NOTIFICATIONS,
      );

      if (status !== 'granted') {
        Alert.alert(
          'Erro',
          'Permissão de notificação não concedida!',
        );
      } else {
        Notifications.addListener(notification => {
          const { origin, data } = notification;
          dispatch(
            OrderActions.getOrders({
              filters: 'pending,accepted,on_way',
            }),
          );
          if (origin === 'selected' && dp && data?.redirect) {
            const {
              screen: { stack, screen: scr, options },
            } = JSON.parse(data?.redirect || {});
            if (stack && scr) {
              RootNavigation.navigate(stack, {
                screen: scr,
                options,
              });
            }
          }
        });
      }
    };
    async function refresh() {
      const refreshToken = await AsyncStorage.getItem(
        '@@DELIVERIE@@:refreshToken',
      );
      const email = await AsyncStorage.getItem('@@DELIVERIE@@:email');
      if (refreshToken) {
        dispatch(
          LoginActions.refreshLoginRequest({
            refreshToken,
            email,
          }),
        );
      } else {
        await AsyncStorage.removeItem('@@DELIVERIE@@:token');
      }
      setLoading(false);
    }
    refresh();
    askPermission(dispatch);
  }, []);

  if (loading || !isLoadingComplete) {
    return <Stack.Screen name="Loading" component={Loading} />;
  }

  return (
    <Stack.Navigator headerMode="none">
      {login.data !== null ? (
        <Stack.Screen name="MainTab" component={AuthTab} />
      ) : (
        <Stack.Screen name="Tab" component={Tab} />
      )}
    </Stack.Navigator>
  );
}
