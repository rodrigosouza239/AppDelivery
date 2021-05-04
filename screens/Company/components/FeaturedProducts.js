import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Animated, {
  interpolate,
  Value,
  multiply,
  sub,
  add,
} from 'react-native-reanimated';
import { colors } from '../../../styles';

export const FeaturedProducts = () => {
  const offsetX = new Value(0);
  const CARD_WIDTH = 200;

  const scale = index =>
    interpolate(offsetX, {
      inputRange: [
        multiply(sub(index, 1), CARD_WIDTH),
        multiply(index, CARD_WIDTH),
        multiply(add(index, 1), CARD_WIDTH),
      ],
      outputRange: [0.9, 1, 0.9],
    });

  return (
    <View>
      <Text
        style={{
          fontFamily: 'roboto-bold',
          fontSize: 18,
          color: colors.dark,
          marginLeft: 5,
        }}
      >
        PRODUTOS EM DESTAQUE
      </Text>
      <View
        style={{
          paddingTop: 10,
          paddingBottom: 40,
        }}
      >
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="right"
          decelerationRate="fast"
          snapToInterval={200}
          scrollEventThrottle={1}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: offsetX,
                },
              },
            },
          ])}
        >
          {[...Array(5).keys()].map(e => (
            <TouchableOpacity key={e}>
              <Animated.View
                style={{
                  backgroundColor: colors.primaryDark,
                  borderRadius: 10,
                  padding: 10,
                  width: CARD_WIDTH,
                  alignItems: 'center',
                  marginRight: 5,
                  transform: [
                    {
                      scale: scale(e),
                    },
                  ],
                }}
              >
                <Image
                  source={{
                    uri:
                      'https://www.itambe.com.br/portal/Images/Produto/110119leiteuhtsemidesnatado1lt_medium.png',
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'roboto-light',
                    color: colors.lighter,
                  }}
                >
                  PRODUTO 1
                </Text>
                <Text
                  style={{
                    fontFamily: 'roboto-bold',
                    color: colors.lighter,
                  }}
                >
                  R$ 10,00
                </Text>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
      </View>
    </View>
  );
};
