import { StyleSheet } from 'react-native';

import { metrics, colors } from '../../styles';

const styles = StyleSheet.create({
  loading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingContainer: {
    marginHorizontal: 15,
    marginBottom: 5,
  },

  card: {
    padding: metrics.baseMargin,
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    width: 55,
    height: 55,
    backgroundColor: colors.white,
    borderRadius: 5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
  },
  description: {
    fontSize: 13,
    fontWeight: '300',
  },
});

export default styles;
