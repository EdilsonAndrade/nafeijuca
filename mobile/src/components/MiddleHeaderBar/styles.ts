import styled, { css } from 'styled-components/native';
interface MiddleHeaderBarProps{
  showButtons:boolean;
}
export const MiddleHeaderBarContent = styled.View<MiddleHeaderBarProps>`
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center; 
  justify-content:space-between;
  ${(props) => (props.showButtons === true ? css`justify-content:space-between` : css`justify-content:center`)}
  ${(props) => (props.showButtons === true ? css`top:25px` : css`top:1px`)}
  

`;
export const TextContent = styled.Text`
font-size:18px;
font-weight:bold;
color:#fff
`;

export const ImageFeijucaContent = styled.Image`
  width: 90px;
  height:90px;
  border-radius:35px;
  opacity:.9;
`;

export const LogoContainer = styled.View`
align-items:flex-end;
top:15px;

`;
export const IconContainer = styled.View`
  justify-content:center;
  align-items:flex-end;
  
  
  `;
