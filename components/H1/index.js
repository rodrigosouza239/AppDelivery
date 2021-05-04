import { Feather } from '@expo/vector-icons';
import * as React from 'react';
import { Text } from 'react-native';
import { metrics } from '../../styles';

export default function H1({ text, margin, align, color }) {
  return (
    <Text
      style={[
        { fontSize: 19, fontWeight: '300' },
        color ? { color: color } : {},
        margin ? { marginHorizontal: metrics.baseMargin } : {},
        align ? { textAlign: align } : {},
      ]}
    >
      {text}
    </Text>
  );
}
