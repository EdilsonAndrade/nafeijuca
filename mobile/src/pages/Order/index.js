import React from 'react';

import { Container, TitleText } from './styles';
import HeaderTranslucent from '~/components/HeaderTranslucent';

import HeaderBackImage from '~/assets/capa.png';


const Order = () => (
  <>
    <HeaderTranslucent
      showBack
      showShare={false}
      headerBackImage={HeaderBackImage}
      opacity=".6"
      text="CESTA DE PRODUTOS"
    />

    <Container>
      <TitleText>Aqui ficarão os pedidos</TitleText>
    </Container>
  </>

);

export default Order;
