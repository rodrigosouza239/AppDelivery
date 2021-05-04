import { Feather } from '@expo/vector-icons';
import * as React from 'react';
import { Text } from 'react-native';
import { metrics } from '../../styles';

export default function H4({ text, margin, badge, color }) {
  return (
    <Text
      style={[
        { fontSize: 12, fontWeight: '300' },
        margin ? { marginHorizontal: metrics.baseMargin } : {},
        badge ? { fontWeight: '500' } : {},
        color ? { color } : {},
      ]}
    >
      {text}
    </Text>
  );
}
