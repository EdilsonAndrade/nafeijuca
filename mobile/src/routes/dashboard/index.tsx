import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '~/pages/Dashboard';
import ProductGroup from '~/pages/ProductGroup';
import LocationAddress from '~/pages/LocationAddress';
import SearchAddress from '~/pages/SearchAddress';
import MapAddress from '~/pages/MapAddress';
import AddressConfirmation from '~/pages/AddressConfirmation';


const Stack = createStackNavigator();

export default function DashboardNavigation() {
  return (
    <Stack.Navigator

      screenOptions={{
        headerShown: false,

      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
      />
      <Stack.Screen
        name="ProductGroup"
        component={ProductGroup}
      />
      <Stack.Screen
        name="LocationAddress"
        component={LocationAddress}
      />
      <Stack.Screen
        name="SearchAddress"
        component={SearchAddress}
      />
      <Stack.Screen
        name="MapAddress"
        component={MapAddress}
      />
      <Stack.Screen
        name="AddressConfirmation"
        component={AddressConfirmation}
      />

    </Stack.Navigator>

  );
}
