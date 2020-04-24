import React from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';

import MiddleHeaderBar from '~/components/MiddleHeaderBar';
import { AnimatedViewContainer, ImageContent } from './styles';

export default function HeaderTranslucent({
  showButtons, headerBackImage, iconImage, opacity, navigation,
}) {
  return (
    <AnimatedViewContainer>
      <StatusBar
        barStyle="defaut"
        color="#fff"
        translucent
        backgroundColor="rgba(0, 0, 0, 0.0)"
      />
      <ImageContent source={headerBackImage} opacity={opacity} />
      <MiddleHeaderBar showButtons={showButtons} iconImage={iconImage} navigation={navigation} />


    </AnimatedViewContainer>
  );
}

HeaderTranslucent.propTypes = {
  showButtons: PropTypes.bool,
  headerBackImage: PropTypes.number,
  iconImage: PropTypes.number,
  opacity: PropTypes.string,
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
};
HeaderTranslucent.defaultProps = {
  showButtons: false,
  headerBackImage: null,
  iconImage: null,
  opacity: null,
  navigation: {},
};
