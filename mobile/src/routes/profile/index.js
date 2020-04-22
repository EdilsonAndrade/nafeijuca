import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import Profile from '../../pages/Profile';
// import { Container } from './styles';

export default function ProfileNavigation() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
