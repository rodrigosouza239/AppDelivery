import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Creators as LoginActions } from '../../store/ducks/login';
import { Creators as CartActions } from '../../store/ducks/cart';
import logo from '../../assets/images/logo-colored-small.png';
import { wpd } from '../../utils/scalling';

import H1 from '../../components/H1';
import { metrics, colors } from '../../styles';

export default function Account({ navigation }) {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.login);

  function shortName() {
    const res = data?.user?.name
      .replace(/ da | de | do | das | dos /g, ' ')
      .split(' ', 2);
    if (res)
      return `${res[0]?.charAt(0)}${res[1]?.charAt(0)}`.replace(
        'undefined',
        '',
      );
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              flex: 2,
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: 'roboto-bold',
                  color: '#fff',
                }}
              >
                {shortName()}
              </Text>
            </View>
            {data && (
              <View
                style={{
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 15,
                }}
              >
                <H1 text={`Olá, ${data?.user?.name}`} />

                <Text style={{ opacity: 0.45, paddingVertical: 5 }}>
                  {data?.user?.email}
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignSelf: 'stretch',
                    justifyContent: 'space-around',
                    marginTop: 23,
                  }}
                >
                  <View
                    style={{
                      alignContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 19 }}>
                      {data &&
                        moment(data?.user?.created_at).format(
                          'DD/MM/YYYY',
                        )}
                    </Text>
                    <Text>Entrou em</Text>
                  </View>
                  <View
                    style={{
                      alignContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 19 }}>
                      {data?.user?.__meta__?.orders_count}
                    </Text>
                    <Text>Pedidos realizados</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>
        <View style={{ flex: 1 }}>
          <View style={{ marginTop: metrics.baseMargin * 3 }}>
            <OptionButton
              icon="md-person"
              label="Alterar perfil"
              onPress={() => navigation.navigate('Profile')}
            />
            <OptionButton
              icon="md-compass"
              label="Alterar endereço"
              onPress={() => navigation.navigate('Address')}
            />
            <OptionButton
              icon="md-log-out"
              label="Sair"
              onPress={() => {
                dispatch(CartActions.clearCart());
                dispatch(LoginActions.loginLogout());
              }}
              isLastOption
              colorIcon="#e42618"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function OptionButton({
  icon,
  label,
  onPress,
  isLastOption,
  colorIcon,
}) {
  return (
    <RectButton
      style={[styles.option, isLastOption && styles.lastOption]}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons
            name={icon}
            size={22}
            color={colorIcon || 'rgba(0,0,0,0.35)'}
          />
        </View>
        <View style={styles.optionTextContainer}>
          <Text
            style={[
              styles.optionText,
              colorIcon ? { color: colorIcon } : {},
            ]}
          >
            {label}
          </Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingTop: 70,
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
    fontWeight: '300',
  },
});
