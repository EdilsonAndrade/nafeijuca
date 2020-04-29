import React from 'react';
import GeoCode from 'react-geocode';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';
import { GMAPS_KEY } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import * as UserActions from '~/store/modules/user/actions';
import {
  MarkerView, MarkerIcon, MarkerContainer, MarkerTitle, MarkerText, MakertTextsContainer,
  ConfirmContainer, ConfirmButton, ConfirmText,
} from './styles';

export default function MapAddress({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const myRegion = {
    latitude: user.latitude, longitude: user.longitude, longitudeDelta: 0.0134, latitudeDelta: 0.0143,
  };


  const handleRegionChange = async (region) => {
    const { longitude, latitude } = region;
    GeoCode.setApiKey(GMAPS_KEY);
    GeoCode.setLanguage('pt-BR');
    GeoCode.fromLatLng(latitude, longitude).then(
      async (response) => {
        const { address_components } = response.results[0];
        const street = address_components.length > 5 ? address_components[1].short_name : address_components[0].short_name;
        const neiborhood = address_components.length > 5 ? address_components[2].short_name : address_components[1].short_name;

        const myLocation = `${street} - ${neiborhood}`;
        await AsyncStorage.setItem('myAddress', myLocation);

        dispatch(UserActions.setLocationSuccess({
          latitude,
          longitude,
          address: {
            addressLine: address_components.length > 5 ? address_components[1].short_name : address_components[0].short_name,
            number: address_components.length > 5 ? address_components[0].short_name : user.address.number || 0,
            neighborhood: address_components.length > 5 ? address_components[2].short_name : address_components[1].short_name,
            city: address_components.length > 5 ? address_components[3].short_name : address_components[2].short_name,
            state: address_components.length > 5 ? address_components[4].short_name : address_components[3].short_name,
          },
        }));
      },
      (error) => {
        console.tron.warn(error);
      },
    );
  };
  return (
    <>
      <MapView
        style={{ flex: 1 }}
        region={myRegion}
        loadingEnabled
      >
        <Marker
          coordinate={myRegion}
          draggable
          onDragEnd={(e) => handleRegionChange(e.nativeEvent.coordinate)}
        >
          <MarkerView>
            <MarkerContainer>
              <MakertTextsContainer>
                <MarkerTitle>Local de entrega!</MarkerTitle>
                <MarkerText>Este é o local da entrega?</MarkerText>
              </MakertTextsContainer>
              <MarkerIcon name="room" size={42} />
            </MarkerContainer>
          </MarkerView>
        </Marker>
      </MapView>

      <ConfirmContainer>
        <ConfirmButton onPress={() => navigation.navigate('AddressConfirmation')}>
          <ConfirmText>
            Confirmar endereço
          </ConfirmText>
        </ConfirmButton>
      </ConfirmContainer>
    </>
  );
}

MapAddress.propTypes = {
  navigation: PropTypes.shape({}),
};

MapAddress.defaultProps = {
  navigation: {},
};
