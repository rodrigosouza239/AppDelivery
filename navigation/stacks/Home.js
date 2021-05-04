import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from '../../screens/Home';
import Company from '../../screens/Company';
import Address from '../../screens/Address';
import Zipcode from '../../screens/Address/Zipcode';
import Cart from '../../screens/Cart';

import Login from '../../screens/Login';
import Register from '../../screens/Register';

export default function HomeStack({ navigation, route: { params } }) {
  React.useEffect(() => {
    console.tron.log('params no route', params);
    if (params) {
      const { screen, options } = params;
      if (screen) {
        navigation.reset({
          routes: [{ name: 'Home' }],
        });
        setTimeout(() => {
          navigation.navigate(screen, options);
        }, 50);
      }
    }
  }, [params]);
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Company" component={Company} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="Zipcode" component={Zipcode} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
