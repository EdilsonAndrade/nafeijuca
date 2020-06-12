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


  function renderItem(product) {
    return (
      <ItemMainView key={product.id}>
        {product.file ? <ImageContent source={{ uri: product.file.url.replace('localhost', BACKENDIP) }} /> : <BrokenImage name="broken-image" />}

        <QuantityContent>
          {product.quantity}
          {' '}
          x
        </QuantityContent>
        <ProductDescription>
          {product.name}
        </ProductDescription>
        <Subtotal>

          {currencyformatter.format(product.subTotal, { code: 'BRL' })}
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
        <ProductsList
          data={cart.products}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => String(item.id)}
        />

      </ListContainer>
    </MainContainer>

  );
};

export default Order;
