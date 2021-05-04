import React from 'react';

import { TouchableOpacity, Text } from 'react-native';
import LottieView from 'lottie-react-native';

import styles from './styles';
import loadingJson from '../../assets/images/loading.json';

const ButtonOutline = ({
  style,
  title,
  color,
  textColor,
  loading,
  onPress,
  disabled,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.buttonContainer, { borderColor: color }, style]}
    disabled={disabled}
  >
    {title && loading && (
      <LottieView
        source={loadingJson}
        autoPlay
        loop
        style={{
          width: 20,
          height: 20,
        }}
      />
    )}
    {title && !loading && (
      <Text style={[styles.buttonText, { color: textColor }]}>
        {title}
      </Text>
    )}
  </TouchableOpacity>
);

ButtonOutline.defaultProps = {
  textColor: 'white',
  loading: false,
};

export default ButtonOutline;
