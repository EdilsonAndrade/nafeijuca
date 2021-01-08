import styled from 'styled-components/native';
import { transparentize } from 'polished';

export const Container = styled.View`
  display:flex;
  flex-direction:column;
  background:${transparentize(.1,'#fff')} ;
  padding:10px 10px;
`;

export const Title = styled.Text`
  font-weight:bold;
  font-size:18px;
`
export const SubTitle = styled.Text`
color:#696969;
font-size:14px;
padding:5px 0;
`
export const ButtonContainer = styled.Button`

`;

