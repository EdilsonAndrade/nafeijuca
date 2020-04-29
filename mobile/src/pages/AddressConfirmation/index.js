import React from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import { Container } from './styles';

export default function AddressConfirmation() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  return (
    <View>
      <Text>{user.address.addressLine}</Text>
    </View>
  );
}
