import * as React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {
  RectButton,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';
import { Creators as LocationsActions } from '../../../store/ducks/locations';

import { useKeyboard } from '../../../Hooks/KeyboardHeight';

import apiViaCep from '../../../services/viacep';
import { showToast } from '../../../utils/toast';

import { Formik } from 'formik';
import * as yup from 'yup';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import H4 from '../../../components/H4';
import SimpleHeader from '../../../components/SimpleHeader';
import Input from '../../../components/Input';
import ButtonFill from '../../../components/ButtonFill';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { colors } from '../../../styles';

export default function Zipcode({ navigation, route }) {
  const dispatch = useDispatch();
  const locations = useSelector(state => state.locations);

  const [onlyCep, setOnlyCep] = React.useState(true);
  const [cepResponse, setCepResponse] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [address, setAddress] = React.useState(
    route?.params?.address,
  );

  React.useEffect(() => {
    if (address) {
      setOnlyCep(false);
      setCepResponse(address);
    }
  }, []);

  async function checkCep(values) {
    setLoading(true);
    try {
      const response = await apiViaCep.get(
        `${values.replace('-', '')}/json`,
      );
      if (response.data.erro) {
        showToast(
          'Ops!',
          'O CEP que você digitou não existe',
          'danger',
        );
      } else {
        setCepResponse(response.data);
        setTimeout(() => {
          setOnlyCep(false);
        }, 200);
        showToast(
          'Oba!',
          'O CEP que você digitou não existe',
          'success',
        );
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
    setLoading(false);
  }

  function saveAddress(values, active) {
    dispatch(
      LocationsActions.addLocation(
        {
          ...values,
          is_active: active,
        },
        navigation,
      ),
    );
  }

  function updateAddress(values, active) {
    dispatch(
      LocationsActions.updateLocation(
        {
          id: address?.id,
          ...values,
          is_active: active,
        },
        navigation,
      ),
    );
  }

  function confirmActiveAddress(values) {
    Alert.alert(
      'Endereço principal',
      'Você deseja receber seus pedidos nesse endereço?',
      [
        {
          text: 'Sim',
          onPress: () =>
            address
              ? updateAddress(values, true)
              : saveAddress(values, true),
          style: 'cancel',
        },
        {
          text: 'Não',
          onPress: () =>
            address
              ? updateAddress(values, false)
              : saveAddress(values, false),
          style: 'default',
        },
      ],
      { cancelable: false },
    );
  }

  return (
    <View style={styles.container}>
      <SimpleHeader
        goBack={
          onlyCep ? () => navigation.goBack() : () => setOnlyCep(true)
        }
        text="Insira um CEP"
      />
      {onlyCep && (
        <View style={styles.contentContainer}>
          <Formik
            key="cep-form"
            initialValues={{
              cep: '',
            }}
            onSubmit={values => checkCep(values.cep)}
            validationSchema={yup.object().shape({
              cep: yup.string().required('Campo obrigatório'),
            })}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              isValid,
              touched,
              setFieldTouched,
            }) => (
              <>
                <Input
                  mask="zip-code"
                  icon="home-outline"
                  placeholder="Ex: 17730-123"
                  keyboardType="email-address"
                  value={values.cep}
                  onChangeText={handleChange('cep')}
                  onBlur={() => setFieldTouched('cep')}
                  msg={touched.cep && errors.cep ? errors.cep : null}
                  disabled={!onlyCep ? true : false}
                />

                {onlyCep && (
                  <ButtonFill
                    title="BUSCAR"
                    fontColor={colors.white}
                    disabled={!isValid}
                    color={colors.primary}
                    loading={loading}
                    onPress={() => handleSubmit()}
                  />
                )}
              </>
            )}
          </Formik>
        </View>
      )}
      {cepResponse && !onlyCep && (
        <Formik
          initialValues={{
            zipcode: cepResponse?.cep || cepResponse?.zipcode,
            street: cepResponse?.logradouro || cepResponse?.street,
            number: cepResponse?.numero || cepResponse?.number,
            district: cepResponse?.bairro || cepResponse?.district,
            city: cepResponse?.localidade || cepResponse?.city,
            state: cepResponse?.uf || cepResponse?.state,
            complement:
              cepResponse?.complemento || cepResponse?.complement,
          }}
          validationSchema={yup.object().shape({
            street: yup.string().required('Campo obrigatório'),
            number: yup.string().required('Campo obrigatório'),
            district: yup.string().required('Campo obrigatório'),
            city: yup.string().required('Campo obrigatório'),
            state: yup.string().required('Campo obrigatório'),
          })}
          onSubmit={values => confirmActiveAddress(values)}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            setFieldTouched,
          }) => (
            <KeyboardAvoidingView
              behavior={'padding'}
              style={styles.containerKey}
            >
              <ScrollView style={styles.scrollView}>
                <Input
                  mask="zip-code"
                  icon="home-outline"
                  placeholder="Ex: 17730-123"
                  keyboardType="email-address"
                  value={values.zipcode}
                  onChangeText={handleChange('zipcode')}
                  onBlur={() => setFieldTouched('zipcode')}
                  msg={
                    touched.zipcode && errors.zipcode
                      ? errors.zipcode
                      : null
                  }
                  disabled={!onlyCep ? true : false}
                />
                <Input
                  name="Cidade"
                  placeholder="Sua cidade"
                  value={values.city}
                  onChangeText={handleChange('city')}
                  msg={errors.city ? errors.city : null}
                  disabled
                />
                <Input
                  name="Estado"
                  placeholder="UF"
                  value={values.state}
                  onChangeText={handleChange('state')}
                  msg={errors.state ? errors.state : null}
                  disabled
                />

                <Input
                  name="Endereço"
                  placeholder="Rua, Av..."
                  value={values.street}
                  onChangeText={handleChange('street')}
                  msg={errors.street ? errors.street : null}
                />
                <Input
                  name="Bairo"
                  placeholder="Seu bairro"
                  value={values.district}
                  onChangeText={handleChange('district')}
                  msg={errors.district ? errors.district : null}
                />
                <Input
                  name="Número"
                  placeholder=""
                  value={values.number}
                  onChangeText={handleChange('number')}
                  msg={errors.number ? errors.number : null}
                />
                <Input
                  name="Complemento"
                  placeholder="Ex: Apt 11, Esquina"
                  value={values.complement}
                  onChangeText={handleChange('complement')}
                  msg={errors.complement ? errors.complement : null}
                />
                <ButtonFill
                  title={address ? 'Alterar' : 'SALVAR'}
                  color={colors.primary}
                  // disabled={loading}
                  // loading={login.loading}
                  onPress={handleSubmit}
                  fontColor={colors.white}
                />
              </ScrollView>
            </KeyboardAvoidingView>
          )}
        </Formik>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
    paddingHorizontal: 20,
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
  containerKey: {
    flex: 1,
  },
  scrollView: { paddingHorizontal: 20 },
  input: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderColor: '#dbdbdb',
    padding: 10,
  },
});
