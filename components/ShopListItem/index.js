import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import { colors } from '../../styles';
import { monetize } from '../../utils/index';
import styles from './styles';
import H3 from '../H3';
import H4 from '../H4';
import { baseURL } from '../../services/api';
import Picture from '../../assets/images/picture.svg';

export default function ShopListItem({ item }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Company', { item: item.id })
      }
      style={styles.card}
    >
      <View style={styles.container}>
        {item?.photo ? (
          <Image
            style={styles.image}
            source={{ uri: `${baseURL}/${item.photo}` }}
            resizeMode="stretch"
          />
        ) : (
          <View style={{ paddingRight: 10 }}>
            <Picture
              width="70"
              height="70"
              // eslint-disable-next-line global-require
              color="red"
            />
          </View>
        )}
        <View
          style={{
            flex: 1,
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}
        >
          {/* <H3 text={item.fantasy_name} /> */}
          <View style={{ flexDirection: 'column', marginTop: 4 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16 }}>{item?.name}</Text>
            </View>
            {/* <View style={{ flexDirection: 'row' }}>
              <H4 text="Variadas -" />
              <H4 text=" 2,2 km" />
              <H4 badge color={colors.primary} text=" Tem cupons" />
            </View> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 8,
              justifyContent: 'space-between',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                marginRight: 5,
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.6,
              }}
            >
              {item?.min_delivery_time && item?.max_delivery_time && (
                <>
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={12}
                    color={colors.darker}
                    style={{ marginRight: 3 }}
                  />
                  <H4
                    text={`${item?.min_delivery_time}-${item?.max_delivery_time} min`}
                  />
                </>
              )}
            </View>
            <View style={{ flexDirection: 'row', opacity: 0.6 }}>
              <MaterialCommunityIcons
                name="bike"
                size={14}
                color={colors.darker}
                style={{ marginRight: 3 }}
              />
              <H4
                text={
                  item?.delivery_price === 0
                    ? 'Grátis'
                    : monetize(item?.delivery_price)
                }
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
