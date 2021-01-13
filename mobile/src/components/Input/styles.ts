import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  justify-content:center;
  background:#fff;
`;


export const FieldsTitle= styled.Text`
font-weight:600;
font-size:14px;
color:#000;
margin:5px 0;
`

export const FieldContent = styled.View`
  padding:2px 4px;
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  align-items:center;
  border-color:#ddd;
  border-width:1px;
  border-radius:6px;
`

export const InputField = styled.TextInput`
background:transparent;
padding: 2px;
flex:1;
`;

export const ErrorContent = styled.Text`
color:#f81027;
`