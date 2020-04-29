import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableHighlight } from 'react-native';

export const MarkerView = styled.View`
  
`;

export const MarkerIcon = styled(Icon)`
color:red;

`;
export const MarkerContainer = styled.View`
display:flex;
justify-content:center;
align-items:center;

`;

export const MakertTextsContainer = styled.View`
display:flex;
justify-content:center;
align-items:center;
background:#fff;
border-radius:6px;
padding:5px;


`;
export const MarkerTitle = styled.Text`
font-size:16px;
font-weight:bold;
`;
export const MarkerText = styled.Text`
font-size:14px;
`;
export const ConfirmContainer = styled.View`
position:absolute;
display:flex;
align-items:center;
justify-content:center;
width:90%;
top:80%;
left:7%;

`;
export const ConfirmButton = styled(TouchableHighlight)`
  background-color:#ffc700;
  align-self: stretch;
  width:100%;
  padding:15px;
  align-items:center;
  border-radius:6px;
  
`;
export const ConfirmText = styled.Text`
font-weight:bold;
color:#fff;
font-size:18px;
`;
