import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import HeaderView from '~/components/HeaderView';
import HeaderBackImage from '~/assets/mapa.png';
import {
  AreaContainer,
  AddressTitle,
  AddressInfo,
  ContainerNumberNeiborhood,
  NumberInputText,
  AddressLineTwoInputText,
  AddressLineTwoContainer,
  ReferenceInputText,
  FavorityLabel,
  FavorityButtonsContainer,
  FavoriteButton,
  ButtonText,
  SaveButton,
  SaveButtonText,
} from './styles';
import * as UserActions from '~/store/modules/user/actions';

export default function AddressConfirmation({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [addressNumber, setAddressNumber] = useState(user.address.number);
  const [addressLineTwo, setAddressLineTwo] = useState(user.address.addressLineTwo);
  const [favorite, setFavorite] = useState(user.address.favorite);
  const [referency, setReferency] = useState(user.address.referency);
  const handleSaveAddress = async () => {
    dispatch(UserActions.setLocationSuccess({
      ...user,
      address: {
        ...user.address,
        number: addressNumber,
        name: favorite,
        addressLineTwo,
        referency,
      },
    }));
    const myLocation = {
      ...user,
      address: {
        ...user.address,
        number: addressNumber,
        name: favorite,
        addressLineTwo,
        referency,
      },
    };
    await AsyncStorage.setItem('myAddress', JSON.stringify(myLocation));

    navigation.navigate('Dashboard');
  };
  return (
    <>
      <HeaderView
        showBack
        headerBackImage={HeaderBackImage}
        navigation={navigation}
        backButtonColor="rgba(235, 107, 107, 1)"
        headerSize="100px"
        imageSize="160px"
      />
      <AreaContainer>
        <AddressTitle>
          {user.address.street}
          {user.address.number >= 0 ? ', ' : ''}
          {user.address.number}
        </AddressTitle>
        <AddressInfo>
          {user.address.neighborhood}
          {', '}
          {user.address.city}
          {' - '}
          {user.address.state}
          {' '}
        </AddressInfo>
        <ContainerNumberNeiborhood>
          <NumberInputText placeholder="Número" value={addressNumber} onChangeText={setAddressNumber} />
          <AddressLineTwoContainer>
            <AddressLineTwoInputText placeholder="Complemento" value={addressLineTwo} onChangeText={setAddressLineTwo} />
            <AddressInfo>Apto / Bloco / Casa </AddressInfo>
          </AddressLineTwoContainer>

        </ContainerNumberNeiborhood>
        <ReferenceInputText placeholder="Ponto de referência" value={referency} onChangeText={setReferency} />
        <FavorityLabel>Favoritar como</FavorityLabel>
        <FavorityButtonsContainer>
          <FavoriteButton active={favorite === 'HOME'} onPress={() => setFavorite('HOME')}>
            <Icon style={{ marginRight: 10 }} name="home" size={32} color="#A9A9A9" />
            <ButtonText>Casa</ButtonText>

          </FavoriteButton>
          <FavoriteButton active={favorite === 'WORK'} onPress={() => setFavorite('WORK')}>
            <Icon style={{ marginRight: 10 }} name="free-breakfast" size={32} color="#A9A9A9" />
            <ButtonText>Trabalho</ButtonText>

          </FavoriteButton>
        </FavorityButtonsContainer>
        <SaveButton onPress={handleSaveAddress}>
          <SaveButtonText>Salvar endereço</SaveButtonText>
        </SaveButton>
      </AreaContainer>
    </>
  );
}

AddressConfirmation.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    navigation: PropTypes.func,
  }),
};
AddressConfirmation.defaultProps = {
  navigation: {},
};
