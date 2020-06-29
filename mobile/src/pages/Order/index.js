import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TouchableOpacity, Image, Animated } from 'react-native';
import { BACKENDIP } from 'react-native-dotenv';
import currencyformatter from 'currency-formatter';
import DeliveryMoto from '~/assets/deliverymotorcycle.png';
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
  QuantityContent,
  ProductDescription,
  Subtotal,
  DeliveryMainView,
  DeliveryText,
  DeliverySubTotal,
  TotalAreaView,
  TotalTextLabel,
  TotalText,
  ViewBottomButtons,
  ViewMainBottom,
  ViewButtonsPlusMinus,
  ButtonAdd,
  ButtonAddText,
  Plus,
  Minus,

} from './styles';
import HeaderTranslucent from '~/components/HeaderTranslucent';

import HeaderBackImage from '~/assets/capa.png';


const Order = () => {
  const cart = useSelector((state) => state.cart);
  const [countProducts, setCountProducts] = useState(0);
  const scrollOffset = new Animated.Value(0);
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
  const handleAddMoreItem = () => {
    const count = countProducts + 1;
    setCountProducts(count);
    // setTotalPrice((count * product.promotionPrice || product.price) + (count * totalSubItem));
  };

  const handleRemoveItem = () => {
    if (countProducts > 1) {
      const count = countProducts - 1;
      setCountProducts(count);
      // setTotalPrice((count * product.promotionPrice || product.price) + (count * totalSubItem));
    }
  };
  return (
    <MainContainer>
      <HeaderTranslucent

        showBack
        showShare
        opacity=".6"
        text="CESTA DE PRODUTOS"
        backButtonColor="#ffc700"
      />

      <Container
        style={{
          height: scrollOffset.interpolate({
            inputRange: [0, 190],
            outputRange: [190, 0],
            extrapolate: 'clamp',
          }),
          top: scrollOffset.interpolate({
            inputRange: [0, 190],
            outputRange: [0, -200],
            extrapolate: 'clamp',
          }),
        }}
      >
        <TitleText
          style={{
            fontSize: scrollOffset.interpolate({
              inputRange: [30, 35],
              outputRange: [26, 1],
              extrapolate: 'clamp',
            }),

          }}
        >
          Meu Pedido

        </TitleText>
        <OrderContainer
          style={{
            height: scrollOffset.interpolate({
              inputRange: [20, 190],
              outputRange: [130, 1],
              extrapolate: 'clamp',
            }),


          }}
        >
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
          decelerationRate="fast"
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: { y: scrollOffset },
              },
            },
          ], {
            useNativeDriver: false,
          })}
          data={cart.products}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => String(item.id)}
        />

        <DeliveryMainView>
          <Image source={DeliveryMoto} style={{ width: 32 }} />

          <DeliveryText>
            Entrega
          </DeliveryText>
          <DeliverySubTotal>
            {currencyformatter.format(0, { code: 'BRL' })}
          </DeliverySubTotal>

        </DeliveryMainView>
        <TotalAreaView>
          <TotalTextLabel>
            Total:
          </TotalTextLabel>
          <TotalText>
            {
              currencyformatter.format(cart.totalPrice, { code: 'BRL' })
            }
          </TotalText>
        </TotalAreaView>
      </ListContainer>
      <ViewBottomButtons>

        <ViewMainBottom>

          <ViewButtonsPlusMinus>
            <TouchableOpacity onPress={handleRemoveItem}>
              <Minus name="remove" count={countProducts} />
            </TouchableOpacity>
            <TotalText>{countProducts}</TotalText>
            <TouchableOpacity onPress={handleAddMoreItem}>
              <Plus name="add" />
            </TouchableOpacity>
          </ViewButtonsPlusMinus>
          <TouchableOpacity>
            <ButtonAdd>
              <ButtonAddText>
                Fazer pedido
              </ButtonAddText>

            </ButtonAdd>
          </TouchableOpacity>
        </ViewMainBottom>

      </ViewBottomButtons>
    </MainContainer>

  );
};

export default Order;
