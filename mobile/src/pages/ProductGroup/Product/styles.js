import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const MainViewContainer = styled.View`
  padding:5px 0 38px;
  margin-bottom:5px;
`;

export const SeeDetailButton = styled(TouchableOpacity)``;
export const ProductViewContainer = styled.View`
display:flex;
flex-direction:row;
justify-content:space-between;
width:100%;
opacity:${(props) => (props.active ? 1 : 0.2)};


`;
export const ProductTitleText = styled.Text`
font-size:17px;
font-weight:700;
color:#696969;
`;
export const ProductDetailText = styled.Text`
font-size:16px;
`;
export const TitleAndPriceContainer = styled.View`
width:70%;
`;

export const PriceContainer = styled.View`
display:flex;
flex-direction:row;
align-items:center;

`;
export const PriceText = styled.Text`
color:#ffc700;
font-size:18px;
font-weight:bold;
width:70%;

`;
export const PromotionPrice = styled.Text`
margin-left:10px;
text-decoration:line-through;
font-size:15px;
color:#696969;
`;

export const ImageProduct = styled.Image`
width:80px;
height:80px;
border-radius:8px;
`;

export const DeactiveView = styled.View`
display:flex;
justify-content:center;
`;
export const DeactiveText = styled.Text`
font-size:18px;
color:#F02D2D;
`;
