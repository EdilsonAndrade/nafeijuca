import React from 'react';
import { useSelector } from 'react-redux';
import {
  CartContainer, CartContent, CartTotalItemsContainer, CartTotalItems,
} from './styles';

const Cart = ({ color }) => {
  const cart = useSelector((state) => state.cart);

  return (
    <CartContainer show={cart.totalItems > 0}>
      <CartContent name="local-grocery-store" color={color} />
      <CartTotalItemsContainer>
        <CartTotalItems>{cart.totalItems}</CartTotalItems>
      </CartTotalItemsContainer>
    </CartContainer>
  );
};

export default Cart;
