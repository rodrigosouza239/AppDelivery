import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  StatusBar,
  Linking,
  SafeAreaView,
  ScrollView,
  Share,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';
import Popover from 'react-native-popover-view';

import {
  Ionicons,
  Feather,
  Entypo,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';
import { TextMask } from 'react-native-masked-text';

import SkeletonContent from 'react-native-skeleton-content';
import { useDispatch, useSelector } from 'react-redux';

import Color from 'color';
import Animated from 'react-native-reanimated';
import { onScrollEvent, useValue } from 'react-native-redash';
import { monetize, handleWorkHours, weekDaysEnPt } from '../../utils';
import { colors } from '../../styles';

import CategorieSheet from '../../components/CategorieSheet';

import { Cart } from './components/Cart';
import { Tabs, StickyTabs } from './components/Tabs';
import { baseURL } from '../../services/api';
import Picture from '../../assets/images/picture.svg';

import company, {
  Creators as CompanyActions,
} from '../../store/ducks/company';

import styles from './styles';
import Products from './components/Products';
import Delivery from '../../assets/images/delivery.svg';

const { height } = Dimensions.get('window');

export default function Company({ navigation, route: { params } }) {
  const dispatch = useDispatch();
  const [tabY, setTabY] = useState(0);
  const y = useValue(0);
  const onScroll = onScrollEvent({ y });
  const products = useSelector(state => state.products);
  const { loading, company: data } = useSelector(
    state => state.company,
  );
  const globalCart = useSelector(state => state.cart);

  const [currentProduct, setCurrentProduct] = useState(null);
  const [cartItems, setCartItens] = useState([]);

  const productSheetRef = useRef();
  const categorieSheetRef = useRef();

  const item = params?.item;
  console.tron.log('item', item);

  if (!item) {
    console.tron.log('params', params);
    return null;
  }

  const acceptOrders = handleWorkHours(data?.workhours)?.isOpen;

  const [cart, setCart] = useState(true);
  const [qtd, setQtd] = useState(null);
  const [attr, setAttr] = useState(null);

  const { width: wWidth } = Dimensions.get('window');
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    dispatch(CompanyActions.getCompanyById(item));
  }, []);

  const toAddress = () => {
    if (data?.address) {
      const { street, number, district, city, state } = data.address;
      return `${street}, ${number}, ${district}, ${city}/${state}`;
    }
    return '';
  };

  function handleProductOpen(item) {
    setCurrentProduct(item);
    setAttr({});
    productSheetRef.current.open();
  }

  async function shareCompany() {
    try {
      const result = await Share.share({
        message: `Compre agora na ${data.fantasy_name}! Ligue para (${data.phone_ddd})${data.phone_num}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  function renderWorkTime(times) {
    if (data?.workhours && times?.allDays) {
      const days = Object.keys(times?.allDays);

      return (
        <FlatList
          data={days}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  borderBottomWidth:
                    index === days.length - 1 ? 0 : 1,
                  borderColor: '#f1f1f1',
                  paddingVertical: 3,
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 5,
                    backgroundColor:
                      weekDaysEnPt[item] === times.day[item]
                        ? colors.success
                        : colors.white,
                    marginRight: 5,
                  }}
                />

                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{ fontSize: 13, color: colors.darker }}
                  >
                    {weekDaysEnPt[item]}:
                  </Text>
                  <View
                    style={{ flexDirection: 'row', marginLeft: 5 }}
                  >
                    {times?.allDays[item]?.period.map(singleTime => {
                      return (
                        <Text
                          style={[
                            {
                              fontSize: 13,
                              color: colors.darker,
                            },
                            times?.allDays[item]?.period.length > 1
                              ? { marginRight: 10 }
                              : { marginRight: 0 },
                          ]}
                        >
                          {singleTime?.start.slice(0, -3)} até {''}
                          {singleTime?.end.slice(0, -3)}
                        </Text>
                      );
                    })}
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={item => String({ item })}
        />
      );
    }

    return (
      <Text
        style={{
          fontSize: 13,
          color: colors.darker,
          textAlign: 'center',
        }}
      >
        Esse estabelecimento ainda não informou seus horários de
        funcionamento
      </Text>
    );
  }

  function renderProducts() {
    if (products.products.length === 0) {
      return (
        <View
          style={{
            flex: 1,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Entypo name="emoji-sad" size={24} color={colors.darker} />
          <Text style={{ color: colors.darker }}>
            Não existem produtos para essa categoria, ainda!
          </Text>
        </View>
      );
    }
    return (
      <FlatList
        data={products?.products || []}
        renderItem={({ item }) => {
          if (item.is_active === 1) {
            return (
              <TouchableOpacity
                onPress={() => {
                  handleProductOpen(item);
                }}
                style={styles.card}
              >
                {/* <View style={styles.image} /> */}
                {item.image ? (
                  <Image
                    style={styles.image}
                    source={{
                      uri: `${baseURL}/${item.image.path}`,
                    }}
                  />
                ) : (
                  <Picture
                    width="30"
                    height="30"
                    style={styles.image}
                  />
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.description}>
                      {item.desc}
                    </Text>
                    <Text>{monetize(item.price)}</Text>
                  </View>
                  <Feather
                    name="plus-circle"
                    size={24}
                    color="#8bc34a"
                  />
                </View>
              </TouchableOpacity>
            );
          }
        }}
        keyExtractor={item => String(item.id)}
      />
    );
  }

  return (
    <>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      <Animated.ScrollView
        style={{ flex: 1, zIndex: 9999 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        {...{ onScroll }}
      >
        <View
          style={{
            zIndex: 9998,
          }}
        >
          <ImageBackground
            source={{ uri: `${baseURL}/${data?.banner}` }}
            style={{
              flex: 1,
              width: null,
              height: null,
              padding: 20,
            }}
          >
            <View
              style={{
                zIndex: 9999999999,
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  zIndex: 9999999,

                  flex: 1,
                  marginBottom: 10,
                }}
              >
                <TouchableOpacity
                  hitSlop={{
                    top: 30,
                    left: 20,
                    right: 20,
                    bottom: 30,
                  }}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons
                    name="ios-arrow-back"
                    size={33}
                    color={colors.white}
                  />
                </TouchableOpacity>
                <Popover
                  from={
                    <TouchableOpacity
                      style={{
                        borderRadius: 4,

                        justifyContent: 'center',

                        alignContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <MaterialCommunityIcons
                        name="clock-outline"
                        size={16}
                        color={
                          handleWorkHours(data?.workhours)?.isOpen
                            ? colors.success
                            : colors.danger
                        }
                        style={{ marginRight: 3 }}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: handleWorkHours(data?.workhours)
                            ?.isOpen
                            ? colors.success
                            : colors.danger,
                          marginLeft: 5,
                        }}
                      >
                        {handleWorkHours(data?.workhours)?.isOpen
                          ? `Aberto${
                              handleWorkHours(data?.workhours)
                                ?.shortMessage
                                ? handleWorkHours(data?.workhours)
                                    ?.shortMessage
                                : null
                            }`
                          : 'Fechado'}
                      </Text>
                      <Ionicons
                        name="ios-arrow-down"
                        size={16}
                        color={
                          handleWorkHours(data?.workhours)?.isOpen
                            ? colors.success
                            : colors.danger
                        }
                        style={{ marginLeft: 10 }}
                      />
                    </TouchableOpacity>
                  }
                >
                  <View
                    style={{ padding: 10, borderRadius: 16, flex: 1 }}
                  >
                    {!handleWorkHours(data?.workhours)?.isOpen ? (
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 14,
                          color: colors.dark,
                        }}
                      >
                        Ainda estamos aguardando o estabelecimento
                        iniciar seu atendimento na plataforma
                      </Text>
                    ) : (
                      renderWorkTime(handleWorkHours(data?.workhours))
                    )}
                  </View>
                </Popover>
                <TouchableOpacity onPress={() => shareCompany()}>
                  <Ionicons name="md-share" size={23} color="white" />
                </TouchableOpacity>
              </View>
              {loading ? (
                <SkeletonContent
                  isLoading
                  containerStyle={{}}
                  layout={[
                    { width: 90, height: 90, marginBottom: 5 },
                  ]}
                />
              ) : (
                <View
                  style={{
                    width: 90,
                    height: 90,
                    backgroundColor: 'white',
                    marginBottom: 10,
                    borderRadius: 5,
                  }}
                >
                  <Image
                    source={{
                      uri: `${baseURL}/${data?.photo}`,
                    }}
                    style={{ width: 90, height: 90, borderRadius: 5 }}
                    resizeMode="cover"
                  />
                </View>
              )}
              {loading ? (
                <SkeletonContent
                  containerStyle={{}}
                  isLoading
                  layout={[
                    { width: 80, height: 20, marginBottom: 5 },
                    { width: 140, height: 20 },
                  ]}
                />
              ) : (
                <>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 17,
                      fontWeight: 'bold',
                      textShadowColor: 'rgba(0, 0, 0, 0.75)',
                      textShadowOffset: { width: 0, height: 0 },
                      textShadowRadius: 2,
                    }}
                  >
                    {data?.fantasy_name}
                  </Text>
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 14,
                        textShadowColor: 'rgba(0, 0, 0, 0.75)',
                        textShadowOffset: { width: 0, height: 0 },
                        textShadowRadius: 2,
                      }}
                    >
                      {toAddress()}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          `tel:(${data?.phone_ddd})${data?.phone_num}`,
                        )
                      }
                      style={{
                        borderRadius: 4,
                        paddingVertical: 10,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Ionicons
                        name="ios-call"
                        size={16}
                        color={colors.white}
                      />

                      <TextMask
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: colors.white,
                          marginLeft: 10,
                        }}
                        type="cel-phone"
                        options={{
                          maskType: 'BRL',
                          withDDD: true,
                          dddMask: '(99) ',
                        }}
                        value={`${data?.phone_ddd}${data?.phone_num}`}
                      />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
            <LinearGradient
              colors={[
                Color(data?.primary_color)
                  .alpha(0.5)
                  .lighten(0.5),
                Color(data?.primary_color)
                  .alpha(0.5)
                  .lighten(0.5),

                Color(data?.primary_color).alpha(0.5),

                Color(data?.primary_color).darken(0.1),
              ]}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                ...StyleSheet.absoluteFill,
                zIndex: 9999,
              }}
            />
          </ImageBackground>
        </View>

        {!loading && (
          <TouchableOpacity
            onPress={() => setShowInfo(!showInfo)}
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 4,
              marginTop: 8,
              marginHorizontal: 10,
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  borderRadius: 4,
                  paddingHorizontal: 10,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 2,
                  backgroundColor: handleWorkHours(data?.workhours)
                    ?.isOpen
                    ? colors.success
                    : colors.danger,
                  borderColor: handleWorkHours(data?.workhours)
                    ?.isOpen
                    ? colors.success
                    : colors.danger,
                }}
              >
                <Ionicons
                  name="md-time"
                  size={15}
                  color={colors.white}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.white,
                    marginLeft: 5,
                  }}
                >
                  {handleWorkHours(data?.workhours)?.isOpen
                    ? 'Aberto'
                    : 'Fechado'}
                </Text>
              </View>
              <View
                style={{
                  borderRadius: 4,
                  paddingHorizontal: 10,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                {data?.min_delivery_time && data?.max_delivery_time && (
                  <>
                    <Delivery width="16" height="16" />
                    <Text
                      style={{
                        fontSize: 12,
                        color: colors.lighdarker,
                        marginLeft: 5,
                      }}
                    >
                      {data?.min_delivery_time}-
                      {data?.max_delivery_time} min
                      {/* min (
                  {data?.delivery_price === 0
                    ? 'Grátis'
                    : monetize(data?.delivery_price)}
                  ) */}
                    </Text>
                  </>
                )}
              </View>
            </View>
            {showInfo && (
              <View
                style={{
                  flexDirection: 'row',
                  paddinTop: 10,
                  marginTop: 10,
                }}
              >
                <View>
                  {renderWorkTime(handleWorkHours(data?.workhours))}
                </View>
              </View>
            )}
          </TouchableOpacity>
        )}
        {loading ? (
          <SkeletonContent
            containerStyle={{}}
            layout={[{ width: wWidth, height: 40 }]}
            isLoading
          />
        ) : (
          <Tabs
            onLayout={({
              nativeEvent: {
                layout: { y: newTabY },
              },
            }) => setTabY(newTabY)}
            categories={data?.categories || []}
            customColors={{
              primary: data?.primary_color,
              secondary: data?.secondary_color,
            }}
          />
        )}
        {products.loading ? <ActivityIndicator /> : renderProducts()}
      </Animated.ScrollView>
      <StickyTabs
        tabY={tabY}
        categories={data?.categories || []}
        customColors={{
          primary: data?.primary_color,
          secondary: data?.secondary_color,
        }}
        {...{ y }}
      />
      {cart && (
        <SafeAreaView
          containerStyle={{ backgroundColor: 'transparent' }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
          >
            <Cart
              customColors={{
                primary: data?.primary_color,
                secondary: data?.secondary_color,
              }}
            />
          </TouchableOpacity>
        </SafeAreaView>
      )}
      <RBSheet
        ref={productSheetRef}
        height={height}
        onClose={() => setCurrentProduct(null)}
        closeOnPressMask
        closeOnDragDown={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.3)',
          },
          draggableIcon: {
            backgroundColor: '#ccc',
          },
          container: {
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          },
        }}
      >
        <StatusBar backgroundColor="blue" barStyle="dark-content" />

        {currentProduct ? (
          <Products
            currentProduct={currentProduct}
            setCurrentProduct={setCurrentProduct}
            productSheetRef={productSheetRef}
            acceptOrders={acceptOrders}
          />
        ) : null}
      </RBSheet>
      <CategorieSheet ref={categorieSheetRef} />
    </>
  );
}
