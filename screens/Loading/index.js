import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../styles';
import LottieView from 'lottie-react-native';
import loadingJson from '../../assets/images/loading.json';

import { useDispatch, useSelector } from 'react-redux';
import { Creators as LoginActions } from '../../store/ducks/login';

const Loading = ({ text }) => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);

  // React.useEffect(() => {
  //   console.tron.log('data', login);
  //   dispatch(LoginActions.loginLogout());
  // }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LottieView
        source={loadingJson}
        autoPlay
        loop
        style={{
          width: 35,
          height: 30,
        }}
      />
      <Text style={{ color: 'white', fontSize: 16 }}>{text}</Text>
    </View>
  );
};

export default Loading;
