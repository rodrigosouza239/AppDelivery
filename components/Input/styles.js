import { StyleSheet } from 'react-native';
import { metrics, colors } from '../../styles';

import { hpd } from '../../utils/scalling';

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius * 3,
    padding: metrics.basePadding / 2 + 7,
    alignItems: 'center',
  },
  inputContainerFirst: {
    flexDirection: 'row',
    width: '95%',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius * 3,
    padding: metrics.basePadding / 2 + 7,
    alignItems: 'center',
    marginRight: 10,
  },

  input: {
    color: colors.darker,
    fontWeight: '300',
    width: '50%',
  },
  text: {
    paddingBottom: 3,
    marginTop: 10,
    fontSize: 12,
  },
});

export default styles;
