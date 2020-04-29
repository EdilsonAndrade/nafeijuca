import styled, { css } from 'styled-components/native';
import { Animated } from 'react-native';

export const AnimatedViewContainer = styled(Animated.View)`
  width: 100%;
  justify-content: center;
  ${
  (props) => (props.size
    ? css`
    height:props.size;
    `
    : null)
};
  
`;
export const ImageContent = styled.Image`
  position: absolute;
  width: 100%;
  height: 110px;
  opacity:${(props) => (props.opacity ? props.opacity : '0.5')};
  top:1px;

  
`;