import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
  FlatList,
  Text,
  LayoutAnimation,
  SafeAreaView,
  AsyncStorage,
} from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import pluralize from 'pluralize';

import { useDispatch, useSelector } from 'react-redux';
import SkeletonContent from 'react-native-skeleton-content';
import { Card } from 'react-native-paper';
import CurrentPlace from '../../components/CurrentPlace';

/** Internal Imports */
import { colors, metrics } from '../../styles';
/** Internal Imports Ends */

/** Components */
import Input from '../../components/Input';
import ShopListItem from '../../components/ShopListItem';
import LocationSheet from '../../components/LocationSheet';
import H1 from '../../components/H1';
/** Components Ends */

import styles from './styles';

/** REDUX */
import { Creators as CompanyActions } from '../../store/ducks/company';
import { Creators as LocationsActions } from '../../store/ducks/locations';

/** REDUX END */

// Categories Icons
import PizzaSVG from '../../assets/images/pizza.svg';
import BurgerSVG from '../../assets/images/categories/014-burger.svg';
import TacoSVG from '../../assets/images/categories/027-taco.svg';
import AppleSVG from '../../assets/images/categories/fruit.svg';
import SweetsSVG from '../../assets/images/categories/036-ice-cream.svg';
import LunchSVG from '../../assets/images/categories/040-cutlery.svg';
import OthersSVG from '../../assets/images/categories/008-fried-chicken.svg';
import MallSVG from '../../assets/images/categories/045-restaurant.svg';

const firstLayout = [
  {
    width: 65,
    height: 70,
  },
];
const secondLayout = [
  {
    width: 150,
    height: 20,
    marginBottom: 2,
  },
  {
    width: 130,
    height: 20,
    marginBottom: 2,
  },
  {
    width: 80,
    height: 20,
  },
];

const categories = [
  {
    Icon: PizzaSVG,
    name: 'PIZZA',
    label: 'Pizza',
  },
  {
    Icon: BurgerSVG,
    name: 'BURGER',
    label: 'Lanches',
  },
  {
    Icon: TacoSVG,
    name: 'SNACK',
    label: 'Salgados',
  },
  {
    Icon: AppleSVG,
    name: 'FITNESS',
    label: 'Saudável',
  },
  {
    Icon: LunchSVG,
    name: 'LUNCH',
    label: 'Marmitas',
  },

  {
    Icon: SweetsSVG,
    name: 'SWEET',
    label: 'Doces',
  },
  {
    Icon: MallSVG,
    name: 'MARKET',
    label: 'Mercado',
  },
  {
    Icon: OthersSVG,
    name: 'OTHERS',
    label: 'Outros',
  },
];

export default function Home({ navigation, route: { params } }) {
  const redirect = params?.redirect;
  const locationSheet = useRef();
  const dispatch = useDispatch();
  const { companies: dataCompany, total, loading } = useSelector(
    state => state.company,
  );
  const location = useSelector(state => state.locations);
  const { data } = useSelector(state => state.login);
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (data && location.locations.length === 0) {
      dispatch(LocationsActions.getLocations());
    }
  }, []);

  useEffect(() => {
    const handleLocation = async () => {
      const address = await AsyncStorage.getItem('address');
      if (address) {
        const { values } = JSON.parse(address);
        dispatch(
          LocationsActions.setLocation({
            street: values.logradouro,
            district: values.bairro,
            city: values.localidade,
            state: values.uf,
            zipcode: values.cep,
          }),
        );
      } else {
        locationSheet.current.open();
      }
    };
    console.tron.log('location', location);
    if (!location.currentLocation) {
      handleLocation();
    } else if (!redirect) {
      dispatch(CompanyActions.getCompany());
    }
  }, [location]);

  // monitoring location change
  useEffect(() => {
    dispatch(CompanyActions.getCompany());
  }, [location.currentLocation]);

  useEffect(() => {
    if (category?.length) {
      console.log('request');
      dispatch(CompanyActions.getCompany({ params: { category } }));
    } else {
      dispatch(CompanyActions.getCompany());
    }
  }, [category]);

  const LoadingShop = () =>
    [...Array(6).keys()].map(e => (
      <View key={e} style={styles.loadingContainer}>
        <Card>
          <View style={styles.loading}>
            <SkeletonContent
              containerStyle={{ flex: 1, padding: 5 }}
              layout={firstLayout}
              isLoading
            />
            <SkeletonContent
              layout={secondLayout}
              containerStyle={{ flex: 4 }}
              isLoading
            />
          </View>
        </Card>
      </View>
    ));

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <FlatList
          data={categories}
          horizontal
          contentContainerStyle={{ marginVertical: 10 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: { Icon, name, label } }) => (
            <TouchableWithoutFeedback
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.spring,
                );
                if (category === name) {
                  setCategory(null);
                } else {
                  setCategory(name);
                }
              }}
            >
              <View style={styles.containerCategory}>
                <View
                  style={[
                    styles.category,
                    category === name && styles.selected,
                  ]}
                >
                  <Icon
                    width={24}
                    height={24}
                    fill={category === name ? colors.primary : '#fff'}
                  />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    opacity: 0.6,
                    fontSize: 12,
                  }}
                >
                  {label}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          keyExtractor={item => item.name}
        />

        <CurrentPlace
          open={() => locationSheet.current.open()}
          close={() => locationSheet.current.close()}
          navigation={navigation}
        />

        {loading ? (
          <SkeletonContent
            isLoading
            layout={[{ width: 150, height: 20 }]}
            containerStyle={{
              marginHorizontal: metrics.baseMargin,
              marginBottom: metrics.baseMargin,
            }}
          />
        ) : (
          <View style={{ marginBottom: 15 }}>
            <H1
              text={`${total} ${pluralize('estabelecimento', total)}`}
              margin
            />
          </View>
        )}
        <LocationSheet ref={locationSheet} />
        {loading ? (
          <LoadingShop />
        ) : (
          <View>
            <FlatList
              contentContainerStyle={{ marginBottom: 20 }}
              data={dataCompany}
              renderItem={({ item: e }) => <ShopListItem item={e} />}
              keyExtractor={item => item.id}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

Home.navigationOptions = {
  header: null,
};
