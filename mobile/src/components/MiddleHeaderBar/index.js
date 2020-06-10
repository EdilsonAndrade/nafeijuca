import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import { useSelector } from 'react-redux';
import * as navigation from '~/services/rootNavigation';
import {
  MiddleHeaderBarContent, ImageFeijucaContent, LogoContainer, TextContent, IconContainer,
} from './styles';
import Cart from '~/components/Cart';

export default function MiddleHeaderBar({
  showBack, showShare, iconImage, backButtonColor, text,
}) {
  const cart = useSelector((state) => state.cart);

  const returnShareOrCart = useMemo(() => {
    if (cart.totalItems > 0 && !iconImage) {
      return <Cart color="#fff" />;
    } if (showShare) {
      return <Icon name="share" size={32} />;
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


      {iconImage
        ? (
          <LogoContainer>
            <ImageFeijucaContent source={iconImage} />
          </LogoContainer>
        )
        : null}


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
  backButtonColor: PropTypes.string,
  text: PropTypes.string,
};
MiddleHeaderBar.defaultProps = {
  showBack: false,
  showShare: false,
  iconImage: null,
  backButtonColor: '',
  text: '',
};
