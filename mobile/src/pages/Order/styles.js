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

export const QuantityAndProductDescriptionView = styled.View`
flex-direction:row;
align-items:flex-start;
text-align:left;
justify-content:space-between;


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
