import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import { MiddleHeaderBarContent, ImageFeijucaContent } from './styles';

export default function MiddleHeaderBar({
  showBack, showShare, iconImage, navigation, backButtonColor,
}) {
  return (
    <MiddleHeaderBarContent showButtons={showBack}>
      {showBack ? (
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon name="keyboard-arrow-left" size={42} color={backButtonColor || '#fff'} />
        </TouchableWithoutFeedback>
      ) : null}
      <ImageFeijucaContent source={iconImage} />
      {showShare ? <Icon name="share" size={32} color="#fff" /> : null}
    </MiddleHeaderBarContent>
  );
}
MiddleHeaderBar.propTypes = {
  showBack: PropTypes.bool,
  showShare: PropTypes.bool,
  iconImage: PropTypes.number,
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  backButtonColor: PropTypes.string,
};
MiddleHeaderBar.defaultProps = {
  showBack: false,
  showShare: false,
  iconImage: null,
  navigation: {},
  backButtonColor: '',
};
