import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

const InputMessage = ({ msg }) => (
  <Text style={styles.text}>{msg}</Text>
);

export default InputMessage;
