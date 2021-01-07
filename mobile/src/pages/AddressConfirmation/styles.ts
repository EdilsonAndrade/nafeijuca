import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';

export const AreaContainer = styled.SafeAreaView`
flex:1;
display:flex;
background: #fff;
padding:20px;
`;

export const AddressTitle = styled.Text`
font-size:18px;
font-weight:bold;
color:#000;
`;
export const AddressInfo = styled.Text`
font-size:15px;
`;
export const ContainerNumberNeiborhood = styled.View`
margin-top:10px;
display:flex;
flex-direction:row;
align-items:flex-start;
`;
export const NumberInputText = styled.TextInput.attrs({
  placeholderTextColor: '#A9A9A9',
})`
border-bottom-width:1px;
border-bottom-color:#ffc700;
width:120px;
font-size:18px;
font-weight:bold;

`;
export const AddressLineTwoContainer = styled.View`
display:flex;
margin-left:10px;

`;
export const AddressLineTwoInputText = styled.TextInput.attrs({
  placeholderTextColor: '#A9A9A9',
})`
border-bottom-width:1px;
border-bottom-color:#ffc700;
width:100%;
margin-left:10px;
font-size:18px;
font-weight:bold;

`;
export const ReferenceInputText = styled.TextInput.attrs({
  placeholderTextColor: '#A9A9A9',
})`

border-bottom-width:1px;
border-bottom-color:#ffc700;
width:100%;
margin-top:20px;
font-size:18px;
font-weight:bold;
`;
export const FavorityLabel = styled.Text`
margin-top:80px;
font-size:18px;
color:#000;
`;
export const FavorityButtonsContainer = styled.View`
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;
`;
export const FavoriteButton = styled(TouchableOpacity)`
padding:20px;
border-width:2px;
border-color:#A9A9A9;
width:150px;
display:flex;
flex-direction:row;
align-items:center;
justify-content:center;
border-radius:8px;
background:${(props) => (props.active ? '#eee' : 'transparent')} ;


`;
export const ButtonText = styled.Text`
font-size:18px;
font-weight:bold;
color:#A9A9A9;

`;
export const SaveButton = styled(RectButton)`
background:#ffc700;
margin-top:40px;
padding:20px;
border-radius:6px;
display:flex;
align-items:center;
`;
export const SaveButtonText = styled.Text`
font-size:18px;
font-weight:bold;
color:#fff;
`;
