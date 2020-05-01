import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderTranslucent from '~/components/HeaderTranslucent';
import HeaderBackProduct from '~/assets/capaproduct.jpg';
import {
  StoreKm,
  TitleContent,
  TopView,
  MainSafeAreaView,
  MainScrollViewVertical,
  MinimunOrderContainer,
  MinimunOrderContent,
} from './styles';
import DeliveryInfoView from '~/components/DeliveryInfo';
import * as ProductGroupActions from '~/store/modules/productGroup/actions';
import Category from './Category';
import Product from './Product';

export default function ProductGroup({ navigation }) {
  const store = useSelector((state) => state.store);
  const productGroups = useSelector((state) => state.productGroup.productGroups);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ProductGroupActions.loadRequest(store.id));
  }, []);

  const storeSelected = useSelector((state) => state.store);

  const renderProductGroup = () => productGroups.map((productGroup) => (
    <>
      <Category key={productGroup.id} item={productGroup} />

      {productGroup.Products.map((product) => (
        <Product key={product.id} item={product} />
      ))}
    </>

  ));
  return (
    <>
      <HeaderTranslucent navigation={navigation} showBack showShare headerBackImage={HeaderBackProduct} opacity="1" />
      <MainSafeAreaView>
        <MainScrollViewVertical
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
        >
          <TopView>
            <TitleContent>
              Unidade -
              {' '}
              {storeSelected.address}

            </TitleContent>
            <StoreKm>+1.5km</StoreKm>
          </TopView>
          <DeliveryInfoView />
          <MinimunOrderContainer>
            <Icon name="monetization-on" size={22} color="#666" />
            <MinimunOrderContent>
              Pedido Mínimo R$ 30,00
            </MinimunOrderContent>
          </MinimunOrderContainer>
          {renderProductGroup()}
        </MainScrollViewVertical>
      </MainSafeAreaView>
    </>
  );
}
ProductGroup.propTypes = {

  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
};
ProductGroup.defaultProps = {

  navigation: {},
};
