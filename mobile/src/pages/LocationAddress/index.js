import React from 'react';

import PropTypes from 'prop-types';
import {
  Container, TitleContent, MainSafeAreaView, MainScrollViewVertical,
} from './styles';
import HeaderBackImage from '~/assets/mapa.png';

import Header from '~/components/HeaderView';
import Location from '~/components/Location';


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
            Onde entregamos seu pedido?
          </TitleContent>
        </Container>
      </MainSafeAreaView>
    </>
  );
}

LocationAddress.propTypes = {
  navigation: PropTypes.shape({}),
};

LocationAddress.defaultProps = {
  navigation: {},
};
