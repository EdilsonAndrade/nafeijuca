import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const AnimatedViewContainer = styled(Animated.View)`
  width: 100%;
  justify-content: center;
  

`;

export const ImageContent = styled(Animated.Image)`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity:${(props) => (props.opacity ? props.opacity : '0.5')};

  
`;
