import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';
import Dashboard from '~/pages/Dashboard';
import Product from '~/pages/Product';
import LocationAddress from '~/pages/LocationAddress';
import SearchAddress from '~/pages/SearchAddress';


const Stack = createStackNavigator();

export default function DashboardNavigation({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}

      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={
          {
            title: '',
          }
        }
      />
      <Stack.Screen
        name="LocationAddress"
        component={LocationAddress}
        options={
          {
            title: '',
          }
        }
      />
      <Stack.Screen
        name="SearchAddress"
        component={SearchAddress}
        options={
          {
            title: '',

          }
        }
      />
    </Stack.Navigator>
  );
}

DashboardNavigation.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
};

DashboardNavigation.defaultProps = {
  navigation: {},
};
