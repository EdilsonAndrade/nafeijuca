import React from 'react';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import {
  CartContainer, CartContent, CartTotalItemsContainer, CartTotalItems,
} from './styles';
import { useNavigation } from '@react-navigation/native';
interface CartProps{
  color:string;
}
const Cart:React.FC<CartProps> = ({ color }) => {
  const cart = useSelector((state) => state.cart);
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Order')}>
      <CartContainer show={cart.totalItems > 0}>
        <CartContent name="local-grocery-store" color={color} />
        <CartTotalItemsContainer>
          <CartTotalItems>{cart.totalItems}</CartTotalItems>
        </CartTotalItemsContainer>
      </CartContainer>
    </TouchableOpacity>
  );
};

export default Cart;
