import React, { useState, useEffect } from 'react';
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
  useEffect(() => {
    const loadStores = async () => {
      const response = await api.get('/stores');
      setStores(response.data);

      if (response.data.length === 1) {
        dispatch(selectStoreSuccess(response.data[0]));
        navigation.navigate('Product');
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
      {stores.map((store) => (
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
