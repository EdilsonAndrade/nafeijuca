import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BACKENDIP } from 'react-native-dotenv';
import {
  MainViewContainer, ProductViewContainer, ProductTitleText,
  ProductDetailText, TitleAndPriceContainer, PriceContainer, PriceText, PromotionPrice,
  ImageProduct,
} from './styles';

export default function Product({ item }) {
  return (
    <MainViewContainer>
      <ProductViewContainer>
        <TitleAndPriceContainer>
          <ProductTitleText>
            {item.name}
          </ProductTitleText>
          <ProductDetailText>
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
  }),
};

Product.defaultProps = {
  item: {
    description: '',
    promotionPrice: null,

  },
};
