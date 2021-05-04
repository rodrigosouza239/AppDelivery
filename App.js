import * as React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  UIManager,
} from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

import FlashMessage from 'react-native-flash-message';
import AlertProvider from 'react-native-alert-utils';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { navigationRef } from './services/navigation';
import useLinking from './navigation/useLinking';

/** REDUX */
import { store, persistor } from './store';
/** REDUX END */

import Router from './navigation/Router';

import spaceMono from './assets/fonts/SpaceMono-Regular.ttf';
import roboto from './assets/fonts/Roboto-Regular.ttf';
import robotoLight from './assets/fonts/Roboto-Light.ttf';
import robotoBold from './assets/fonts/Roboto-Bold.ttf';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(
    false,
  );
  const [
    initialNavigationState,
    setInitialNavigationState,
  ] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': spaceMono,
          roboto,
          'roboto-light': robotoLight,
          'roboto-bold': robotoBold,
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  }

  console.disableYellowBox = true;

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer
            ref={navigationRef}
            initialState={initialNavigationState}
          >
            <Router isLoadingComplete={isLoadingComplete} />
            {/* <Stack.Navigator headerShown>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Root"
                component={BottomTabNavigator}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="Company"
                component={CompanyScreen}
              />
            </Stack.Navigator> */}
          </NavigationContainer>
        </PersistGate>
      </Provider>
      <FlashMessage position="top" />
      <AlertProvider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
