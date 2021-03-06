import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Animated, StyleSheet } from 'react-native';
import currencyformatter from 'currency-formatter';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';


import {
  AnimatedContainer, TouchableButtom, CloseOrderContent, TotalPriceContent,
} from './styles';
import Cart from '~/components/Cart';

const styles = StyleSheet.create({

  container: {
    position: 'absolute',
    backgroundColor: '#ffc700',

  },

});
interface OrderBottomAdvice{
  bottomPosition:number;
}
const OrderBottomAdvice:React.FC<OrderBottomAdvice> = ({ bottomPosition }) => {
  const cart = useSelector((state) => state.cart);
  const positionY = new Animated.Value(-115);
const navigation = useNavigation();
  useEffect(() => {
    if (cart.totalItems > 0) {
      Animated.spring(positionY, {
        toValue: bottomPosition,
        useNativeDriver: false,
        bounciness: 5,
        speed: 1,

      }).start();
    } else {
      Animated.spring(positionY, {
        toValue: -110,
        useNativeDriver: false,
        bounciness: 5,
        speed: 1,

      }).start();
    }
  }, [cart]);


  return (

    <AnimatedContainer
      style={[styles.container, { bottom: positionY }]}
    >
      <TouchableButtom onPress={() => navigation.navigate('Order')}>
        <Cart color="#fff" />
        <CloseOrderContent>Fechar Pedido</CloseOrderContent>
        {cart.totalPrice > 0
          ? <TotalPriceContent>{currencyformatter.format(cart.totalPrice, { code: 'BRL' })}</TotalPriceContent>
          : null}

      </TouchableButtom>
    </AnimatedContainer>

  );
};
OrderBottomAdvice.propTypes = {
  bottomPosition: PropTypes.number.isRequired,
};
export default OrderBottomAdvice;
