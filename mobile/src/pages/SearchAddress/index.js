import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native';
import GeoCode from 'react-geocode';
import { GMAPS_KEY } from 'react-native-dotenv';
import {
  ContainerBackAndInput, InputAddress, MainSafeAreaView, FlatListAddresses,
  AddressContainer, AddressTitleAndDetailContent, AddressName, AddressDetail,
} from './styles';
import HeaderInputSearch from '~/components/HeaderInputSearch';
import * as UserActions from '~/store/modules/user/actions';

export default function SearchAddress({ navigation }) {
  const dispatch = useDispatch();
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    async function getLocation() {
      let myLocation = '';
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (latitude && longitude) {
            dispatch(UserActions.setLocationSuccess({ latitude, longitude }));
            GeoCode.setApiKey(GMAPS_KEY);
            GeoCode.setLanguage('pt-BR');
            GeoCode.fromLatLng(latitude, longitude).then(
              (response) => {
                const { address_components } = response.results[0];
                const street = address_components[1].short_name;
                const neiborhood = address_components[2].short_name;
                const mapsData = [];
                response.results.forEach((addressCompo) => {
                  if (addressCompo.address_components.length >= 4) {
                    mapsData.push({ street: addressCompo.address_components[1].short_name, info: `${addressCompo.address_components[2].short_name} - ${addressCompo.address_components[3].short_name}` });
                  }
                });

                setMapData(mapsData);

                myLocation = `${street} - ${neiborhood}`;
                AsyncStorage.setItem('myAddress', myLocation).then(
                  (response) => {
                  },
                  (error) => {
                  },
                );
              },
              (error) => {
                console.tron.warn(error);
              },
            );
          }
        },
        (error) => {
          console.tron.warn(`error ${JSON.stringify(error)}`);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
      );
    }
    getLocation();
  }, []);
  const handleSearchAddress = async (text) => {
    if (text.length > 5) {
      GeoCode.setApiKey(GMAPS_KEY);
      GeoCode.setLanguage('pt-BR');
      GeoCode.setRegion('pt-BR');
      GeoCode.fromAddress(`${text}, ,  SP`).then(
        (response) => {
          const mapsData = [];
          response.results.forEach((addressCompo) => {
            mapsData.push({ street: ` ${addressCompo.address_components[1].short_name} - ${addressCompo.address_components[0].short_name}`, info: `${addressCompo.address_components[2].short_name} - ${addressCompo.address_components[3].short_name}` });
          });

          setMapData(mapsData);
        },
        (error) => {
          console.tron.warn(error);
        },
      );
    }
  };

  return (
    <>
      <HeaderInputSearch navigation={navigation}>
        <ContainerBackAndInput>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="keyboard-arrow-left" size={42} color="#EB6B6B" />
          </TouchableOpacity>
          <InputAddress placeholder="Digite o endereço e número" autoFocus onChangeText={handleSearchAddress} />
        </ContainerBackAndInput>
      </HeaderInputSearch>
      <MainSafeAreaView>
        <FlatListAddresses
          data={mapData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <AddressContainer>
              <Icon name="location-on" size={20} color="#ffc700" />
              <AddressTitleAndDetailContent>
                <AddressName>{item.street}</AddressName>
                <AddressDetail>{item.info}</AddressDetail>
              </AddressTitleAndDetailContent>
            </AddressContainer>
          )}
        />

      </MainSafeAreaView>

    </>
  );
}
SearchAddress.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
};

SearchAddress.defaultProps = {
  navigation: {},
};
