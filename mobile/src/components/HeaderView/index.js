import React from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';

import MiddleHeaderBar from '~/components/MiddleHeaderBar';
import { ViewContainer, ImageContent } from './styles';

export default function HeaderView({
  showBack, showShare, headerBackImage, iconImage, opacity, navigation, headerSize, imageSize, backButtonColor,
}) {
  return (
    <ViewContainer size={headerSize}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="rgba(0, 0, 0, 0.0)"
      />
      <ImageContent source={headerBackImage} opacity={opacity} size={imageSize} />
      <MiddleHeaderBar backButtonColor={backButtonColor} showBack={showBack} showShare={showShare} iconImage={iconImage} navigation={navigation} />


    </ViewContainer>
  );
}

HeaderView.propTypes = {
  showShare: PropTypes.bool,
  showBack: PropTypes.bool,
  headerBackImage: PropTypes.number,
  iconImage: PropTypes.number,
  opacity: PropTypes.string,
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  headerSize: PropTypes.string,
  backButtonColor: PropTypes.string,
};
HeaderView.defaultProps = {
  showShare: false,
  showBack: false,
  headerBackImage: null,
  iconImage: null,
  opacity: null,
  navigation: {},
  headerSize: '',
  backButtonColor: '',
};
