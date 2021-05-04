import React from 'react';

import { TouchableOpacity, Text } from 'react-native';
import LottieView from 'lottie-react-native';

import styles from './styles';
import loadingJson from '../../assets/images/loading.json';

const ButtonFill = ({
  title,
  icon,
  color,
  fontColor,
  onPress,
  disabled,
  style,
  textStyle,
  loading,
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={[
      styles.buttonContainer,
      { backgroundColor: color },
      style,
    ]}
  >
    <>
      {title && !loading ? (
        <Text
          style={[
            styles.buttonText,
            fontColor ? { color: fontColor } : null,
            textStyle,
          ]}
        >
          {title}
        </Text>
      ) : (
        icon
      )}
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
    </>
  </TouchableOpacity>
);

export default ButtonFill;
