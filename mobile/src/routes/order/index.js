import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Order from '~/pages/Order';

const Stack = createStackNavigator();
export default function OrderNavigation() {
  return (
    <Stack.Navigator initialRouteName="Order">
      <Stack.Screen
        name="Order"
        component={Order}
        options={{
          title: 'CESTA DE PRODUTOS',

        }}
      />
    </Stack.Navigator>
  );
}
