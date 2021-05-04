import { showMessage } from 'react-native-flash-message';
import { colors } from '../styles';

export const showToast = (message, description, type, time) => {
  showMessage({
    message,
    description,
    backgroundColor: colors[type],
    floating: true,
    position: 'top',
    animationDuration: time || 400,
  });
};
