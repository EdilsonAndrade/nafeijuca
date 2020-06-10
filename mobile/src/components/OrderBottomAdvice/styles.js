import styled from 'styled-components/native';
import { TouchableOpacity, Animated } from 'react-native';

export const AnimatedContainer = styled(Animated.View)`
  position:absolute;
  background:#ffc700;
  width:100%;
  border-radius:6px;
   
`;

export const TouchableButtom = styled(TouchableOpacity)`
flex-direction:row;
justify-content:space-around;
align-items:center;
height:60px;
`;

export const CloseOrderContent = styled.Text`
font-weight:bold;
color: #fff;
font-size:16px;
`;
export const TotalPriceContent = styled.Text`
font-weight:bold;
color: #fff;
font-size:16px;
`;
