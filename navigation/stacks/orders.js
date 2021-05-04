import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Orders from '../../screens/Orders';
import OrderDetail from '../../screens/OrderDetail';
import OrderStatus from '../../screens/OrderStatus';

const Stack = createStackNavigator();

export default function OrdersStack({
  navigation,
  route: { params },
}) {
  React.useEffect(() => {
    if (params) {
      const { screen, options } = params;
      if (screen) {
        navigation.reset({
          routes: [{ name: 'OrdersList' }],
        });
        setTimeout(() => {
          navigation.navigate(screen, options);
        }, 50);
      }
    }
  }, [params]);

  return (
    <Stack.Navigator headerMode="none" initialRouteName="OrdersList">
      <Stack.Screen name="OrdersList" component={Orders} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
      <Stack.Screen name="OrderStatus" component={OrderStatus} />
    </Stack.Navigator>
  );
}
