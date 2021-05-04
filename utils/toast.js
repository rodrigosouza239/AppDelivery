import { showMessage } from 'react-native-flash-message';
import { colors } from '../styles';

export const showToast = (
  message,
  description,
  type = 'success',
  time,
) => {
  showMessage({
    message,
    description,
    type,
    backgroundColor:
      type === 'success' ? colors.success : colors.tomato,
    floating: true,
    position: 'top',
    animationDuration: time || 400,
  });
};
