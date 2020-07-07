import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity, Image, Animated } from 'react-native';
import { BACKENDIP } from 'react-native-dotenv';
import currencyformatter from 'currency-formatter';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
  SubItemView,
  SubItemRowView,
  SubItemQuantityContent,
  SubItemDescription,
  SubItemSubtotal,
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
import { addRequestFromOrder, removeSuccessFromOrder, removeFromCartSuccess } from '~/store/modules/cart/action';

const Order = ({ navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [countProducts, setCountProducts] = useState(1);
  const scrollOffset = new Animated.Value(0);

  function handleDeleteProduct(productId) {
    dispatch(removeFromCartSuccess(productId));
    if (cart.products.length === 1) {
      setCountProducts(1);
      navigation.goBack();
    }
  }

  function renderSubItem(product) {
    return product.subItems.map((subItem) => (
      <SubItemRowView key={subItem.id}>
        <SubItemQuantityContent>
          +
          {product.quantity}
          x
        </SubItemQuantityContent>
        <SubItemDescription>
          {subItem.name}
        </SubItemDescription>
        <SubItemSubtotal>
          {currencyformatter.format(subItem.price, { code: 'BRL' })}
        </SubItemSubtotal>
      </SubItemRowView>

    ));
  }
  function renderItem(product) {
    const item = (
      <>
        <ItemMainView key={product.id} hasSubItem={product.subItems.length > 0}>
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
          <TouchableOpacity onPress={() => handleDeleteProduct(product.id)}>
            <Icon name="delete" color="#f45" size={22} />
          </TouchableOpacity>
        </ItemMainView>
        <SubItemView>
          {renderSubItem(product)}
        </SubItemView>
      </>
    );


    return item;
  }
  const handleAddMoreItem = () => {
    setCountProducts(countProducts + 1);
    dispatch(addRequestFromOrder(cart.products));
  };

  const handleRemoveItem = () => {
    setCountProducts(countProducts - 1);
    dispatch(removeSuccessFromOrder());
  };

  return (
    <MainContainer>
      <HeaderTranslucent
        cartColor="#ffc700"
        showBack
        showShare
        opacity=".6"
        text="CESTA DE PRODUTOS"
        backButtonColor="#ffc700"
      />

      <Container
        style={{

          top: scrollOffset.interpolate({
            inputRange: [20, 350],
            outputRange: [0, -100],
            extrapolate: 'clamp',
          }),

        }}
      >
        <TitleText
          style={{
            fontSize: scrollOffset.interpolate({
              inputRange: [0, 48],
              outputRange: [24, 0],
              extrapolate: 'clamp',
            }),
          }}
        >
          Meu Pedido

        </TitleText>
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
        <TouchableOpacity>
          <ButtonAdd>
            <ButtonAddText>
              Fazer pedido
            </ButtonAddText>

          </ButtonAdd>
        </TouchableOpacity>
      </ViewBottomButtons>
    </MainContainer>

  );
};

export default Order;
