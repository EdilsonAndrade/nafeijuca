import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';
import { GMAPS_KEY } from 'react-native-dotenv';
import GeoCode from 'react-geocode';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button, AddressText } from './styles';

export default function Location({ navigation }) {
  const [location, setLocation] = useState();


  useEffect(() => {
    async function getLocation() {
      const myAddress = await AsyncStorage.getItem('myAddress');
      if (myAddress !== null) {
        setLocation(myAddress);
      } else {
        let myLocation = '';
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            if (latitude && longitude) {
              GeoCode.setApiKey(GMAPS_KEY);
              GeoCode.setLanguage('pt-BR');
              GeoCode.fromLatLng(latitude, longitude).then(
                (response) => {
                  const { address_components } = response.results[0];
                  const street = address_components[1].short_name;
                  const neiborhood = address_components[2].short_name;
                  setLocation(`${street} - ${neiborhood}`);
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
    }
    getLocation();
  }, []);
  return (
    <Button onPress={() => navigation.navigate('LocationAddress')}>
      <>
        <AddressText numberOfLines={3}>{location}</AddressText>
        <Icon name="autorenew" size={22} color="rgba(235, 107, 107, 1)" style={{ fontWeight: 700 }} />
      </>
    </Button>
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
