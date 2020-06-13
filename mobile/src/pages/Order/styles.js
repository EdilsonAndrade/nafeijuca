import styled from 'styled-components/native';
import { TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const MainContainer = styled.SafeAreaView`
background: #fff;
flex:1;

`;
export const Container = styled.View`
  padding:10px;
  background: #fff;
  margin:10px;
  border-radius:10px;
  
`;

export const TitleText = styled.Text`
font-weight:bold;
font-size:26px;
`;

export const OrderContainer = styled.View`
margin:30px 15px;
background: #7159c1;
border-radius:10px;
padding:20px;
`;
export const AddressAndTimeArea = styled.View`

`;
export const AddressAndEditionArea = styled.View`
flex-direction:row;
justify-content:space-between;
margin-bottom:20px;
`;
export const AddressText = styled.Text`
color: #eee;

`;
export const EditionButton = styled(TouchableOpacity)``;
export const EditionText = styled.Text`
color: #ffc700;
`;
export const TimeArea = styled.View`
flex-direction:row;
justify-content:space-between;
align-items:center;
`;

export const IconEstimateTimeContent = styled.View`
flex-direction: row;
justify-content:center;
align-items:center;
`;

export const IconContent = styled(Icon)`
color: #ffc700;
background: rgba(131, 116, 181, 1);
padding:5px;
border-radius:10px;
`;

export const EstimatedTimeText = styled.Text`
color: #fff;
margin-left:10px;
`;
export const ToBeDeliveryAreaText = styled.Text`
color: #fff;
`;
export const ListContainer = styled.View`
margin:0 35px;
border-radius:8px;
padding:0 2px;
height:275px;

`;
export const ProductsList = styled(FlatList)`
padding:5px;
`;

export const ItemMainView = styled.View`
flex-direction:row;
justify-content:space-between;
align-items:center;
margin:10px 0;

`;

export const BrokenImage = styled(Icon)`
font-size:35px;
justify-content:center;
text-align:center;
color: #666;
background:#eee;
width:50px;
height:40px;
border-radius:8px;

`;
export const ImageContent = styled.Image`
width:50px;
height:40px;
border-radius:8px;
`;


export const QuantityContent = styled.Text`
color:#444;
font-size:14px;
text-align:center;
width:48px;

`;

export const ProductDescription = styled.Text.attrs({
  numberOfLines: 2,
})`

color:#444;
font-size:14px;
padding: 0 15px 0 0 ;

width:130px;


`;

export const Subtotal = styled.Text`
color:#666;
font-size:12px;
`;
export const DeliveryMainView = styled.View`
flex-direction:row;
justify-content:space-between;
align-items:center;
margin:10px 0;
padding:0 0 0 15px;

`;
export const DeliveryText = styled.Text`
color:#444;
font-size:14px;
text-align:left;
width:150px;

`;
export const DeliverySubTotal = styled.Text`
color:#666;
font-size:12px;
padding: 0 5px 0 0;
`;

export const TotalAreaView = styled.View`
margin-top:20px;
flex-direction:row;
justify-content:space-between;
border-bottom-width: 1px;
border-color: #eee;
padding:20px 0 10px 10px;
`;

export const TotalTextLabel = styled.Text`
font-size:18px;
`;

export const TotalText = styled.Text`
font-weight: bold;
font-size:22px;
`;
export const CheckoutArea = styled.View`
flex-direction:row;
`;


export const ViewBottomButtons = styled.View`
justify-content:flex-end;
flex:1;
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
