import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  StoreContainer, StoreColumnContainer, StoreButton, StoreName,
  StoreNeighborhood, StoreKm, StoreSwitch,
} from './styles';
import api from '~/services/api';

import selectStoreSuccess from '~/store/modules/store/actions';

export default function Store({ navigation }) {
  const [storeSelected, setStoreSelected] = useState();
  const dispatch = useDispatch();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loadStores = async () => {
      try {
        setLoading(true);
        const response = await api.get('/stores', {
          timeout: 5000,
        });
        setStores(response.data);

        if (response.data.length === 1) {
          dispatch(selectStoreSuccess(response.data[0]));
          navigation.navigate('Product');
        }
        setLoading(false);
      } catch (err) {
        const { message } = err;
        if (message.includes('timeout')) {
          Alert.alert('Sem internet?', 'Me parece que você está sem conexão, verifique sua internet');
        } else if (message.includes('Network Error')) {
          Alert.alert('Erro conexão?', 'Ocorreu um erro na conexão DB tente novamente');
        } else {
          Alert.alert('Erro', JSON.stringify(err));
        }

        setLoading(false);
      }
    };
    loadStores();
  }, []);

  const selectStore = (store) => {
    setStoreSelected(store.id);
    dispatch(selectStoreSuccess(store));
    navigation.navigate('Product');
  };

  return (
    <>
      {loading ? <ActivityIndicator size="large" color="#ffc700" />
        : stores.map((store) => (
          <StoreButton key={store.id} onPress={() => selectStore(store)}>
            <StoreContainer>
              <StoreColumnContainer>
                <StoreName>{store.name}</StoreName>
                <StoreNeighborhood>{store.address}</StoreNeighborhood>
                <StoreKm>+- 1.5km</StoreKm>
              </StoreColumnContainer>
              <StoreSwitch trackColor={{ false: '#767577', true: '#eee' }} thumbColor={storeSelected === store.id ? '#ffc700' : '#eee'} onValueChange={() => selectStore(store)} value={storeSelected === store.id} />
            </StoreContainer>
          </StoreButton>


        ))}

    </>
  );
}

Store.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
