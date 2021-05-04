import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../../styles';

export const Badge = ({ title, desc }) => (
  <View
    style={{
      backgroundColor: colors.primaryLight,
      width: 100,
      height: 60,
      borderRadius: 10,
    }}
  >
    <View style={{}}>
      <Text
        style={{
          color: 'white',
          fontFamily: 'roboto-light',
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
    </View>
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <Text
        style={{
          color: 'white',
          fontFamily: 'roboto-bold',
        }}
      >
        {desc}
      </Text>
    </View>
  </View>
);
