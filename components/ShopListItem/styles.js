import { StyleSheet } from 'react-native';

import { metrics, colors } from '../../styles';
import { wpd } from '../../utils/scalling';

const styles = StyleSheet.create({
  card: {
    marginHorizontal: metrics.baseMargin,
    marginBottom: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  container: {
    flexDirection: 'row',
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: 70,

    aspectRatio: 3.5 / 3.5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
});

export default styles;
