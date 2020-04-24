import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '~/pages/Dashboard';
import Product from '~/pages/Product';

const Stack = createStackNavigator();

export default function DashboardNavigation() {
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
    </Stack.Navigator>
  );
}
