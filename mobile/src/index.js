import React from 'react';
import './config/ReactotronConfig';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {SafeAreaView, StatusBar} from 'react-native';
import {store, persistor} from './store';

import {NavigationContainer} from '@react-navigation/native';
const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="dark-content" color="#fff" />
          <SafeAreaView />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
