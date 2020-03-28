import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import '~/config/Reactotron';
import { store, persistor } from '~/store';
import Routes from './routes';
import history from './services/history';
import GlobalStyle from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <GlobalStyle />
          <Routes />
        </Router>
      </PersistGate>
      <ToastContainer autoClose={3000} />
    </Provider>
  );
}

export default App;
