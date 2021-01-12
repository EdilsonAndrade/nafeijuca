import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Signup from '../../pages/Signup';
import Profile from '../../pages/Profile';

const Tab = createMaterialTopTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Signup">
      <Tab.Screen name="Signup" component={Signup} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}