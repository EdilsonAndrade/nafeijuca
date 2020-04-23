import styled from 'styled-components/native';
import {Animated} from 'react-native';

export const AnimatedViewContainer = styled(Animated.View)`
  width: 100%;
  height: 110px;
  justify-content: center;
`;
export const MiddleHeaderBarContent = styled.View`
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const ImageContent = styled.Image`
  position: absolute;
  width: 100%;
  height: 110px;
  flex: 1;
`;

export const ImageFeijucaContent = styled.Image`
  width: 160px;
  height: 160px;
  top: 15px;
`;
