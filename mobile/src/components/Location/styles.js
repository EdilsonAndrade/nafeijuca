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
  font-size:14px;
  color:#000;
  font-weight:700;
`;
