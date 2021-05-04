import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Notifications } from 'expo';
import { ScrollView } from 'react-native-gesture-handler';
import FlashMessage, {
  showMessage,
} from 'react-native-flash-message';

import KeyboardSpacer from 'react-native-keyboard-spacer';

import RBSheet from 'react-native-raw-bottom-sheet';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Formik } from 'formik';
import * as yup from 'yup';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

/** Internal Imports */
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../styles';
/** Internal Imports Ends */

/** Components */
import Input from '../../components/Input';
import ButtonFill from '../../components/ButtonFill';
import H1 from '../../components/H1';

import logo from '../../assets/images/logo-colored-small.png';

/** Components Ends */

/** REDUX */
import { Creators as LoginActions } from '../../store/ducks/login';
/** REDUX END */

export default function Login({ navigation, route }) {
  const dispatch = useDispatch();
  const login = useSelector(state => state.login);
  const navigateBackTo = route.params?.navigateBackTo;

  const submit = async values => {
    let expo_token = null;
    try {
      expo_token = await Notifications.getExpoPushTokenAsync();
    } catch (error) {}
    dispatch(
      LoginActions.loginRequest({
        navigateBackTo,
        ...(expo_token ? { expo_token } : {}),
        ...values,
      }),
    );
  };

  function renderBackButtonText(screen) {
    if (screen === 'Cart') {
      return 'Voltar para o carrinho';
    }
    return 'Voltar';
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 20,
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      {navigateBackTo && (
        <TouchableOpacity
          onPress={() => navigation.navigate(navigateBackTo)}
          style={{
            position: 'absolute',
            top: 0,
            paddingTop: getStatusBarHeight() + 10,
            paddingLeft: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Ionicons
            name="md-arrow-back"
            size={23}
            color={colors.darker}
          />
          <Text style={{ marginLeft: 10 }}>
            {renderBackButtonText(navigateBackTo)}
          </Text>
        </TouchableOpacity>
      )}
      <SafeAreaView>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            style={{ width: 80 }}
            resizeMode="contain"
            source={logo}
          />
          <H1
            color={colors.primary}
            text="Faça seu login"
            align="center"
          />
        </View>
        <Formik
          initialValues={{
            email: 'test@user.com',
            password: 'teste123',
          }}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email('Digite um e-mail válido')
              .required('Campo obrigatório'),
            password: yup.string().required('Campo obrigatório'),
          })}
          onSubmit={submit}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            setFieldTouched,
          }) => (
            <>
              <Input
                icon="account-outline"
                placeholder="Seu e-mail"
                keyboardType="email-address"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                msg={
                  touched.email && errors.email ? errors.email : null
                }
              />
              <Input
                icon="lock-outline"
                placeholder="Sua senha"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                secureTextEntry
                msg={
                  touched.password && errors.password
                    ? errors.password
                    : null
                }
              />

              <ButtonFill
                title="ENTRAR"
                color={colors.primary}
                disabled={login.loading}
                loading={login.loading}
                onPress={handleSubmit}
                fontColor={colors.white}
              />
            </>
          )}
        </Formik>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: colors.secundary,
              fontSize: 17,
            }}
          >
            FAZER CADASTRO
          </Text>
          <MaterialCommunityIcons
            name="arrow-right"
            size={23}
            color={colors.secundary}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

Login.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({});
