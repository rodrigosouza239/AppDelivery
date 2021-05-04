import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import {
  RectButton,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import * as RootNavigation from '../../services/navigation';

import { useDispatch, useSelector } from 'react-redux';
import { setModal, popModal } from 'react-native-alert-utils';

import moment from 'moment';
import { Ionicons, Feather } from '@expo/vector-icons';

import RNAnimatedTabs from 'rn-animated-tabs';
import ReviewModal from './ReviewModal';
import { monetize } from '../../utils/index';
import Button from '../../components/ButtonOutline';
import H4 from '../../components/H4';
import SimpleHeader from '../../components/SimpleHeader';

import { Creators as LocationsActions } from '../../store/ducks/locations';
import { Creators as ReviewActions } from '../../store/ducks/review';
import { Creators as OrderActions } from '../../store/ducks/order';

import { colors } from '../../styles';

moment.locale('pt-br', require('moment/locale/pt-br'));

export default function OrderDetail({
  navigation,
  route: { params },
}) {
  const dispatch = useDispatch();
  const { loading: reviewLoading } = useSelector(
    state => state.review,
  );
  const { data, loading } = useSelector(state => state.order);

  const getOrder = params?.order || data || {};

  const isLoading = loading || reviewLoading;

  useEffect(() => {
    if (reviewLoading !== null && reviewLoading === false) {
      popModal();
    }
  }, [reviewLoading]);

  useEffect(() => {
    if (params?.id && !params?.order) {
      dispatch(OrderActions.getOrderById(params?.id));
    }
  }, [params]);

  function parsePrice(variation) {
    if (variation) {
      if (variation.choices?.length) {
        const findChoice = variation?.choices?.find(
          e => e.value?.prices,
        );
        if (findChoice?.value?.prices?.length) {
          return findChoice.value.prices[0].price.toFixed(2);
        }
      }
      return variation.product?.price;
    }
    return '';
  }

  function renderItem(variations) {
    return (
      <FlatList
        data={variations}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                marginBottom: 4,
                paddingBottom: 4,
                borderBottomWidth:
                  index === variations.length - 1 ? 0 : 1,
                borderColor: '#f1f1f1',
              }}
            >
              <View style={styles.cardItemsSingleContainer}>
                <Text style={styles.cardItemsSingleQty}>
                  {item.pivot.qty}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',

                    flex: 1,
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.cardItemsSingleText}>
                      {item.product.name}
                    </Text>
                    {item.choices?.length ? (
                      <View>
                        {item.choices.map(f => (
                          <Text style={styles.cardItemsSingleText}>
                            ({f.value?.name})
                          </Text>
                        ))}
                      </View>
                    ) : null}
                  </View>
                  <Text style={styles.cardItemsSingleText}>
                    {monetize(parseFloat(parsePrice(item)))}
                  </Text>
                </View>
              </View>
              {!getOrder?.review &&
                getOrder?.order_status === 'done' &&
                getOrder?.arrived_at && (
                  <View
                    style={{
                      alignItems: 'flex-end',
                    }}
                  >
                    <Button
                      style={{ width: 120, height: 20 }}
                      textColor={colors.success}
                      title="AVALIAR"
                      color={colors.success}
                      onPress={() =>
                        setModal(
                          <ReviewModal
                            handleSubmit={payload =>
                              dispatch(
                                ReviewActions.addReview(payload),
                              )
                            }
                            order={getOrder}
                          />,
                        )
                      }
                    />
                  </View>
                )}
              <View>
                {item.increments?.length ? (
                  <>
                    <View style={styles.cardItemsSingleContainer}>
                      {item.increments.map(f => (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flex: 1,
                            alignItems: 'center',
                          }}
                        >
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            <Text
                              style={{
                                color: colors.dark,
                                marginRight: 10,
                              }}
                            >
                              +{f.qty}
                            </Text>
                            <Text style={{ color: colors.dark }}>
                              {f.additional?.name}
                            </Text>
                          </View>
                          <Text style={{ color: colors.dark }}>
                            {` (R$ ${f.additional?.price?.toFixed(
                              2,
                            )})`}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </>
                ) : null}
              </View>
            </View>
          );
        }}
        keyExtractor={item => String(item.id)}
      />
    );
  }

  function renderBadge(status) {
    const colors = {
      pending: '#2ccce4',
      on_way: '#dce775',
      done: '#37d67a',
      accepted: '#593C8F',
      cancelado: '#f47373',
    };

    const statusPtBr = {
      pending: 'Pendente',
      on_way: 'A caminho',
      accepted: 'Aceito',
      done: 'Finalizado',
    };

    const textColor = {
      pending: '#fff',
      on_way: '#333333',
      done: '#333333',
      accepted: '#fff',
      cancelado: '#333333',
    };

    const friendlyMessage = {
      pending: 'Aguardando o estabelecimento',
      accepted: moment(getOrder?.updated_at)
        .subtract(3, 'hours')
        .format(` [${statusPtBr[status]} em] DD/MM/YYYY [às] H:mm `),
      on_way: moment(getOrder?.updated_at)
        .subtract(3, 'hours')
        .format(`[Saiu para entrega em] DD/MM/YYYY [às] H:mm `),
      done: moment(getOrder?.updated_at)
        .subtract(3, 'hours')
        .format(`[Entregue em] DD/MM/YYYY [às] H:mm `),
    };

    return (
      <View
        style={{
          backgroundColor: colors[status],
          borderRadius: 5,
          padding: 9,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: textColor[status] }}>
          {friendlyMessage[status]}
        </Text>
      </View>
    );
  }

  return isLoading ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View style={styles.container}>
      <SimpleHeader text={`Pedido #${getOrder?.id}`} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.content}>
          <View style={{ marginBottom: 20 }}>
            <View style={styles.cardItem}>
              <TouchableOpacity
                onPress={() =>
                  RootNavigation.navigate('Home', {
                    screen: 'Company',
                    item: getOrder?.company?.id,
                    redirect: true,
                  })
                }
                style={[styles.cardItemHeader, { borderWidth: 1 }]}
              >
                <Image
                  resizeMode="cover"
                  style={styles.cardItemLogo}
                  source={{ uri: getOrder?.company?.imageUrl }}
                />

                <View>
                  <Text style={styles.cardItemCompanyText}>
                    {getOrder?.company?.name}
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={[
                  { flexDirection: 'row', paddingVertical: 10 },
                ]}
              >
                <Feather
                  name="calendar"
                  size={15}
                  color={colors.darker}
                />
                <Text
                  style={{
                    fontWeight: '300',
                    color: colors.dark,
                    marginLeft: 5,
                  }}
                >
                  Realizado em
                  {moment(getOrder?.created_at)
                    .subtract(3, 'hours')
                    .format(' D [de] MMMM [de] YYYY [às] H:mm ')}
                </Text>
              </View>
              {renderBadge(getOrder?.order_status)}
              <View style={styles.cardItemsContainer}>
                {renderItem(getOrder?.variations)}
              </View>

              <View
                style={[
                  styles.cardItemsSingleContainer,
                  {
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    paddingTop: 10,
                    marginTop: 10,
                  },
                ]}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.cardItemsSingleText}>
                      Subtotal
                    </Text>
                  </View>
                  <Text style={styles.cardItemsSingleText}>
                    {monetize(getOrder?.total)}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.cardItemsSingleContainer,
                  {
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  },
                ]}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.cardItemsSingleText}>
                      Frete
                    </Text>
                  </View>
                  <Text style={styles.cardItemsSingleText}>
                    {monetize(getOrder.shipping_price)}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.cardItemsSingleContainer,
                  {
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  },
                ]}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.cardItemsSingleText}>
                      Total
                    </Text>
                  </View>
                  <Text style={styles.cardItemsSingleText}>
                    {monetize(getOrder.total)}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 15,
                overflow: 'hidden',
                paddingBottom: 10,
              }}
            >
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
            </View>
            <View style={styles.containerAddress}>
              <Feather name="map-pin" size={22} color={colors.dark} />
              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.dark,
                    fontWeight: '500',
                    marginBottom: 3,
                  }}
                >
                  Endereço de entrega
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.dark,
                  }}
                >
                  {getOrder?.address?.street},
                  {getOrder?.address?.number
                    ? ` ${getOrder?.address?.number}`
                    : ''}
                  {'\n'}
                  {getOrder?.address?.city
                    ? `${getOrder?.address?.city}/`
                    : ''}
                  {getOrder?.address?.state
                    ? `${getOrder?.address?.state}`
                    : ''}
                  {getOrder?.address?.zipcode
                    ? ` - CEP: ${getOrder?.address?.zipcode}`
                    : ''}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    marginTop: 20,
  },

  cardItem: {
    backgroundColor: colors.white,
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginHorizontal: 15,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
  },
  cardItemLogo: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: 'red',
  },
  cardItemCompanyText: {
    color: colors.darker,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: '#f1f1f1',
  },
  cardItemCompanyDescription: {
    color: colors.darker,
    fontSize: 14,
    fontWeight: '300',
  },
  cardItemsContainer: {
    borderBottomWidth: 1,
    borderColor: '#f1f1f1',
    paddingVertical: 15,
  },
  cardItemsSingleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardItemsSingleQty: {
    borderWidth: 1,
    padding: 4,
    borderRadius: 4,
    borderColor: colors.light,
    color: colors.dark,
  },
  cardItemsSingleText: {
    color: colors.darker,
    marginLeft: 10,
  },
  tringle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    transform: [{ rotate: '180deg' }],
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  containerAddress: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
