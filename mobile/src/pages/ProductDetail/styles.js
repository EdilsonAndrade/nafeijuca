import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const MainViewContainer = styled.ScrollView`
  flex:1;
  padding:10px;
`;

export const ProductViewContainer = styled.View`
width:100%;
justify-content:center;
align-items:center;


`;
export const ImageProduct = styled.Image`
width:100%;
height:180PX;
align-self:stretch;
border-radius:8px;
margin-bottom:10px;
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
