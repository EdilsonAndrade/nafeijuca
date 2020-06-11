import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import currencyformatter from 'currency-formatter';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BACKENDIP } from 'react-native-dotenv';
import SubItem from './SubItem';
import * as CartActions from '~/store/modules/cart/action';
import {
  Container, MainViewContainer, ProductViewContainer, ProductTitleText,
  ProductDetailText, TitleAndPriceContainer, PriceContainer, PriceText, PromotionPrice,
  ImageProduct, ViewBottomButtons, ViewMainBottom, ViewButtonsPlusMinus, TotalText, ButtonAdd, ButtonAddText, Plus, Minus,
} from './styles';


export default function ProductDetail({ route, navigation }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { product } = route.params;
  const { SubItems } = product;
  const [mandatoryItems, setMandatoryItems] = useState([]);
  const [nonMandatoryItems, setNonMandatoryItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [totalSubItem, setTotalSubItem] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedSubItems, setSelectedSubItems] = useState([]);


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
  const handleOnUncheckSubItem = (subItem) => {
    setTotalSubItem(Number(totalSubItem) - Number(subItem.price));
    setTotalPrice(Number(totalPrice) - (Number(subItem.price) * countProducts));
    const itemRemoved = selectedSubItems.filter((x) => x.id !== subItem.id);
    setSelectedSubItems(itemRemoved || []);
  };

  const handleOnCheckSubItem = (subItem) => {
    setTotalSubItem(Number(totalSubItem) + Number(subItem.price));
    setTotalPrice(Number(totalPrice) + (Number(subItem.price) * countProducts));
    setSelectedSubItems([...selectedSubItems, subItem]);
  };

  const handleAddToCart = () => {
    const totalMandatory = selectedSubItems.filter((x) => x.mandatory === true);

    if (mandatoryItems && mandatoryItems.length > 0 && totalMandatory.length < mandatoryItems[0].ProductsItems.max) {
      setShowAlert(true);
    } else {
      const existedProduct = cart.products.find((x) => x.id === product.id);

      const productAdded = {
        id: product.id,
        name: product.name,
        subItems: selectedSubItems,
        quantity: existedProduct ? Number(existedProduct.quantity) + Number(countProducts) : countProducts,
        file: product.File,
      };

      dispatch(CartActions.addToCartSuccess({ totalItems: existedProduct ? 1 : cart.totalItems + 1, totalPrice: cart.totalPrice + totalPrice, product: productAdded }));
      navigation.navigate('Order');
    }
  };
  return (
    <>

      <Container>

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
              {nonMandatoryItems.length > 0 ? <SubItem items={nonMandatoryItems} onUnCheck={((subItem) => handleOnUncheckSubItem(subItem))} onCheck={(subItem) => handleOnCheckSubItem(subItem)} /> : null}
              {mandatoryItems.length > 0 ? <SubItem items={mandatoryItems} onUnCheck={((subItem) => handleOnUncheckSubItem(subItem))} onCheck={(subItem) => handleOnCheckSubItem(subItem)} mandatory /> : null}


            </TitleAndPriceContainer>

          </ProductViewContainer>


        </MainViewContainer>
        <ViewBottomButtons>

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
            <TouchableOpacity onPress={handleAddToCart}>
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

        </ViewBottomButtons>

        <AwesomeAlert
          show={showAlert}
          title="Selecione os itens que são obrigatórios"
          closeOnTouchOutside
          showConfirmButton
          onConfirmPressed={() => setShowAlert(false)}
          confirmText="Farei isto"
          confirmButtonColor="rgba(247, 56, 35, 1)"
        />

      </Container>

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
