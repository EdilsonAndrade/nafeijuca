import React from 'react';
import {ViewContainer, ImageContent} from './styles';
import HeaderBackImage from '../../assets/capa.png';
export default function Dashboard() {
  return (
    <ViewContainer>
      <ImageContent source={HeaderBackImage} />
    </ViewContainer>
  );
}
