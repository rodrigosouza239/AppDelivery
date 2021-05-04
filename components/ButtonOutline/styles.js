import { StyleSheet } from 'react-native';

import { wpd, hpd } from '../../utils/scalling';

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: wpd(4),
    marginVertical: hpd(2),
  },
  buttonText: {},
});

export default styles;
