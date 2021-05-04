import KeyboardSpacer from 'react-native-keyboard-spacer';

import FlashMessage, {
  showMessage,
} from 'react-native-flash-message';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

import {
  Image,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Feather, SimpleLineIcons } from '@expo/vector-icons';
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
import Tabs from '../../screens/Company/components/Tabs';
/** REDUX END */
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';

const CategorieSheet = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { loading, company: data } = useSelector(
    state => state.company,
  );
  const [tab, setTab] = useState(data?.categories[0]);

  return (
    <RBSheet
      ref={ref}
      closeOnDragDown
      closeOnPressMask={false}
      height={Dimensions.get('window').height - getStatusBarHeight()}
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
      {/* <View
        style={{
          backgroundColor: colors.white,
        }}
      >
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <H1 text="Departamentos" />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{}}
        >
          {data?.categories.map(e => (
            <TouchableOpacity
              style={{
                borderColor: e === tab ? 'rgba(34,60,120,1)' : '#ccc',
                borderWidth: e === tab ? 2 : 2,
                backgroundColor:
                  e === tab ? 'rgba(34,60,120,1)' : '#fff',
                bordeRadius: 100,
                marginHorizontal: 10,
                paddingHorizontal: 10,
                paddingVertical: 7,
                borderRadius: 100,
              }}
              key={e}
              onPress={() => setTab(e)}
            >
              <Text
                style={{
                  color: e === tab ? colors.white : colors.regular,
                  fontWeight: e === tab ? 'bold' : '300',
                }}
              >
                {e.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {tab?.subcategories.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{}}
          >
            {tab?.subcategories.map(e => (
              <TouchableOpacity
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  flexDirection: 'row',
                }}
                key={e}
                onPress={() => setTab(e)}
              >
                <Ionicons
                  name="ios-arrow-forward"
                  size={16}
                  color="black"
                />
                <Text
                  style={{
                    color:
                      e === tab ? colors.regular : colors.regular,
                    fontWeight: e === tab ? 'bold' : '300',
                    marginLeft: 7,
                  }}
                >
                  {e.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View> */}
      {/* <Tabs /> */}
      <FlashMessage position="top" />
    </RBSheet>
  );
});

export default CategorieSheet;
