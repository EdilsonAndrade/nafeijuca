import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Platform, TouchableOpacity, View,
} from 'react-native';


import { GMAPS_KEY } from 'react-native-dotenv';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
  Container, ViewContainer, StreetText, DetailsAddress, InfoText, ViewInfo,
} from './styles';
import * as UserActions from '~/store/modules/user/actions';

export default function SearchAddress({ navigation }) {
  const dispatch = useDispatch();

  const handleSelectAddress = async (data, details) => {
    const { geometry } = details;
    const { location } = geometry;

    const { address_components } = details;
    const myLocation = {
      latitude: location.lat,
      longitude: location.lng,
      address: {
        street: address_components.length > 5
          ? address_components[1].short_name
          : address_components[0].short_name,
        number: address_components.length > 5
          ? address_components[0].short_name
          : 0,
        neighborhood: address_components.length > 5
          ? address_components[2].short_name
          : address_components[1].short_name,
        city: address_components.length > 5
          ? address_components[3].short_name
          : address_components[2].short_name,
        state: address_components.length > 5
          ? address_components[4].short_name
          : address_components[3].short_name,
      },
    };
    dispatch(UserActions.setLocationSuccess(myLocation));

    await AsyncStorage.setItem('myAddress', JSON.stringify(myLocation));

    navigation.navigate('MapAddress');
  };

  return (
    <Container>
      <GooglePlacesAutocomplete
        autoFocus
        debounce={500}
        minLength={3}
        placeholder="Digite o endereço e número"
        onPress={(data, details) => handleSelectAddress(data, details)}
        query={{
          key: GMAPS_KEY,
          language: 'pt',

        }}

        textInputProps={{
          autoCapitalize: 'none',
          autoCorrect: false,

        }}
        fetchDetails
        currentLocation
        enablePoweredByContainer
        renderLeftButton={() => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="keyboard-arrow-left" size={42} color="#EB6B6B" />
          </TouchableOpacity>
        )}
        numberOfLines={2}
        renderRow={(row) => (
          <ViewContainer>

            {row.structured_formatting && <Icon name="location-on" size={22} color="#666" />}
            <View style={{ margin: 10 }}>
              <StreetText>

                {row.structured_formatting && row.structured_formatting.main_text}
              </StreetText>
              <DetailsAddress>
                {row.structured_formatting && row.structured_formatting.secondary_text}
              </DetailsAddress>

            </View>
          </ViewContainer>
        )}
        currentLocationLabel="Lista de localização"
        styles={{

          row: {
            marginTop: 10,
            marginBottom: 10,

          },
          description: { fontSize: 15 },
          container: {
            position: 'absolute',
            top: Platform.select({ ios: 60, android: 40 }),
            width: '100%',
            padding: 20,
          },
          textInputContainer: {
            backgroundColor: '#ddd',
            marginTop: 0,
            marginBottom: 0,
            margintLeft: 0,
            marginRight: 0,
            borderTopWidth: 0,
            borderBottomWidth: 0,
            fontSize: '16px',
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            borderRadius: 6,
            elevation: 5,
          },
          poweredContainer: {
            backgroundColor: 'transparent',
          },
          powered: {
            height: 15,
          },
          textInput: {
            top: 0,
            left: 0,
            marginTop: 3,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 10,
            height: 35,
            color: '#5d5d5d',
            fontSize: 16,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            backgroundColor: '#ddd',

          },
        }}
      >
        <ViewInfo>
          <InfoText>
            Após digitar o endereço e número clique na lista para confirmar no mapa;
          </InfoText>
        </ViewInfo>
      </GooglePlacesAutocomplete>

    </Container>


  );
}
SearchAddress.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    navigate: PropTypes.func,
  }),
};

SearchAddress.defaultProps = {
  navigation: {},
};
