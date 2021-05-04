import { StyleSheet } from 'react-native';

import { metrics, colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: colors.lighter,
    marginHorizontal: metrics.baseMargin,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    height: 40,
    justifyContent: 'center',
    marginRight: 22,
    alignContent: 'center',
    borderBottomColor: colors.lighter,
  },
  buttonActive: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  text: {
    color: colors.regular,
    fontSize: 16,
    fontWeight: '500',
  },
  textActive: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
  },
  addressContainer: {
    marginHorizontal: metrics.baseMargin,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    color: colors.dark,
    fontWeight: '500',
    marginRight: 5,
  },
});

export default styles;
