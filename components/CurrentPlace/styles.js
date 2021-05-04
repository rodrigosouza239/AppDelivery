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
    alignItems: 'flex-start',
  },
  addressText: {
    color: colors.dark,

    marginRight: 5,
    fontWeight: '300',
  },
});

export default styles;
