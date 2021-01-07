import React from 'react';

import './config/ReactotronConfig';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '~/services/rootNavigation';

import { store, persistor } from './store';
import Routes from './routes';


const App:React.FC = () => (
  <NavigationContainer ref={navigationRef}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  </NavigationContainer>
);

export default App;
