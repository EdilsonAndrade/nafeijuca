import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';


export const ScrollViewContainer = styled.ScrollView`
    margin:0 10px;
    border-radius:6px;
    text-align:center;
    ;

`;

export const StoreButton = styled(TouchableOpacity)`
margin: 3px 10px;
border:1px solid #eee;
`;

export const StoreContainer = styled.View`
  padding:10px;
  margin: 0 3px;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  background: rgba(238, 238, 238, .2);
  border-radius:8px;
  border: 1px solid #eee;
  
`;
export const StoreColumnContainer = styled.View`
display:flex;
`;

export const StoreName = styled.Text`
font-size:22px;
font-weight:bold;
color:#000;
`;
export const StoreNeighborhood = styled.Text.attrs({
  numberOfLines: 3,
})`
font-size:18px;
color:#000;
width:250px;
font-weight:bold;

`;
export const StoreKm = styled.Text`
color:rgba(235, 107, 107, 1);
font-weight:bold;
`;


export const StoreSwitch = styled.Switch``;
