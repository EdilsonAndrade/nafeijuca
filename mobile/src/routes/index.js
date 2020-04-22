import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Tab = createBottomTabNavigator();
import DashboardNavigation from './dashboard';
import ProfileNavigation from './profile';
import SearchNavigation from './search';
import OrdersNavigation from './order';
export default function Route() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      tabBarOptions={{
        activeTintColor: '#000',
      }}>
      <Tab.Screen
        name="Inicio"
        component={DashboardNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon name="home" color={focused ? '#000' : '#ddd'} size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="Busca"
        component={SearchNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon name="search" color={focused ? '#000' : '#ddd'} size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="Pedidos"
        component={OrdersNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="event-note"
              color={focused ? '#000' : '#ddd'}
              size={32}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="person-outline"
              color={focused ? '#000' : '#ddd'}
              size={32}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
