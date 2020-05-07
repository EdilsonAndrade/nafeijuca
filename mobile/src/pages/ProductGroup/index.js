import React, { useEffect } from 'react';
import socketio from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { API_URL } from 'react-native-dotenv';
import {
  YellowBox, View, Animated, TouchableWithoutFeedback,
} from 'react-native';

import HeaderTranslucent from '~/components/HeaderTranslucent';
import HeaderBackProduct from '~/assets/capaproduct.jpg';
import {
  SecondHeaderView,
  StoreKm,
  TitleContent,
  TopView,
  SecondaryTopText,
  MainSafeAreaView,
  MainScrollViewVertical,
  MinimunOrderContainer,
  MinimunOrderContent,
} from './styles';
import DeliveryInfoView from '~/components/DeliveryInfo';
import * as ProductGroupActions from '~/store/modules/productGroup/actions';
import Category from './Category';
import Product from './Product';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
]);
export default function ProductGroup({ navigation }) {
  const store = useSelector((state) => state.store);
  const productGroups = useSelector((state) => state.productGroup.productGroups);
  const dispatch = useDispatch();

  const scrollOffset = new Animated.Value(0);

  useEffect(() => {
    const socket = socketio(API_URL, {
      query: { storeId: store.id },
    });

    socket.on('product_change', (socketData) => {
      dispatch(ProductGroupActions.loadSuccess(socketData));
    });
  }, []);

  useEffect(() => {
    dispatch(ProductGroupActions.loadRequest(store.id));
  }, []);


  const storeSelected = useSelector((state) => state.store);
  const renderProductGroup = () => productGroups.map((productGroup) => (
    <View key={productGroup.id}>
      <Category item={productGroup} />

      {productGroup.Products.map(((product) => (
        <Product key={product.id} item={product} navigation={navigation} />
      )))}
    </View>

  ));
  return (
    <>
      <HeaderTranslucent
        style={{
          height: scrollOffset.interpolate({
            inputRange: [40, 130],
            outputRange: [150, 0],
            extrapolate: 'clamp',
          }),
          opacity: scrollOffset.interpolate({
            inputRange: [40, 130],
            outputRange: [1, 0],
            extrapolate: 'clamp',
          }),

        }}
        navigation={navigation}
        showBack
        showShare
        headerBackImage={HeaderBackProduct}
        opacity="1"
      />
      <SecondHeaderView
        style={{
          height: scrollOffset.interpolate({
            inputRange: [40, 130],
            outputRange: [0, 100],
            extrapolate: 'clamp',
          }),
          opacity: scrollOffset.interpolate({
            inputRange: [40, 130],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),

        }}

      >

        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon name="keyboard-arrow-left" size={42} color="#fd3e3e" />
        </TouchableWithoutFeedback>
        <View
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <SecondaryTopText
            style={{
              fontSize: scrollOffset.interpolate({
                inputRange: [40, 130],
                outputRange: [20, 17],
                extrapolate: 'clamp',
              }),
            }}
          >
            Unidade -
            {storeSelected.address}

          </SecondaryTopText>
          <SecondaryTopText
            style={{
              fontSize: scrollOffset.interpolate({
                inputRange: [40, 130],
                outputRange: [19, 14],
                extrapolate: 'clamp',
              }),
              color: '#696969',
            }}
          >
            Entrega prevista 30-40min
          </SecondaryTopText>


        </View>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon name="share" size={32} color="#fd3e3e" />
        </TouchableWithoutFeedback>
      </SecondHeaderView>
      <MainSafeAreaView>
        <MainScrollViewVertical
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: { y: scrollOffset },
              },
            },
          ], {
            useNativeDriver: false,
          })}

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
