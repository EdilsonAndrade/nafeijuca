import React from 'react';
import { Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  DeliveryInfoView, DeliveryBikeTimeAndPriceContainer,
  DeliveryPriceTimeContainer, TimeTextContent, PriceContent,
  WillGetInPersonContainer, WillGetInPersonText,
} from './styles';

export default function DeliveryInfo() {
  return (
    <DeliveryInfoView>

      <DeliveryBikeTimeAndPriceContainer>
        <Icon name="motorcycle" size={32} color="#000" />
        <DeliveryPriceTimeContainer>
          <TimeTextContent>Entrega em 30-40 min</TimeTextContent>
          <PriceContent>Valor da entrega R$ 9,00</PriceContent>
        </DeliveryPriceTimeContainer>

      </DeliveryBikeTimeAndPriceContainer>
      <WillGetInPersonContainer>

        <WillGetInPersonText>Retirar</WillGetInPersonText>
        <Switch trackColor={{ false: '#767577', true: '#eee' }} thumbColor="#FFF" />
      </WillGetInPersonContainer>
    </DeliveryInfoView>
  );
}
