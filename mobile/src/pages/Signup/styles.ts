import styled from 'styled-components/native';
import Input from '../../components/Input';

export const Container = styled.KeyboardAvoidingView`
  flex:1;
  justify-content:center;
  align-items:center;   
  background:#fff;
`;



export const Logo = styled.Image`

`;
export const Title= styled.Text`
margin-top:20px;
font-weight:bold;
font-size:20px;
color:#000;
`;

export const FieldsContainer =styled.View`

padding: 10px 20px;
align-self:stretch;
margin:20px 5px;
border-radius:8px;


`;

export const SaveButton = styled.View`
background: #ffc700;
margin-top:10px;

width:100%;
justify-content:center;
align-items:center;
padding:10px;
border-radius:8px;
`;

export const SaveButtonText = styled.Text`
color:#eee;
font-weight:bold;
`