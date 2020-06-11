import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MainTabNavigation from './maintab';
import ProductDetail from '~/pages/ProductDetail';
import Cart from '~/components/Cart';

const Stack = createStackNavigator();

export default function Route() {
  return (
    <>
      <Stack.Navigator

        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Main"
          component={MainTabNavigation}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: 'DETALHES DO ITEM',
            headerLeft: () => (
              <Icon name="keyboard-arrow-left" onPress={() => navigation.goBack()} size={42} color="#ffc700" />
            ),
            headerRight: () => (
              <Cart color="#fff" />
            ),
          })}
        />


      </Stack.Navigator>
    </>
  );
}
