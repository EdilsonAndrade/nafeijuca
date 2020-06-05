import styled, { css } from 'styled-components/native';

export const MiddleHeaderBarContent = styled.View`
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center; 
  
  ${(props) => (props.showButtons === true ? css`justify-content:space-between` : css`justify-content:center`)};
  ${(props) => (props.showButtons === true ? css`top:25px` : css`top:1px`)};
  

`;
export const ImageFeijucaContent = styled.Image`
  width: 90px;
  height:90px;
  border-radius:35px;
  opacity:.9;
`;

export const LogoContainer = styled.View`
width:60%;
align-items:flex-end;
top:15px;
`;
export const IconContainer = styled.View`
  justify-content:center;
  align-items:flex-end;
  width:30%;
  
  
  `;
