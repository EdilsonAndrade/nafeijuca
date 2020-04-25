import styled, { css } from 'styled-components/native';


export const ViewContainer = styled.View`
  width: 100%;
  justify-content: center;
  height: ${(props) => props.size};
  
  
`;
export const ImageContent = styled.Image`
  position: absolute;
  width: 100%;
  height: ${(props) => props.size};
  opacity:${(props) => (props.opacity ? props.opacity : '0.5')};
  top:1px;

  
`;
