import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import { SimpleLineIcons } from '@expo/vector-icons';
import { colors } from '../../styles';

import styles from './styles';

export default function S({ open, close }) {
  const [active, setActive] = React.useState(1);

  function handleActive(index) {
    if (index !== active) {
      setActive(index);
    }
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => handleActive(1)}
          style={[
            styles.button,
            active === 1 ? styles.buttonActive : [],
          ]}
        >
          <Text
            style={active === 1 ? styles.textActive : styles.text}
          >
            Entrega
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleActive(2)}
          style={[
            styles.button,
            active === 2 ? styles.buttonActive : [],
          ]}
        >
          <Text
            style={active === 2 ? styles.textActive : styles.text}
          >
            Retirada
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => open()}
        style={styles.addressContainer}
      >
        <Text style={styles.addressText}>
          R: Arlindo Cardoso Vieira, 116
        </Text>
        <SimpleLineIcons
          name="arrow-down"
          size={10}
          color={colors.primary}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
