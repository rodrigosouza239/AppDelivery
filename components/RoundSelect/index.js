import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../styles';

// import { Container } from './styles';

const RoundSelect = ({ selected, text, style, onPress, money }) => {
  if (money) {
    return (
      <View
        style={[
          { justifyContent: 'center', alignItems: 'center' },
          style,
        ]}
      >
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
          onPress={onPress}
        >
          <View
            style={{
              width: 28,
              height: 28,
              backgroundColor: '#ccc',
              borderRadius: 15,
              marginRight: 10,
              padding: 6,
            }}
          >
            <View
              style={{
                width: 15,
                height: 15,
                backgroundColor: selected ? colors.darker : '#ccc',
                borderRadius: 15,
                marginRight: 10,
              }}
            />
          </View>
          <Text style={{ textAlign: 'center', color: colors.darker }}>
            {text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View
      style={[
        { justifyContent: 'center', alignItems: 'center' },
        style,
      ]}
    >
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={onPress}
      >
        <View
          style={{
            width: 28,
            height: 28,
            backgroundColor: '#ccc',
            borderRadius: 15,
            marginRight: 10,
            padding: 6,
          }}
        >
          <View
            style={{
              width: 15,
              height: 15,
              backgroundColor: selected ? colors.primary : '#ccc',
              borderRadius: 15,
              marginRight: 10,
            }}
          />
        </View>
        <Text style={{ textAlign: 'center' }}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

RoundSelect.defaultProps = {
  selected: false,
  text: '',
  style: {},
  onPress: () => {},
};

export default RoundSelect;
