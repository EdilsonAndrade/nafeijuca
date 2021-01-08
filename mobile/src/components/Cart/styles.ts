import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CartProps {
  show:boolean;
}
export const CartContainer = styled.View<CartProps>`
display: ${(props) => (props.show ? 'flex' : 'none')};

`;
export const CartContent = styled(Icon)`
font-size:32px;
color:${(props) => (props.color ? props.color : '#ffc700')};


`;
export const CartTotalItemsContainer = styled.View`
  background:#333;
  height:15px;
  width:15px;
  border-radius:50px;
  justify-content:center;
  align-items:center;
  position:relative;
  left:20px;
  top:-35px;
`;
export const CartTotalItems = styled.Text`
font-size: 12px;
color:#fff; 
font-weight:bold;
`;
