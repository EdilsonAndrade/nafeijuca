import styled from 'styled-components/native';
import { TouchableOpacity, FlatList, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const MainContainer = styled.SafeAreaView`
background: #ddd;
flex:1;
position:relative;



`;
export const Container = styled(Animated.View)`
  margin:10px;
  border-radius:10px;
  
`;

export const TitleText = styled(Animated.Text)`
font-weight:bold;
font-size:26px;
`;

export const OrderContainer = styled(Animated.View)`
margin:10px 15px 0;
background: #7159c1;
border-radius:10px;
padding:5px 10px 0;

`;
export const AddressAndTimeArea = styled(Animated.View)`
  margin:5px 0;
`;
export const AddressAndEditionArea = styled.View`
flex-direction:row;
justify-content:space-between;
margin-bottom:20px;
`;
export const AddressText = styled.Text`
color: #eee;
flex:1;

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
interface ListContainerProps{
  userSigned:boolean;
}
export const ListContainer = styled(Animated.View)`
margin:0 15px;
border-radius:8px;
padding:0 2px;
max-height:${props=>props.userSigned ? '355px' : '300px' };

`;


export const ProductsList = styled(Animated.FlatList)`

`;

export const ItemMainView = styled.View`
flex-direction:row;
justify-content:space-between;
align-items:center;
border-bottom-width:${(props) => (props.hasSubItem ? '0px' : '1px')}
border-bottom-color:${(props) => (props.hasSubItem ? '#eee' : 'transparent')};

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

width:150px;


`;

export const Subtotal = styled.Text`
color:#666;
font-size:12px;
`;
export const SubItemView = styled.View`
border-bottom-width:2px;
border-bottom-color:#eee;
margin:0 0 12px;
text-align:right;
`;
export const SubItemRowView = styled.View`
flex-direction:row;
margin:1px 0 0 10px;
width:88%;

`;
export const SubItemQuantityContent = styled.Text`
color:#444;
font-size:14px;
text-align:center;
width:30%;
text-align:right;
padding-right:1px;

`;
export const SubItemDescription = styled.Text.attrs({

})`

color:#444;
font-size:12px;
padding: 0 0 0 10px;
text-align:left;
width:57%;

`;
export const SubItemSubtotal = styled.Text`
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

export const NotLoggedContainer = styled.View`
  position:absolute;
  bottom:2px;
`