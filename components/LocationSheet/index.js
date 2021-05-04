import KeyboardSpacer from 'react-native-keyboard-spacer';

import FlashMessage, {
  showMessage,
} from 'react-native-flash-message';
import * as React from 'react';
import {
  Image,
  View,
  Text,
  ScrollView,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Feather, SimpleLineIcons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../utils/toast';

import apiViaCep from '../../services/viacep';

/** Internal Imports */
import { colors } from '../../styles';
import styles from './styles';
/** Internal Imports Ends */

/** Components */
import Input from '../Input';
import ButtonFill from '../ButtonFill';
import H1 from '../H1';
/** Components Ends */

/** REDUX */
import { Creators as LocationsActions } from '../../store/ducks/locations';
/** REDUX END */

const LocationSheet = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [validCep, setValidCep] = React.useState(null);
  const schema = () =>
    yup.object().shape({
      cep: yup
        .string()
        .matches(/[0-9]{5}-[0-9]{3}/, 'CEP inválido')
        .required('Preencha o CEP corretamente'),
    });

  const { locations, currentLocation } = useSelector(
    state => state.locations,
  );

  function saveAddres(values) {
    AsyncStorage.setItem('address', JSON.stringify(values));
    dispatch(
      LocationsActions.setLocation({
        street: values.logradouro,
        district: values.bairro,
        city: values.localidade,
        state: values.uf,
        zipcode: values.cep,
      }),
    );
    setTimeout(() => {
      ref.current.close();
    }, 2000);
  }

  async function getAddress(values) {
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
        saveAddres(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <RBSheet
      ref={ref}
      closeOnDragDown={false}
      closeOnPressMask={false}
      height={Dimensions.get('window').height / 1.5}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.4)',
        },
        draggableIcon: {
          backgroundColor: colors.primary,
        },
        container: {
          backgroundColor: 'white',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
      }}
    >
      <FlashMessage position="top" />
      <Formik
        key="cep-form"
        initialValues={{
          cep: '',
        }}
        onSubmit={values => getAddress(values.cep)}
        validationSchema={schema}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          isValid,
        }) => (
          <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
              <Feather
                name="map-pin"
                size={32}
                color={colors.primary}
                style={{ marginVertical: 20 }}
              />
              <H1
                align="center"
                text={`Digite o cep da cidade ${'\n'} em que você está`}
              />
              <Input
                mask="zip-code"
                name="CEP"
                keyboardType="number-pad"
                placeholder="Insira seu CEP"
                value={values.cep}
                onChangeText={handleChange('cep')}
                msg={errors.cep ? errors.cep : null}
              />
            </View>
            {isValid && values.cep.length > 0 && (
              <ButtonFill
                title="Confirmar"
                fontColor={colors.white}
                disabled={!isValid}
                color={colors.primary}
                loading={loading}
                onPress={() => handleSubmit()}
              />
            )}
            {validCep && (
              <View>
                <Text>Você esta em {JSON.stringify(validCep)}</Text>
              </View>
            )}
          </View>
        )}
      </Formik>
    </RBSheet>
  );
});

export default LocationSheet;
