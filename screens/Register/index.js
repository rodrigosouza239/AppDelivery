import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FlashMessage, {
  showMessage,
} from 'react-native-flash-message';

import KeyboardSpacer from 'react-native-keyboard-spacer';

import RBSheet from 'react-native-raw-bottom-sheet';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Formik } from 'formik';
import * as yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/** Internal Imports */
import { colors } from '../../styles';
/** Internal Imports Ends */

/** Components */
import Input from '../../components/Input';
import ButtonFill from '../../components/ButtonFill';
import H1 from '../../components/H1';

/** Components Ends */

/** REDUX */
import { useDispatch, useSelector } from 'react-redux';
import { Creators as RegisterActions } from '../../store/ducks/register';
/** REDUX END */

export default function Register({ navigation }) {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  return (
    <ScrollView style={{ padding: 20 }}>
      <Formik
        key="register"
        initialValues={{
          name: 'Anilton Veiga',
          email: 'anilton.veigaa@gmail.com',
          phone: '41997308176',
          cpf: '39520696844',
          password: '123mudar',
          password_confirmation: '123mudar',
        }}
        onSubmit={values =>
          dispatch(RegisterActions.registerRequest(values))
        }
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email('Digite um e-mail válido')
            .required('Campo obrigatório'),
          password: yup.string().required('Campo obrigatório'),
        })}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          isValid,
          setFieldTouched,
        }) => (
          <View style={{ borderWidht: 1 }}>
            <View style={{ paddingTop: 35 }}>
              <H1
                color={colors.primary}
                text="Faça seu cadastro"
                align="center"
              />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Input
                icon="account-outline"
                name="Nome"
                placeholder="Digite seu e-mail"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
                msg={errors.name ? errors.name : null}
              />
              <Input
                icon="email-outline"
                name="E-mail"
                placeholder="Digite seu e-mail"
                value={values.email}
                onChangeText={handleChange('email')}
                msg={errors.email ? errors.email : null}
              />
              <Input
                mask="cpf"
                icon="card-text-outline"
                name="Cpf"
                placeholder="Digite seu e-mail"
                value={values.cpf}
                onChangeText={handleChange('cpf')}
                msg={errors.cpf ? errors.cpf : null}
              />
              <Input
                icon="phone-in-talk"
                mask="cel-phone"
                name="Telefone"
                placeholder="Digite seu telefone"
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={() => setFieldTouched('phone')}
                msg={errors.phone ? errors.phone : null}
              />
              <Input
                icon="lock-outline"
                name="Senha"
                placeholder="Digite sua senha"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                msg={errors.password ? errors.password : null}
                secureTextEntry
              />
              <Input
                icon="lock-outline"
                name="Confirme sua senha"
                placeholder="Confirme sua senha"
                value={values.password_confirmation}
                onChangeText={handleChange('password_confirmation')}
                msg={
                  errors.password_confirmation
                    ? errors.password_confirmation
                    : null
                }
                secureTextEntry
              />
            </View>
            <ButtonFill
              title={'Cadastrar'}
              fontColor={colors.white}
              disabled={!isValid}
              color={colors.primary}
              onPress={() => handleSubmit()}
            />

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={23}
                color={colors.secundary}
              />
              <Text
                style={{
                  color: colors.secundary,
                  fontSize: 17,
                }}
              >
                LOGIN
              </Text>
            </TouchableOpacity>
            <KeyboardSpacer topSpacing={40} />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

Register.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({});
