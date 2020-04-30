import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Button = styled(TouchableOpacity)`
  display:flex;
  flex-direction:row;
  align-items:center;
  
  width:94%;

`;


export const AddressText = styled.Text`
  margin-left:5px;
  font-size:18px;
  color:#000;
  font-weight:700;
  margin-top:10px;

`;

export const CityAndInfosContainer = styled.View`
`;
export const CityAndInfosText = styled.Text`
`;
export const ActivityIndicatorView = styled.View`
padding:10px;
display:flex;
justify-content:center;
align-items:center;
width:100%;
`;
export const ActivityIndicatorText = styled.Text`

`;
