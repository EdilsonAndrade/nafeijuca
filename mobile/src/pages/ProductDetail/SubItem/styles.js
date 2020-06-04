import styled from 'styled-components/native';
import CheckBox from '@react-native-community/checkbox';

export const SubItemHeaderContainer = styled.View`
  flex-direction:row;
  justify-content:space-between;
  background:#ddd;
  padding:10px;
  margin-top:10px;
`;
export const InfoTitleView = styled.View`
 
`;
export const TitleText = styled.Text`
font-weight:700;
font-size:15px;
`;
export const QuantityText = styled.Text`
font-size:14px;
color:#6969;
`;
export const MandatoryView = styled.View`
align-items:baseline;
justify-content:center;
`;
export const MandatoryText = styled.Text`
font-weight:bold;
`;

export const ItemView = styled.View`
justify-content:space-between;
`;

export const ItemsContainer = styled.View`
  flex-direction:row;
  justify-content:space-between;
  padding:10px;
  border-bottom-width: 1px;
  border-color:#ddd;
`;

export const CheckBoxItem = styled(CheckBox)`
color: #ffc700;
opacity: ${(props) => (props.disabled ? '0.2' : '1')}
`;
