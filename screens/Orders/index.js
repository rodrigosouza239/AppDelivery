import * as React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  Image,
  FlatList,
  Alert,
  StatusBar,
} from 'react-native';
import {
  RectButton,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';

import { Formik } from 'formik';
import * as yup from 'yup';
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
  Feather,
} from '@expo/vector-icons';

import RNAnimatedTabs from 'rn-animated-tabs';
import H4 from '../../components/H4';
import SimpleHeader from '../../components/SimpleHeader';

import { Creators as OrdersActions } from '../../store/ducks/order';

import { colors } from '../../styles';

moment.locale('pt-br', require('moment/locale/pt-br'));

const DATA = ['Top Tab 1 Content', 'Extra Stuff for Top Tab 2'];

export default function Orders({ navigation }) {
  const dispatch = useDispatch();

  const { orders, loading } = useSelector(state => state.order);

  const [currentTab, setCurrentTab] = React.useState(0);

  React.useEffect(() => {
    dispatch(
      OrdersActions.getOrders({
        filters:
          currentTab === 0
            ? 'pending,accepted,on_way'
            : 'done,cancelled,error',
      }),
    );
  }, [currentTab]);

  function handleTabs(value) {
    setCurrentTab(value);
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
      done: 'Finalizado',
      accepted: 'Aceito',
    };

    return (
      <View
        style={{
          backgroundColor: colors[status],
          borderRadius: 5,
          alignSelf: 'baseline',
          paddingHorizontal: 5,
          paddingVertical: 3,
          marginLeft: 10,
        }}
      >
        <Text
          style={[
            styles.cardItemCompanyDescription,
            { color: 'white' },
          ]}
        >
          {statusPtBr[status]}
        </Text>
      </View>
    );
  }

  function renderItem(variations) {
    return (
      <FlatList
        data={variations}
        renderItem={({ item }) => {
          return (
            <View style={styles.cardItemsSingleContainer}>
              <Text style={styles.cardItemsSingleQty}>
                {item.pivot.qty} x
              </Text>
              <Text style={styles.cardItemsSingleText}>
                {item.product.name}
              </Text>
            </View>
          );
        }}
        keyExtractor={item => String(item.id)}
      />
    );
  }

  function renderOrders() {
    return (
      <>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.content}>
            <FlatList
              data={orders}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('OrderDetail', {
                        order: item,
                      })
                    }
                    style={{ marginBottom: 20 }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        marginBottom: 15,
                      }}
                    >
                      <Feather
                        name="calendar"
                        size={17}
                        color={colors.darker}
                      />
                      <Text
                        style={{
                          fontWeight: '500',
                          color: colors.dark,
                          marginLeft: 10,
                        }}
                      >
                        {/* 05 de junho de 2020{' '} */}
                        {moment(item.created_at)
                          .subtract(3, 'hours')
                          .format('D [de] MMMM [de] YYYY [às] H:mm ')}
                      </Text>
                    </View>
                    <View style={styles.cardItem}>
                      <View style={styles.cardItemHeader}>
                        <Image
                          resizeMode="cover"
                          style={styles.cardItemLogo}
                          source={{ uri: item.company.imageUrl }}
                        />

                        <View>
                          <Text style={styles.cardItemCompanyText}>
                            {item.company.name}
                          </Text>

                          {renderBadge(item.order_status)}

                          {/* Entregue em 06/06/2020 às 23:23 */}
                        </View>
                      </View>
                      <View
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          borderRadius: 4,
                          paddingHorizontal: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 13,
                            color: colors.darker,
                            fontWeight: 'bold',
                          }}
                        >
                          #{item.id}
                        </Text>
                      </View>
                      <View style={styles.cardItemsContainer}>
                        {renderItem(item.variations)}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => String(item.id)}
            />
          </View>
        </ScrollView>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <SimpleHeader text="Seus pedidos" />
      <RNAnimatedTabs
        tabTitles={['EM ANDAMENTO', 'ANTERIORES']}
        onChangeTab={handleTabs}
        containerStyle={styles.tabContainerStyle}
        tabButtonStyle={styles.tabButtonStyle}
        tabTextStyle={styles.tabTextStyle}
        activeTabIndicatorColor={colors.primary}
        height={50}
      />
      {loading === true ? <ActivityIndicator /> : renderOrders()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: StatusBar.currentHeight,
  },
  contentContainer: {},
  content: {
    margin: 20,
  },
  tabContainerStyle: {
    backgroundColor: '#f9f9f9',
  },
  tabButtonStyle: {},
  tabTextStyle: {
    fontSize: 15,
    fontFamily: 'roboto',
    color: colors.darker,
  },
  cardItem: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 5,
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
    borderBottomWidth: 1,
    borderColor: '#f1f1f1',
    paddingBottom: 15,
  },
  cardItemLogo: {
    width: 45,
    height: 45,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: '#f1f1f1',
  },
  cardItemCompanyText: {
    color: colors.darker,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  cardItemCompanyDescription: {
    color: colors.dark,
    fontSize: 12,
    fontWeight: '500',
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
});
