/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
const colors = {
  pending: '#2ccce4',
  on_way: '#dce775',
  done: '#37d67a',
  accepted: '#593C8F',
  cancelado: '#f47373',
  white: '#fff',
};
const OrderStatus = ({ route: { params } }) => {
  const renderImage = () => {
    if (!params?.order_status) {
      return (
        <MaterialCommunityIcons
          name="timer"
          size={54}
          color="black"
        />
      );
    }
    const { order_status } = params;
    if (order_status === 'pending') {
      return (
        <MaterialCommunityIcons
          name="timer"
          size={64}
          color="rgba(255,255,255,0.4)"
        />
      );
    }
    if (order_status === 'accepted') {
      return (
        <Feather
          name="shopping-cart"
          size={64}
          color="rgba(255,255,255,0.4)"
        />
      );
    }
    if (order_status === 'on_way') {
      return (
        <Feather name="package" size={64} color="rgba(0,0,0,0.4)" />
      );
    }
    if (order_status === 'done') {
      return (
        <Feather
          name="check-circle"
          size={64}
          color="rgba(255,255,255,0.4)"
        />
      );
    }
    if (order_status === 'cancelled') {
      return (
        <MaterialCommunityIcons
          name="timer"
          size={64}
          color="rgba(255,255,255,0.4)"
        />
      );
    }
    return (
      <MaterialCommunityIcons
        name="timer"
        size={64}
        color="rgba(255,255,255,0.4)"
      />
    );
  };

  const renderText = () => {
    if (!params?.order_status) {
      return null;
    }
    const { order_status } = params;
    if (order_status === 'pending') {
      return (
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: 'roboto',
              fontSize: 18,
              color: colors.white,
            }}
          >
            Pedido pendente
          </Text>
          <Text
            style={{
              fontFamily: 'roboto-light',
              fontSize: 16,
              color: colors.white,
              marginTop: 10,
              textAlign: 'center',
            }}
          >
            Assim que o estabelecimento aceitar o seu pedido voc?? ser??
            informado
          </Text>
        </View>
      );
    }
    if (order_status === 'accepted') {
      return (
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: 'roboto',
              fontSize: 18,
              color: colors.white,
            }}
          >
            Pedido aceito!
          </Text>
          <Text
            style={{
              fontFamily: 'roboto-light',
              fontSize: 16,
              color: colors.white,
              textAlign: 'center',
            }}
          >
            Seu pedido foi aceito com sucesso, aguarde at?? ele ser
            entregue at?? voc??. :)
          </Text>
        </View>
      );
    }
    if (order_status === 'on_way') {
      return (
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: 'roboto',
              fontSize: 18,
              color: '#333',
            }}
          >
            Pedido ?? caminho
          </Text>
          <Text
            style={{
              fontFamily: 'roboto-light',
              fontSize: 16,
              marginTop: 10,
              textAlign: 'center',
            }}
          >
            Oba! Seu pedido acabou de sair para entrega.
          </Text>
        </View>
      );
    }
    if (order_status === 'done') {
      return (
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: 'roboto',
              fontSize: 18,
              color: colors.white,
            }}
          >
            Pedido conclu??do
          </Text>
          <Text
            style={{
              fontFamily: 'roboto-light',
              fontSize: 16,
              textAlign: 'center',
              color: colors.white,
              marginTop: 10,
            }}
          >
            A empresa confirmou a entrega do seu pedido, em instantes
            voc?? poder?? avalia-lo. Caso algo tenha dado errado voc??
            pode contactar a empresa e caso n??o obtenha resposta, o
            nosso suporte :)
          </Text>
        </View>
      );
    }
    if (order_status === 'cancelled') {
      return (
        <View>
          <Text style={{ fontFamily: 'roboto', fontSize: 18 }}>
            Pedido cancelado
          </Text>
          <Text style={{ fontFamily: 'roboto-light', fontSize: 16 }}>
            Seu pedido foi cancelado pelo estabelecimento!
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors[params?.order_status],
      }}
    >
      <Text
        style={{
          fontFamily: 'roboto',
          fontSize: 18,
          color: colors.white,
        }}
      >
        #{params?.id}
      </Text>
      <View style={{ marginBottom: 15, marginTop: 5 }}>
        {renderImage()}
      </View>
      {renderText()}
    </View>
  );
};

export default OrderStatus;
