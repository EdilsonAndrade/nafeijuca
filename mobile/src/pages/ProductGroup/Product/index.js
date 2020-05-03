import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BACKENDIP } from 'react-native-dotenv';
import {
  MainViewContainer, SeeDetailButton, ProductViewContainer, ProductTitleText,
  ProductDetailText, TitleAndPriceContainer, PriceContainer, PriceText, PromotionPrice,
  ImageProduct,
  DeactiveView,
  DeactiveText,
} from './styles';

export default function Product({ item, navigation }) {
  const renderDeactiveItem = (active) => {
    if (!active) {
      return (
        <DeactiveView>
          <DeactiveText>Esgotado</DeactiveText>
        </DeactiveView>
      );
    }
    return null;
  };

  const handleDetailProduct = (product) => {
    if (product.active) {
      navigation.navigate('ProductDetail', { product });
    }
  };
  return (
    <MainViewContainer active={item.active}>
      <SeeDetailButton onPress={() => handleDetailProduct(item)}>
        <ProductViewContainer active={item.active}>
          <TitleAndPriceContainer>
            <ProductTitleText>
              {item.name}
            </ProductTitleText>
            <ProductDetailText numberOfLines={2}>
              {item.description}
            </ProductDetailText>
            <PriceContainer>
              {item.promotionPrice

                ? (
                  <>
                    <PriceText>
                      A partir de R$
                      {' '}
                      {Math.round(item.promotionPrice).toFixed(2)}
                    </PriceText>
                    <PromotionPrice>
                      R$
                      {' '}
                      {Math.round(item.price).toFixed(2)}
                    </PromotionPrice>
                  </>
                )
                : (
                  <>
                    <PriceText>
                      A partir de R$
                      {' '}
                      {Math.round(item.price).toFixed(2)}
                    </PriceText>
                    <PromotionPrice>
                      {item.promotionPrice ? Math.round(item.promotionPrice).toFixed(2) : null}
                    </PromotionPrice>
                  </>
                )}

            </PriceContainer>

          </TitleAndPriceContainer>
          {item.File
            ? <ImageProduct source={{ uri: item.File.url.replace('localhost', BACKENDIP) }} />
            : <Icon name="broken-image" size={90} /> }
        </ProductViewContainer>

      </SeeDetailButton>
      {renderDeactiveItem(item.active)}
    </MainViewContainer>
  );
}


Product.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.string.isRequired,
    promotionPrice: PropTypes.string,
    File: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
    active: PropTypes.bool.isRequired,
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

Product.defaultProps = {
  item: {
    description: '',
    promotionPrice: null,

  },
};
