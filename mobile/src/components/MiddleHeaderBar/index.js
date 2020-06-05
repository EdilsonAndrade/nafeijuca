import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import { useSelector } from 'react-redux';
import {
  MiddleHeaderBarContent, ImageFeijucaContent, LogoContainer, IconContainer,
} from './styles';
import Cart from '~/components/Cart';

export default function MiddleHeaderBar({
  showBack, showShare, iconImage, navigation, backButtonColor,
}) {
  const cart = useSelector((state) => state.cart);

  const returnShareOrCart = useMemo(() => {
    if (cart.totalItems > 0) {
      return <Cart color="#fff" />;
    } if (showShare) {
      return <Icon name="share" size={32} color="#fff" />;
    }
    return null;
  });
  return (
    <MiddleHeaderBarContent showButtons={showBack}>
      {showBack ? (
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon name="keyboard-arrow-left" size={42} color={backButtonColor || '#fff'} />
        </TouchableWithoutFeedback>
      ) : null}
      <LogoContainer>
        <ImageFeijucaContent source={iconImage} />
      </LogoContainer>
      <IconContainer>
        {returnShareOrCart}
      </IconContainer>

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
