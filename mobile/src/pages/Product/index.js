import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderTranslucent from '~/components/HeaderTranslucent';
import HeaderBackProduct from '~/assets/capaproduct.jpg';
import {
  StoreKm, TitleContent, TopView, MainSafeAreaView, MainScrollViewVertical, MinimunOrderContainer, MinimunOrderContent,
} from './styles';
import DeliveryInfoView from '~/components/DeliveryInfo';

export default function Product({ navigation }) {
  const storeSelected = useSelector((state) => state.store);
  return (
    <>
      <HeaderTranslucent navigation={navigation} showBack showShare headerBackImage={HeaderBackProduct} opacity="1" />
      <MainSafeAreaView>
        <MainScrollViewVertical
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
        />
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
      </MainSafeAreaView>
    </>
  );
}
Product.propTypes = {

  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
};
Product.defaultProps = {

  navigation: {},
};
