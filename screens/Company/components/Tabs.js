import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import Animated, {
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { withTransition } from 'react-native-redash';
import { colors } from '../../../styles';

import H1 from '../../../components/H1';

import { Creators as ProductsActions } from '../../../store/ducks/products';

export const Tabs = ({ categories, customColors, onLayout }) => {
  const dispatch = useDispatch();

  const [tab, setTab] = useState(categories[0]);
  const [subTab, setSubtab] = useState(null);

  useEffect(() => {
    dispatch(
      ProductsActions.getProductsRequest({
        category: tab?.id || null,
      }),
    );
  }, [tab]);

  useEffect(() => {
    if (subTab) {
      dispatch(
        ProductsActions.getProductsRequest({
          category: tab?.id,
          subcategory: subTab.id,
        }),
      );
    }
  }, [subTab]);

  return (
    <View
      onLayout={onLayout}
      style={{
        backgroundColor: colors.lighter,
        marginBottom: 10,
      }}
    >
      <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
        <H1 text="Departamentos" />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{}}
      >
        {categories.map(e => (
          <TouchableOpacity
            style={{
              borderColor:
                e === tab ? customColors.secondary : '#ccc',
              borderWidth: e === tab ? 2 : 2,
              backgroundColor:
                e === tab ? customColors.secondary : '#fff',
              bordeRadius: 100,
              marginHorizontal: 10,
              paddingHorizontal: 10,
              paddingVertical: 7,
              borderRadius: 100,
            }}
            key={e}
            onPress={() => {
              setTab(e);
              setSubtab(null);
            }}
          >
            <Text
              style={{
                color: e === tab ? colors.white : colors.regular,
                fontWeight: e === tab ? 'bold' : '300',
              }}
            >
              {e.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {tab?.subcategories.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{}}
        >
          {tab?.subcategories.map(e => (
            <TouchableOpacity
              style={{
                paddingHorizontal: 12,
                paddingVertical: 12,
                flexDirection: 'row',
              }}
              key={e}
              onPress={() => setSubtab(e)}
            >
              <Ionicons
                name="ios-arrow-forward"
                size={16}
                color="black"
              />
              <Text
                style={{
                  color: e === tab ? colors.regular : colors.regular,
                  fontWeight: e === tab ? 'bold' : '300',
                  marginLeft: 7,
                }}
              >
                {e.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export const StickyTabs = ({ categories, customColors, y, tabY }) => {
  const dispatch = useDispatch();
  if (!tabY) {
    return null;
  }
  const opacityInterpolate = interpolate(y, {
    inputRange: [tabY, tabY],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const translateY = interpolate(y, {
    inputRange: [tabY, tabY + 10],
    outputRange: [-10, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const { company: data } = useSelector(state => state.company);
  const opacity = withTransition(opacityInterpolate);
  const [tab, setTab] = useState(categories[0]);
  const [subTab, setSubtab] = useState(null);

  useEffect(() => {
    dispatch(
      ProductsActions.getProductsRequest({
        category: tab?.id || null,
      }),
    );
  }, [tab]);

  useEffect(() => {
    if (subTab) {
      dispatch(
        ProductsActions.getProductsRequest({
          category: tab?.id,
          subcategory: subTab.id,
        }),
      );
    }
  }, [subTab]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        opacity,
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: data?.primary_color,
        marginBottom: 10,
        zIndex: 1,
      }}
    >
      <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
        <Animated.Text
          style={{
            color: 'white',
            fontSize: 17,
            fontWeight: 'bold',
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 2,
            transform: [{ translateY }],
          }}
        >
          {data?.fantasy_name}
        </Animated.Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{}}
      >
        {categories.map(e => (
          <TouchableOpacity
            style={{
              borderColor:
                e === tab ? customColors.secondary : '#ccc',
              borderWidth: e === tab ? 2 : 2,
              backgroundColor:
                e === tab ? customColors.secondary : '#fff',
              bordeRadius: 100,
              marginHorizontal: 10,
              paddingHorizontal: 10,
              paddingVertical: 7,
              borderRadius: 100,
            }}
            key={e}
            onPress={() => {
              setTab(e);
              setSubtab(null);
            }}
          >
            <Text
              style={{
                color: e === tab ? colors.white : colors.regular,
                fontWeight: e === tab ? 'bold' : '300',
              }}
            >
              {e.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {tab?.subcategories.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{}}
        >
          {tab?.subcategories.map(e => (
            <TouchableOpacity
              style={{
                paddingHorizontal: 12,
                paddingVertical: 12,
                flexDirection: 'row',
              }}
              key={e}
              onPress={() => setSubtab(e)}
            >
              <Ionicons
                name="ios-arrow-forward"
                size={16}
                color="black"
              />
              <Text
                style={{
                  color: e === tab ? colors.regular : colors.regular,
                  fontWeight: e === tab ? 'bold' : '300',
                  marginLeft: 7,
                }}
              >
                {e.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </Animated.View>
  );
};
