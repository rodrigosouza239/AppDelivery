import { Feather } from '@expo/vector-icons';
import * as React from 'react';
import { Text } from 'react-native';
import { metrics } from '../../styles';

export default function H3({ text, margin, color, align }) {
  return (
    <Text
      style={[
        { fontSize: 14, fontWeight: '400' },
        color ? { color: color } : {},
        margin ? { marginHorizontal: metrics.baseMargin } : {},
        align ? { textAlign: align } : {},
      ]}
    >
      {text}
    </Text>
  );
}
