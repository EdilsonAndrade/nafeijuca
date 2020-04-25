import React from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';

import MiddleHeaderBar from '~/components/MiddleHeaderBar';
import { AnimatedViewContainer, ImageContent } from './styles';

export default function HeaderTranslucent({
  showBack, showShare, headerBackImage, iconImage, opacity, navigation, size,
}) {
  return (
    <AnimatedViewContainer size={size !== null ? size : ''}>
      <StatusBar
        barStyle="defaut"
        color="#fff"
        translucent
        backgroundColor="rgba(0, 0, 0, 0.0)"
      />
      <ImageContent source={headerBackImage} opacity={opacity} />
      <MiddleHeaderBar showBack={showBack} showShare={showShare} iconImage={iconImage} navigation={navigation} />


    </AnimatedViewContainer>
  );
}

HeaderTranslucent.propTypes = {
  showShare: PropTypes.bool,
  showBack: PropTypes.bool,
  headerBackImage: PropTypes.number,
  iconImage: PropTypes.number,
  opacity: PropTypes.string,
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  size: PropTypes.string,
};
HeaderTranslucent.defaultProps = {
  showShare: false,
  showBack: false,
  headerBackImage: null,
  iconImage: null,
  opacity: null,
  navigation: {},
  size: '',
};
