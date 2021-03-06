import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Signup from '../../pages/Signup';
import Login from '../../pages/Login';

const Tab = createMaterialTopTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Signup"
    
    tabBarOptions={{
      activeTintColor:"#000",
      labelStyle:{
        textTransform:"none"
      },
      indicatorStyle:{
        backgroundColor:"#ffc700"
      }
    }}
    >
      <Tab.Screen
      options={{title:"Cadastre-se"}}
      name="Signup" component={Signup} 
      />
      <Tab.Screen 
      options={{title:"Ja sou cliente"}}
      name="Login" component={Login} />
    </Tab.Navigator>
  );
}