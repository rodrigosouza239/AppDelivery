import * as React from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import { metrics, colors } from '../../styles';

import { useNavigation } from '@react-navigation/native';

import { Ionicons, Feather } from '@expo/vector-icons';

export default function SimpleHeader({ text, goBack }) {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <View>
          <Ionicons
            style={{ paddingHorizontal: 20 }}
            name="ios-arrow-back"
            size={33}
            color={colors.primary}
            onPress={
              goBack ? () => goBack() : () => navigation.goBack()
            }
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 22,
              color: colors.darker,
              fontWeight: '300',
            }}
          >
            {text}
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20 }} />
      </View>
    </SafeAreaView>
  );
}
