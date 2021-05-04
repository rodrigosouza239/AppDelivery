import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  Value,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import {
  State,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import { withSpring, onGestureEvent } from 'react-native-redash';
import { useSelector } from 'react-redux';
import { colors } from '../../../styles';
import { monetize } from '../../../utils';

export const Cart = ({ customColors }) => {
  const { cart } = useSelector(state => state.cart);

  const getAllPrice = () => {
    const cartMap = cart.map(e => {
      const values = Object.values(e.selectedAttr);
      if (!values.length) {
        return e.price * e.qty;
      }
      let price = 0;
      values.forEach(f => {
        if (f.length) {
          if (f.length > 1) {
            price += f.reduce((ac, v) => ac.price + v.price) * e.qty;
          } else {
            price += f[0].price * e.qty;
          }
        } else {
          price += f?.prices[0]?.price * e.qty;
        }
      });
      // const findPrice = Object.values(e.selectedAttr).find(
      //   f => f.prices.price,
      // );
      // if (findPrice) {
      //   return findPrice.prices.price * e.qty;
      // }
      // return e.price;
      return price;
    });
    const soma = cartMap.reduce((ac, cv) => ac + cv);
    return monetize(soma);
  };

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: customColors.secondary,
        marginHorizontal: 10,
        borderRadius: 4,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
      }}
    >
      <Ionicons name="md-cart" size={24} color="white" />
      <View>
        {cart.length === 0 ? (
          <Text
            style={{
              color: 'white',
              marginLeft: 5,
              fontSize: 17,
              fontWeight: 'bold',
            }}
          >
            Seu carrinho esta vázio :(
          </Text>
        ) : (
          <Text
            style={{
              color: 'white',
              marginLeft: 5,
              fontSize: 16,
              fontWeight: 'roboto-light',
            }}
          >
            Carrinho no valor de {getAllPrice()}
          </Text>
        )}
      </View>
    </View>
  );
};
