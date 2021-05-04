import { StyleSheet } from 'react-native';
import { colors, metrics } from '../../styles';

import { wpd, hpd } from '../../utils/scalling';

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.secundary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wpd(4),
    paddingVertical: metrics.basePadding / 2 + 11,
    marginVertical: hpd(2),
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default styles;
