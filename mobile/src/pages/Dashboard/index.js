import React from 'react';
import { StatusBar } from 'react-native';
import { AnimatedViewContainer, ImageContent } from './styles';
import HeaderBackImage from '../../assets/capa.png';

import MiddleHeaderBar from './MiddleHeaderBar';

export default function Dashboard() {
  return (
    <AnimatedViewContainer>
      <StatusBar
        barStyle="defaut"
        color="#fff"
        translucent
        backgroundColor="rgba(0, 0, 0, 0.0)"
      />
      <ImageContent source={HeaderBackImage} />
      <MiddleHeaderBar />
    </AnimatedViewContainer>
  );
}
