import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import { MiddleHeaderBarContent, ImageFeijucaContent } from './styles';

export default function MiddleHeaderBar({ showButtons, iconImage, navigation }) {
  return (
    <MiddleHeaderBarContent showButtons={showButtons}>
      {showButtons ? (
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon name="keyboard-arrow-left" size={42} color="#fff" />
        </TouchableWithoutFeedback>
      ) : null}
      <ImageFeijucaContent source={iconImage} />
      {showButtons ? <Icon name="share" size={32} color="#fff" /> : null}
    </MiddleHeaderBarContent>
  );
}
MiddleHeaderBar.propTypes = {
  showButtons: PropTypes.bool,
  iconImage: PropTypes.number,
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
};
MiddleHeaderBar.defaultProps = {
  showButtons: false,
  iconImage: null,
  navigation: {},
};
