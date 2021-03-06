import React, { useState, useMemo } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Alert } from 'react-native';
import { getPreciseDistance } from 'geolib';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  StoreMainView, StoreButton, StoreContainer, StoreColumnContainer, StoreName,
  StoreNeighborhood, StoreKm, StoreSwitch,
} from './styles';
import api from '~/services/api';

import selectStoreSuccess from '~/store/modules/store/actions';

export default function Store({ navigation }) {
  const [storeSelected, setStoreSelected] = useState();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  useMemo(() => {
    const userCoordenates = {
      longitude: user.longitude, latitude: user.latitude,
    };
    const loadStores = async () => {
      try {
        setLoading(true);
        
        const response = await api.get('/stores', {
          timeout: 5000,
        });
        
        let data = response.data.filter((x) => x.active === true);
        if (response.data.filter((x) => x.active === true) !== null) {
          data = data.map((x) => ({
            ...x,
            km: userCoordenates.latitude !== null ? getPreciseDistance({ latitude: x.latitude, longitude: x.longitude }, userCoordenates, 10) :0,
          }));
        }
        setStores(data);

        if (response.data.length === 1) {
          dispatch(selectStoreSuccess(response.data[0]));
          navigation.navigate('ProductGroup');
        }
        setLoading(false);
      } catch (err) {
        console.log('CAI NO ERRO')
        console.log(err, 'errorrr')
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
  }, [isFocused]);


  const selectStore = (store) => {
    setStoreSelected(store.id);
    dispatch(selectStoreSuccess(store));
    navigation.navigate('ProductGroup');
  };


  return (
    <>
      {loading ? <ActivityIndicator size="large" color="#ffc700" />
        : stores.map((store) => (
          <StoreMainView key={store.id}>
            <StoreButton onPress={() => selectStore(store)}>
              <StoreContainer>
                <StoreColumnContainer>
                  <StoreName>{store.name}</StoreName>
                  <StoreNeighborhood>{store.address}</StoreNeighborhood>
                  <StoreKm>
                    +-
                    {store.km}
                    /mts
                  </StoreKm>
                </StoreColumnContainer>
                <StoreSwitch trackColor={{ false: '#767577', true: '#eee' }} thumbColor={storeSelected === store.id ? '#ffc700' : '#eee'} onValueChange={() => selectStore(store)} value={storeSelected === store.id} />
              </StoreContainer>
            </StoreButton>

          </StoreMainView>

        ))}

    </>
  );
}

Store.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
