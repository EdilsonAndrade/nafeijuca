import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import currencyformatter from 'currency-formatter';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { BACKENDIP } from 'react-native-dotenv';
import SubItem from './SubItem';
import {
  MainViewContainer, ProductViewContainer, ProductTitleText,
  ProductDetailText, TitleAndPriceContainer, PriceContainer, PriceText, PromotionPrice,
  ImageProduct, ViewMainBottom, ViewButtonsPlusMinus, TotalText, ButtonAdd, ButtonAddText, Plus, Minus,
} from './styles';

export default function ProductDetail({ route, navigation }) {
  const { product } = route.params;
  const { SubItems } = product;
  const [mandatoryItems, setMandatoryItems] = useState([]);
  const [nonMandatoryItems, setNonMandatoryItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [totalSubItem, setTotalSubItem] = useState(0);

  useEffect(() => {
    const mandatory = SubItems.filter((subItem) => subItem.ProductsItems.mandatory === true);
    const nonMandatory = SubItems.filter((subItem) => subItem.ProductsItems.mandatory === false);
    setMandatoryItems(mandatory);
    setNonMandatoryItems(nonMandatory);
    setCountProducts(1);
    setTotalPrice(1 * product.promotionPrice || product.price);
  }, []);

  const handleAddMoreItem = () => {
    const count = countProducts + 1;
    console.log(count);
    setCountProducts(count);
    setTotalPrice((count * product.promotionPrice || product.price) + (count * totalSubItem));
  };

  const handleRemoveItem = () => {
    if (countProducts > 1) {
      const count = countProducts - 1;
      setCountProducts(count);

      setTotalPrice((count * product.promotionPrice || product.price) + (count * totalSubItem));
    }
  };
  const handleOnUncheckSubItem = (price) => {
    setTotalSubItem(Number(totalSubItem) - Number(price));
    setTotalPrice(Number(totalPrice) - (Number(price) * countProducts));
  };
  const handleOnCheckSubItem = (price) => {
    setTotalSubItem(Number(totalSubItem) + Number(price));
    setTotalPrice(Number(totalPrice) + (Number(price) * countProducts));
  };
  return (
    <>
      <MainViewContainer>
        <ProductViewContainer>
          {product.File
            ? <ImageProduct source={{ uri: product.File.url.replace('localhost', BACKENDIP) }} />
            : <Icon name="broken-image" size={90} /> }
          <TitleAndPriceContainer>
            <ProductTitleText>
              {product.name}
            </ProductTitleText>
            <ProductDetailText>
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
            {nonMandatoryItems.length > 0 ? <SubItem items={nonMandatoryItems} onUnCheck={((price) => handleOnUncheckSubItem(price))} onCheck={(price) => handleOnCheckSubItem(price)} /> : null}
            {mandatoryItems.length > 0 ? <SubItem items={mandatoryItems} onUnCheck={((price) => handleOnUncheckSubItem(price))} onCheck={(price) => handleOnCheckSubItem(price)} mandatory /> : null}


          </TitleAndPriceContainer>

        </ProductViewContainer>


      </MainViewContainer>
      <ViewMainBottom>
        <ViewButtonsPlusMinus>
          <TouchableOpacity onPress={handleRemoveItem}>
            <Minus name="remove" count={countProducts} />
          </TouchableOpacity>
          <TotalText>{countProducts}</TotalText>
          <TouchableOpacity onPress={handleAddMoreItem}>
            <Plus name="add" />
          </TouchableOpacity>
        </ViewButtonsPlusMinus>
        <TouchableOpacity>
          <ButtonAdd>
            <ButtonAddText>
              Adicionar
            </ButtonAddText>
            <ButtonAddText>
              {currencyformatter.format(totalPrice, { code: 'BRL' })}
            </ButtonAddText>
          </ButtonAdd>
        </TouchableOpacity>
      </ViewMainBottom>
    </>
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
