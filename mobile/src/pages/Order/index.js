import React from 'react';
import { useSelector } from 'react-redux';
import { BACKENDIP } from 'react-native-dotenv';
import currencyformatter from 'currency-formatter';

import {
  MainContainer, Container, TitleText,
  OrderContainer,
  AddressAndTimeArea,
  AddressAndEditionArea,
  AddressText,
  EditionButton,
  EditionText,
  TimeArea,
  IconEstimateTimeContent,
  IconContent,
  EstimatedTimeText,
  ToBeDeliveryAreaText,
  ListContainer,
  ProductsList,
  ItemMainView,
  BrokenImage,
  ImageContent,
  QuantityAndProductDescriptionView,
  QuantityContent,
  ProductDescription,
  Subtotal,


} from './styles';
import HeaderTranslucent from '~/components/HeaderTranslucent';

import HeaderBackImage from '~/assets/capa.png';


const Order = () => {
  const cart = useSelector((state) => state.cart);


  function renderItem() {
    const oneCart = cart;
    return (
      <ItemMainView>
        {oneCart.products[0].file ? <ImageContent source={{ uri: oneCart.products[0].product.File.url.replace('localhost', BACKENDIP) }} /> : <BrokenImage name="broken-image" />}

        <QuantityContent>
          {oneCart.products[0].quantity}
          {' '}
          x
        </QuantityContent>
        <ProductDescription>
          {oneCart.products[0].name}
        </ProductDescription>
        <Subtotal>

          {currencyformatter.format(oneCart.totalPrice, { code: 'BRL' })}
        </Subtotal>

      </ItemMainView>
    );
  }

  return (
    <MainContainer>
      <HeaderTranslucent
        showBack
        showShare
        opacity=".6"
        text="CESTA DE PRODUTOS"
        backButtonColor="#ffc700"
      />

      <Container>
        <TitleText>Meu Pedido</TitleText>
        <OrderContainer>
          <AddressAndTimeArea>
            <AddressAndEditionArea>
              <AddressText>
                Rua dos Buritis, 747
              </AddressText>
              <EditionButton>
                <EditionText>
                  Editar
                </EditionText>
              </EditionButton>
            </AddressAndEditionArea>
            <TimeArea>
              <IconEstimateTimeContent>
                <IconContent name="alarm" size={32} />
                <EstimatedTimeText>35 min</EstimatedTimeText>
              </IconEstimateTimeContent>

              <ToBeDeliveryAreaText>Entrega</ToBeDeliveryAreaText>
            </TimeArea>
          </AddressAndTimeArea>
        </OrderContainer>
      </Container>
      <ListContainer>
        {renderItem()}
      </ListContainer>
    </MainContainer>

  );
};

export default Order;
