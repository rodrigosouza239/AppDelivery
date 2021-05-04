import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import { SimpleLineIcons } from '@expo/vector-icons';
import SkeletonContent from 'react-native-skeleton-content';

/** Internal Imports */
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import { colors } from '../../styles';
/** Internal Imports Ends */

/** Components */

/** Components Ends */

/** REDUX */
import { Creators as LocationsActions } from '../../store/ducks/locations';
/** REDUX END */

export default function CurrentPlace({ open, close, navigation }) {
  const [active, setActive] = React.useState(1);

  const { locations, currentLocation } = useSelector(
    state => state.locations,
  );
  const { data } = useSelector(state => state.login);

  // React.useEffect(() => {
  //   if (locations.length === 0) {
  //     open();
  //   }
  // }, []);

  function handleActive(index) {
    if (index !== active) {
      setActive(index);
    }
  }
  return (
    <SafeAreaView>
      <SkeletonContent
        containerStyle={{
          flex: 1,
          width: 300,
          marginLeft: 10,
          marginVertical: 10,
          opacity: 0.9,
        }}
        isLoading={false}
        layout={[
          { key: 'address', width: 220, height: 20, marginBottom: 6 },
        ]}
      >
        <TouchableOpacity
          onPress={() =>
            data && locations.length > 0
              ? navigation.navigate('Address')
              : open()
          }
          style={styles.addressContainer}
        >
          <Text style={{ fontSize: 14, fontColor: colors.darker }}>
            Você esta em
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.addressText}>
              {currentLocation
                ? `${currentLocation.street}, ${
                    currentLocation.number
                      ? `${currentLocation.number},`
                      : ''
                  } ${
                    currentLocation.city
                      ? `${currentLocation.city}`
                      : ''
                  }`
                : 'Adicione um endereço'}
            </Text>
            <SimpleLineIcons
              name="arrow-down"
              size={15}
              color={colors.primary}
            />
          </View>
        </TouchableOpacity>
      </SkeletonContent>
    </SafeAreaView>
  );
}
