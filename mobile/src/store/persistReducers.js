import AsyncStorage from '@react-native-community/async-storage';

import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'nafeijuca',
      storage: AsyncStorage,
      whitelist: ['product'],
    },
    reducers,
  );
  return persistedReducer;
};
