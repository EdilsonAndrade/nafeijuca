import React from 'react';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container, TitleContent, MainSafeAreaView, MainScrollViewVertical, ContainerInputAddress, InputAddress, FlatListAddresses,
} from './styles';
import HeaderBackImage from '~/assets/mapa.png';
import Header from '~/components/HeaderView';


export default function LocationAddress({ navigation }) {
  return (
    <>
      <Header
        showBack
        headerBackImage={HeaderBackImage}
        navigation={navigation}
        backButtonColor="rgba(235, 107, 107, 1)"
        headerSize="120px"
        imageSize="180px"
      />
      <MainSafeAreaView>


        <MainScrollViewVertical
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
        />
        <Container>
          <TitleContent>
            Onde deseja que entregamos seu pedido?
          </TitleContent>
          <ContainerInputAddress>
            <Icon name="search" size={32} color="#EB6B6B" />
            <InputAddress placeholder="Endereço e número" onFocus={() => navigation.navigate('SearchAddress')} />
          </ContainerInputAddress>
        </Container>

      </MainSafeAreaView>
    </>
  );
}

LocationAddress.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

LocationAddress.defaultProps = {
  navigation: {},
};
