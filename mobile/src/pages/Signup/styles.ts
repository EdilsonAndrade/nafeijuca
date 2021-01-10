import styled from 'styled-components/native';
import Input from '../../components/Input';

export const Container = styled.KeyboardAvoidingView`
  flex:1;
  justify-content:center;
  align-items:center;   
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
export const FieldsTitle= styled.Text`
font-weight:bold;
font-size:14px;
color:#000;
margin:5px 0;
`

export const FieldContent = styled.View`
  padding:4px;
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  align-items:center;
  border-color:#666;
  border-width:1px;
  border-radius:6px;
`

export const InputField = styled(Input)`
background:#eee;
padding: 5px;
flex:1;
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