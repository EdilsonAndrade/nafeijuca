import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Order from '~/pages/Order';
import NotLogged from '../../components/NotLogged';
const Stack = createStackNavigator();
export default function OrderNavigation() {
  return (
    <Stack.Navigator initialRouteName="Order">
      <Stack.Screen
        name="Order"
        component={Order}
        options={{
          title: 'PRODUTOS SELECIONADOS',
          headerShown: false,
          
        }}
      />
    </Stack.Navigator>
  );
}
