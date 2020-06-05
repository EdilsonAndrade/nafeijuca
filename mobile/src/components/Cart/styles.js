import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const CartContainer = styled.View`
display: ${(props) => (props.show ? 'flex' : 'none')};
flex-direction:row;

`;
export const CartContent = styled(Icon)`
font-size:32px;
color: ${(props) => (props.color ? props.color : '#f40')};

`;
export const CartTotalItemsContainer = styled.View`
  background:#ffc700;
  height:15px;
  width:15px;
  border-radius:50px;
  justify-content:center;
  align-items:center;
  position:relative;
  left:-10px;
  top:-5px;
`;
export const CartTotalItems = styled.Text`
font-size: 12px;
color:#fff; 
font-weight:bold;
`;
