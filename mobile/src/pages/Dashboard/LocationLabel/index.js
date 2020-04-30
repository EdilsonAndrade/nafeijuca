import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import PropTypes from 'prop-types';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';
import { GMAPS_KEY } from 'react-native-dotenv';
import GeoCode from 'react-geocode';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Button, AddressText, CityAndInfosContainer, CityAndInfosText, ActivityIndicatorView, ActivityIndicatorText,
} from './styles';
import * as UserActions from '~/store/modules/user/actions';

export default function Location({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [error, setError] = useState();
  const [location, setLocation] = useState({
    address: {
      street: '',
      neighborhood: '',

    },
  });


  const handleSearchLocation = () => {
    setError(null);
    let myLocation = '';
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (latitude && longitude) {
          dispatch(UserActions.setLocationSuccess({ latitude, longitude }));
          GeoCode.setApiKey(GMAPS_KEY);
          GeoCode.setLanguage('pt-BR');
          GeoCode.fromLatLng(latitude, longitude).then(
            async (response) => {
              const { address_components } = response.results[0];


              myLocation = {
                address:
                {
                  street: address_components[1].short_name,
                  neighborhood: address_components[2].short_name,
                },
              };
              setLocation(myLocation);
              await AsyncStorage.setItem('myAddress', JSON.stringify(myLocation));
            },
            () => {
              setError('Ocorreu um erro ao obter a localização');
            },
          );
        }
      },
      () => {
        setError('Ocorreu um erro ao obter a localização');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
    );
  };
  useEffect(() => {
    async function getLocation() {
      const myAddress = await AsyncStorage.getItem('myAddress');
      if (myAddress !== null) {
        setLocation(JSON.parse(myAddress));
      } else {
        handleSearchLocation();
      }
    }
    if (isFocused) {
      getLocation();
    }
  }, [isFocused]);
  const renderSearchingAddress = () => {
    if (error) {
      return (
        <ActivityIndicatorView>
          <TouchableOpacity onPress={handleSearchLocation}><ActivityIndicatorText>Ocorreu um erro ao buscar sua localização, click aqui para tentar novamente!</ActivityIndicatorText></TouchableOpacity>
        </ActivityIndicatorView>
      );
    }
    if (!location || !location.address || !location.address.street) {
      return (
        <ActivityIndicatorView>
          <ActivityIndicator size={42} color="#ffc700" />
          <ActivityIndicatorText>Buscando localização</ActivityIndicatorText>
        </ActivityIndicatorView>
      );
    }
    return (<Icon name="autorenew" size={22} color="rgba(235, 107, 107, 1)" style={{ fontWeight: 700 }} />);
  };
  return (
    <>
      <Button onPress={() => navigation.navigate('LocationAddress')}>
        <>
          <AddressText numberOfLines={3}>

            {location.address.street}
            {location.address.number ? `, ${location.address.number}` : null}
            {location.address.addressLineTwo ? ` - ${location.address.addressLineTwo}` : null}

          </AddressText>
          {renderSearchingAddress()}


        </>

      </Button>
      <CityAndInfosContainer>
        <CityAndInfosText>

          {location.address.neighborhood}
          {location.address.city ? ` - ${location.address.city}` : ''}
          {location.address.state ? ` - ${location.address.state}` : ''}

        </CityAndInfosText>
      </CityAndInfosContainer>
    </>
  );
}

Location.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};
Location.defaultProps = {
  navigation: {},
};
