import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity, Image, Animated } from 'react-native';
import { BACKENDIP } from 'react-native-dotenv';
import currencyformatter from 'currency-formatter';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DeliveryMoto from '~/assets/deliverymotorcycle.png';
import api from '~/services/api';
import NotLogged from '../../components/NotLogged';
import Button from '../../components/Button';
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
  ButtonAdd,
  ButtonAddText,
  NotLoggedContainer

} from './styles';
import HeaderTranslucent from '~/components/HeaderTranslucent';
import { removeFromCartSuccess } from '~/store/modules/cart/action';

const Order = ({ navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const store = useSelector((state) => state.store);
const [loading,setLoading] = useState(false);
  const scrollOffset = new Animated.Value(0);

  const handleSendOrder = useCallback(async () => {
    try {
      const productIds: number[] = [];

      cart.products.forEach((product) => {
        productIds.push(product.id);
      });
      const order = {
        userId: user.id,
        storeId: store.id,
        productIds,
        token: user.token
      };
      setLoading(true);
        console.log('vou chamar')
      if (user.id) {
        console.log('vou chamar')
        await api.post('/orders', order);
        
      }
      setLoading(false);
    } catch (err) {
      const { error } = err.response.data;
      if (error && error.includes('User not authorized')) {
        navigation.navigate('Login', {
          expired: true
        })
      } else {
        console.log(err);
      }

      setLoading(false);
    }



  }, []);

  const handleDeleteProduct = useCallback((productKey) => {
    dispatch(removeFromCartSuccess(productKey));
    if (cart.products.length === 1) {
      navigation.goBack();
    }
  }, []);

  const handleEditAddress = useCallback(() => {
    if (user.address === null) {
      navigation.navigate('SearchAddress');
    } else {
      navigation.navigate('AddressConfirmation', {
        page: 'Order',
      });
    }

  }, []);
  const renderSubItem = useCallback((product) => product.subItems.map((subItem) => (
    <SubItemRowView key={subItem.id * +product.key}>
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

  )), []);

  function renderItem(product) {
    const item = (
      <>
        <ItemMainView key={Math.random(product.key, 1000)} hasSubItem={product.subItems.length > 0}>
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
          <TouchableOpacity onPress={() => handleDeleteProduct(product.key)}>
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
              {user.address !== null ?
                <AddressText>
                  {`${user.address.street}, ${user.address.number}  - ${user.address.addressLineTwo || ''} `}
                  <AddressText>
                    {user.address.neighborhood || ''}

                    {' '}
                    {user.address.city || ''}
                  </AddressText>
                  <AddressText />
                  <AddressText>
                    {` ref: ${user.address.referency || ''} `}
                  </AddressText>
                </AddressText>

                : <AddressText>Endereço ainda não informado</AddressText>}



              <EditionButton onPress={handleEditAddress}>
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

      <ListContainer userSigned={user.id === null}>

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
          keyExtractor={(item) => String(item.key)}
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
      {!user.id ?
        <NotLoggedContainer>
          <NotLogged />
        </NotLoggedContainer>
        :
        null
      }
      {!user.id ?
        null
        :
        <ViewBottomButtons>

          <Button
            action={user.address !== null ? handleSendOrder : handleEditAddress}
            text={user.address !== null ? 'Fazer pedido' : 'Completar Endereço'}
            loading={loading}

          />
         

        </ViewBottomButtons>
      }
    </MainContainer>

  );
};

export default Order;
