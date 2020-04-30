import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ActivityIndicator } from 'react-native';
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

  useEffect(() => {
    async function getLocation() {
      const myAddress = await AsyncStorage.getItem('myAddress');
      console.tron.warn(myAddress);
      if (myAddress !== null) {
        console.tron.warn('entrei');
        setLocation(JSON.parse(myAddress));
      } else {
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
                (error) => {
                  setError(error);
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
    }
    if (isFocused) {
      getLocation();
    }
  }, [isFocused]);
  return (
    <>
      <Button onPress={() => navigation.navigate('LocationAddress')}>
        <>
          <AddressText numberOfLines={3}>

            {location.address.street}
            {location.address.number ? `, ${location.address.number}` : null}
            {location.address.addressLineTwo ? ` - ${location.address.addressLineTwo}` : null}

          </AddressText>
          {!error && location.address.street ? <Icon name="autorenew" size={22} color="rgba(235, 107, 107, 1)" style={{ fontWeight: 700 }} />
            : (
              <ActivityIndicatorView>
                <ActivityIndicator size={32} color="#ffc700" />
                <ActivityIndicatorText>Buscando locallização</ActivityIndicatorText>
              </ActivityIndicatorView>
            )}
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
