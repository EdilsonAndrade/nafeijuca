import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Tab = createBottomTabNavigator();
import DashboardNavigation from './dashboard';
import ProfileNavigation from './profile';
import SearchNavigation from './search';
import OrdersNavigation from './order';

export default function Route() {
  const icons = {
    Home: {
      name: 'home',
    },
    Search: {
      name: 'search',
    },
    Order: {
      name: 'event-note',
    },
    Mail: {
      name: 'mail-outline',
    },
    Profile: {
      name: 'person-outline',
    },
  };
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          const {name} = icons[route.name];
          return <Icon name={name} color={color} size={size} />;
        },
      })}
      tabBarOptions={{
        style: {
          backgroundColor: '#fff',
          borderTopColor: 'rgba(255, 255, 253, 0.2)',
        },
        activeTintColor: '#000',
        inactiveTintColor: '#ddd',
      }}>
      <Tab.Screen
        name="Home"
        component={DashboardNavigation}
        options={{
          title: 'Inicio',
          headerTransparent: true,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigation}
        options={{
          title: 'Pesquisar',
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrdersNavigation}
        options={{
          title: 'Pedidos',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigation}
        options={{
          title: 'Perfil',
        }}
      />
      <Tab.Screen
        name="Mail"
        component={ProfileNavigation}
        options={{
          title: 'Mensagens',
        }}
      />
    </Tab.Navigator>
  );
}
