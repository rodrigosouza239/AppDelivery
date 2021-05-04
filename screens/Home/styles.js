import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

const styles = StyleSheet.create({
  loading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingContainer: {
    marginHorizontal: 15,
    marginBottom: 5,
  },
  containerCategory: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  category: {
    backgroundColor: colors.primary,
    padding: 20,
    margin: 5,
    borderRadius: 200,
  },

  selected: {
    borderColor: colors.primary,
    borderWidth: 3,

    backgroundColor: '#fff',
  },
});

export default styles;
