import styled from 'styled-components/native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
flex:1;
`;

export const MainViewContainer = styled.ScrollView`
  height:5%;
`;

export const ProductViewContainer = styled.View`
flex:1;
width:100%;
justify-content:center;
align-items:center;


`;
export const TitleAndPriceContainer = styled.View`
padding:10px;
justify-content:center;

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

export const ViewBottomButtons = styled.View`

`;
export const ViewMainBottom = styled.View`
flex-direction:row;
justify-content:space-between;
width:100%;
padding:10px;
`;

export const ViewButtonsPlusMinus = styled.View`
flex-direction:row;
justify-content:space-between;
width:25%;
align-items:center;

`;
export const TotalText = styled.Text``;

export const ButtonAdd = styled.View`
margin-left:25px;
width:75%;
height:50px;
border-radius:6px;
display:flex;
flex-direction:row;
align-items:center;
justify-content:space-around;
background: #ffc700;
padding:5px;
`;
export const ButtonAddText = styled.Text`
color: #fff;
font-size:18px;

`;

export const Plus = styled(Icon)`
font-size:25px;
color:#ffc700;
`;
export const Minus = styled(Icon)`
font-size:25px;
color:${(props) => (props.count && props.count === 1 ? '#ddd' : '#ffc700')};
`;
