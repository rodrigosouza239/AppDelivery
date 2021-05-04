import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import Popover from 'react-native-popover-view';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../../styles';
import { baseURL } from '../../../services/api';
import { monetize, handleWorkHours } from '../../../utils';
import { Creators as CartActions } from '../../../store/ducks/cart';
import { showToast } from '../../../utils/toast';
import company from '../../../store/ducks/company';

const Products = ({
  productSheetRef,
  currentProduct,
  setCurrentProduct,
  acceptOrders,
}) => {
  const dispatch = useDispatch();
  const { company_id, cart } = useSelector(state => state.cart);
  const [qtd, setQtd] = useState(1);
  const [attr, setAttr] = useState({});
  const { width: wWidth } = Dimensions.get('window');
  const { loading, company: data } = useSelector(
    state => state.company,
  );

  function handleProductClose() {
    setCurrentProduct(null);
    setQtd(0);
    return productSheetRef.current.close();
  }

  useEffect(() => {
    console.tron.log('company_id', data);
  }, []);

  function isSelected(opcoes, isAdditional) {
    const values = Object.values(attr);
    if (isAdditional) {
      let find;
      values.forEach(e => {
        if (e.length) {
          if (e.find(f => f.id === opcoes.id)) find = true;
        }
      });
      if (find) return colors.success;
      return '#f1f1f1';
    }
    if (values.find(e => e.id === opcoes.id)) return colors.darker;
    return '#f1f1f1';
  }

  function haveSameProduct(product) {
    let finded = null;
    cart.forEach(e => {
      const newE = { ...e };
      delete newE.cart_id;
      delete newE.qty;
      if (_.isEqual(newE, product)) {
        finded = e;
      }
    });
    return finded;
  }

  function addToCart() {
    // if (!acceptOrders) {
    //   showToast(
    //     'Erro',
    //     'Esse estabelecimento ainda não esta aberto, assim que o funcionamento for liberado, você poderá fazer seus pedidos, até lá você pode consultar todo o menu',
    //     'danger',
    //   );
    //   return;
    // }
    console.tron.log(
      'testing product data',
      company_id,
      currentProduct,
    );
    if (company_id && company_id !== currentProduct.company_id) {
      showToast(
        'Erro',
        'Você possui itens adicionados no carrinho de outra loja, deseja limpar?',
        'danger',
      );
      return;
    }
    const product = { ...currentProduct };
    product.selectedAttr = attr;
    const same = haveSameProduct(product);
    if (same) {
      product.qty = same.qty + qtd;
      dispatch(CartActions.updateCart(same.cart_id, product));
    } else {
      product.qty = qtd || 1;
      product.cart_id = cart.length + 1;
      dispatch(CartActions.addCart(product));
    }

    productSheetRef.current.close();
  }

  function priceAll() {
    if (Object.keys(attr).length) {
      const prices = Object.values(attr).map(e => {
        console.log(e);
        if (e?.prices?.length) {
          return e.price_changes
            ? e?.prices[0]?.price
            : currentProduct?.price;
        }
        if (e.length > 1) {
          const addRed = e.reduce((ac, v) => ac?.price + v?.price);
          return addRed;
        }
        if (e.length === 1) {
          return e[0].price;
        }
        return 0;
      });
      const reduce = prices.reduce((ac, v) => ac + v);

      if (reduce) {
        return monetize(reduce * qtd);
      }
    }
    return monetize(currentProduct?.price * qtd);
  }

  function renderCartButton() {
    if (currentProduct?.attributes?.length) {
      if (!Object.keys(attr).length) {
        return null;
      }
    }
    return (
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: '#4caf50',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginLeft: 20,
          paddingHorizontal: 20,
          borderRadius: 3,
          paddingVertical: 10,
          backgroundColor: '#8bc34a',
          alignItems: 'center',
        }}
        onPress={() => addToCart()}
      >
        <Ionicons name="md-cart" size={22} color="white" />
        <Text
          style={{
            fontSize: 19,
            fontWeight: '500',
            color: colors.white,
            marginLeft: 40,
          }}
        >
          {priceAll()}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ paddingTop: getStatusBarHeight(), flex: 1 }}>
      <ScrollView
        containerStyle={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingVertical: 5,
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons
            style={{ paddingLeft: 20 }}
            name="ios-arrow-back"
            size={33}
            color={colors.dark}
            onPress={() => handleProductClose()}
          />
          <Popover
            from={
              <TouchableOpacity
                style={{
                  borderRadius: 4,
                  paddingHorizontal: 10,
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: handleWorkHours(data?.workhours)
                    ?.isOpen
                    ? colors.success
                    : colors.danger,
                  alignContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: handleWorkHours(data?.workhours)?.isOpen
                      ? colors.success
                      : colors.danger,
                    marginLeft: 5,
                  }}
                >
                  {handleWorkHours(data?.workhours)?.isOpen
                    ? 'Aberto'
                    : 'Fechado'}
                </Text>
              </TouchableOpacity>
            }
          >
            <View style={{ padding: 10, borderRadius: 16, flex: 1 }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  color: colors.dark,
                }}
              >
                Ainda estamos aguardando o estabelecimento iniciar seu
                atendimento na plataforma
              </Text>
            </View>
          </Popover>

          <Ionicons
            style={{ paddingRight: 20 }}
            name="md-share"
            size={23}
            color={colors.dark}
          />
        </View>
        {currentProduct?.image && (
          <Image
            style={{
              height: 220,
              borderRadius: 10,
              marginHorizontal: 20,
              justifyContent: 'flex-end',
            }}
            source={{
              uri: `${baseURL}/${currentProduct.image.path}`,
            }}
            resizeMode="cover"
          />
        )}

        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 10,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderColor: 'rgba(0,0,0,0.1)',
          }}
        >
          <Text
            style={{
              fontSize: 23,
              fontWeight: '300',
              color: colors.darker,
            }}
          >
            {currentProduct?.name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '300',
              color: colors.dark,
            }}
          >
            {currentProduct?.desc}
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            paddingBottom: 10,
            orderWidth: 1,
            flex: 1,
          }}
        >
          {currentProduct?.attributes.length > 0 && (
            <View>
              {currentProduct.attributes.map(attribute => {
                return (
                  <View style={{ marginTop: 15 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: '400',
                          color: colors.darker,
                        }}
                      >
                        {attribute.name}
                      </Text>

                      {attribute.is_mandatory === 1 && (
                        <View
                          style={{
                            backgroundColor: colors.darker,
                            borderRadius: 5,
                            paddingVertical: 3,
                            paddingHorizontal: 10,
                            marginLeft: 10,
                          }}
                        >
                          <Text
                            style={{ fontSize: 10, color: 'white' }}
                          >
                            OBRIGATÓRIO
                          </Text>
                        </View>
                      )}
                    </View>
                    {(attribute.is_additional
                      ? attribute.additionals
                      : attribute.values
                    )?.map((opcoes, index) => {
                      return (
                        <View
                          style={{
                            borderBottomWidth:
                              index === attribute.values.length - 1
                                ? 1
                                : 0,
                            paddingBottom:
                              index === attribute.values.length - 1
                                ? 5
                                : 0,
                            borderColor: 'rgba(0,0,0,0.1)',
                          }}
                        >
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: index === 0 ? 22 : 0,
                              paddingTop: 5,
                              paddingBottom: 5,
                              alignContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                const newAttr = { ...attr };
                                if (attribute.is_additional) {
                                  if (newAttr[attribute.id]) {
                                    const find = newAttr[
                                      attribute.id
                                    ].find(e => e.id === opcoes.id);
                                    if (find) {
                                      const filter = newAttr[
                                        attribute.id
                                      ].filter(
                                        e => e.id !== opcoes.id,
                                      );
                                      newAttr[attribute.id] = [
                                        ...filter,
                                      ];
                                    } else {
                                      newAttr[attribute.id] = [
                                        ...newAttr[attribute.id],
                                        opcoes,
                                      ];
                                    }
                                  } else {
                                    newAttr[attribute.id] = [opcoes];
                                  }
                                } else {
                                  newAttr[attribute.id] = opcoes;
                                }
                                setAttr(newAttr);
                              }}
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}
                              >
                                <View
                                  style={{
                                    width: 26,
                                    height: 26,
                                    borderRadius: attribute.is_additional
                                      ? 5
                                      : 20,
                                    backgroundColor: '#f1f1f1',
                                    marginRight: 10,
                                    padding: 5,
                                  }}
                                >
                                  <View
                                    style={{
                                      width: 16,
                                      height: 16,
                                      borderRadius: attribute.is_additional
                                        ? 4
                                        : 20,
                                      backgroundColor: isSelected(
                                        opcoes,
                                        attribute.is_additional,
                                      ),
                                      marginRight: 10,
                                    }}
                                  />
                                </View>
                                <Text
                                  style={{
                                    color: colors.darker,
                                    fontWeight: '200',
                                  }}
                                >
                                  {opcoes.name}
                                </Text>
                              </View>

                              <Text
                                style={{
                                  fontWeight: '500',
                                  color: '#8bc34a',
                                  fontSize: 16,
                                }}
                              >
                                {attribute.is_additional ? '+' : ''}
                                {monetize(
                                  attribute.is_additional
                                    ? opcoes?.price
                                    : attribute.price_changes
                                    ? opcoes?.prices[0]?.price
                                    : null,
                                )}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          )}

          {currentProduct?.attributes.length === 0 && (
            <View
              style={{
                borderColor: 'rgba(0,0,0,0.1)',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  paddingBottom: 5,
                  alignContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {}}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontWeight: '500',
                      color: '#8bc34a',
                      fontSize: 23,
                    }}
                  >
                    {monetize(currentProduct?.price)}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          padding: 20,
          justifyContent: 'space-between',
          shadowColor: '#f1f1f1',
          borderTopWidth: 1,
          borderTopColor: '#f1f1f1',
          shadowOffset: {
            width: 0,
            height: -10,
          },
          shadowOpacity: 0.5,
          shadowRadius: 3,

          elevation: 3,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderColor: '#f1f1f1',
              borderWidth: 1,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              marginRight: 5,
            }}
            onPress={() => qtd > 1 && setQtd(qtd - 1)}
          >
            <Feather name="minus-circle" size={24} color="#f44336" />
          </TouchableOpacity>
          <View
            style={{
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: 'rgba(34,60,120,1)',
                fontWeight: '500',
              }}
            >
              {qtd}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderColor: '#f1f1f1',
              borderWidth: 1,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 5,
            }}
            onPress={() => setQtd(qtd + 1)}
          >
            <Feather name="plus-circle" size={24} color="#8bc34a" />
          </TouchableOpacity>
        </View>
        {renderCartButton()}
      </View>
    </View>
  );
};

export default Products;
