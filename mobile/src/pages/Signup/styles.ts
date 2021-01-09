import { stripUnit } from 'polished';
import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex:1;
  background: #ffc700;
  justify-content:flex-start;
  align-items:center;
`;

export const Logo = styled.Image`
max-width:250px;
min-height:120px;
flex:1;
`;
export const Title= styled.Text`
font-weight:bold;
font-size:20px;
color:#fff;
`;

export const FieldsContainer =styled.View`
padding: 10px 20px;
align-self:stretch;
margin:20px 5px;
background:rgba(71, 70, 66, .3);
border-radius:8px;


`;
export const FieldsTitle= styled.Text`
font-weight:bold;
font-size:14px;
color:#eee;
margin:5px 0;
`

export const FieldContent = styled.View`
  padding:4px;
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  align-items:center;
  background:#eee;
  border-radius:6px;
`

export const InputField = styled.TextInput`
background:#eee;
padding: 5px;
flex:1;

`;