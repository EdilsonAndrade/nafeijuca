import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  justify-content:center;
  background:#fff;
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

export const InputField = styled.TextInput`
background:transparent;
padding: 5px;
flex:1;
`;

export const ErrorContent = styled.Text`
color:#f81027;
`