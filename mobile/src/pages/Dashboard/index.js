import React from 'react';

import PropTypes from 'prop-types';
import {
  TitleContent, MainSafeAreaView, MainScrollViewVertical,
} from './styles';
import HeaderBackImage from '~/assets/capa.png';
import Iconimage from '~/assets/icon.png';
import Store from './Store';
import HeaderTranslucent from '~/components/HeaderTranslucent';
import LocationLabel from './LocationLabel';

export default function Dashboard({ navigation }) {
  return (
    <>
      <HeaderTranslucent
        showBack={false}
        showShare={false}
        headerBackImage={HeaderBackImage}
        iconImage={Iconimage}
        opacity=".6"
      />
      <MainSafeAreaView>
        <LocationLabel navigation={navigation} />
        <TitleContent>
          Selecione uma filial
        </TitleContent>

        <MainScrollViewVertical
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
        >
          <Store navigation={navigation} />
        </MainScrollViewVertical>
      </MainSafeAreaView>
    </>
  );
}

Dashboard.propTypes = {
  navigation: PropTypes.shape({}),
};

Dashboard.defaultProps = {
  navigation: {},
};
