/* eslint-disable no-console */
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import { reactotronConfigure } from '../config/ReactotronConfig';
import rootReducer from './ducks';
import rootSagas from './sagas';

/** SECURE STORAGE */

reactotronConfigure();

const persistConfig = {
  key: '@DELIVERIE@:',
  storage: AsyncStorage,
  whitelist: ['login'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const middlewares = [];
middlewares.push(sagaMiddleware);

const composer = __DEV__
  ? compose(
      applyMiddleware(...middlewares),
      console.tron.createEnhancer(),
    )
  : compose(applyMiddleware(...middlewares));

const store = createStore(persistedReducer, composer);
const persistor = persistStore(store);

sagaMiddleware.run(rootSagas);

export { store, persistor };
