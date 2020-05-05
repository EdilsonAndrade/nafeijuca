import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BACKENDIP } from 'react-native-dotenv';
import {
  MainViewContainer, ProductViewContainer, ProductTitleText,
  ProductDetailText, TitleAndPriceContainer, PriceContainer, PriceText, PromotionPrice,
  ImageProduct,
} from './styles';

export default function ProductDetail({ route, navigation }) {
  const { product } = route.params;

  return (
    <MainViewContainer>
      <ProductViewContainer>
        {product.File
          ? <ImageProduct source={{ uri: product.File.url.replace('localhost', BACKENDIP) }} />
          : <Icon name="broken-image" size={90} /> }
        <TitleAndPriceContainer>
          <ProductTitleText>
            {product.name}
          </ProductTitleText>
          <ProductDetailText numberOfLines={2}>
            {product.description}
          </ProductDetailText>
          <PriceContainer>
            {product.promotionPrice

              ? (
                <>
                  <PriceText>
                    A partir de R$
                    {Math.round(product.promotionPrice).toFixed(2)}
                  </PriceText>
                  <PromotionPrice>
                    R$
                    {' '}
                    {Math.round(product.price).toFixed(2)}
                  </PromotionPrice>
                </>
              )
              : (
                <>
                  <PriceText>
                    A partir de R$
                    {' '}
                    {Math.round(product.price).toFixed(2)}
                  </PriceText>
                  <PromotionPrice>
                    {product.promotionPrice ? Math.round(product.promotionPrice).toFixed(2) : null}
                  </PromotionPrice>
                </>
              )}

          </PriceContainer>

        </TitleAndPriceContainer>

      </ProductViewContainer>


    </MainViewContainer>
  );
}


ProductDetail.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      product: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.isRequired,
  }).isRequired,
};