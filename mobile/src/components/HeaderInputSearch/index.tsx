import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StatusBar, TouchableOpacity } from 'react-native';
import { GMAPS_KEY } from 'react-native-dotenv';

import GeoCode from 'react-geocode';
import
ViewContainer
  from './styles';

export default function HeaderInputSearch({ navigation, children }) {
  return (
    <ViewContainer>
      <StatusBar
        barStyle="dark-content"
        color="#fff"
        translucent
        backgroundColor="rgba(0, 0, 0, 0.0)"
      />
      {children}
    </ViewContainer>
  );
}
HeaderInputSearch.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
};

HeaderInputSearch.defaultProps = {
  navigation: {},
};
