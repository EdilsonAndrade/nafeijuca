import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NaFeijucaImageText from '~/assets/nafeijucatext.png';

import { MiddleHeaderBarContent, ImageFeijucaContent } from '../styles';

export default function MiddleHeaderBar() {
  return (
    <MiddleHeaderBarContent>
      <Icon name="perm-phone-msg" size={32} color="#fff" />
      <ImageFeijucaContent source={NaFeijucaImageText} />
      <Icon name="share" size={32} color="#fff" />
    </MiddleHeaderBarContent>
  );
}
