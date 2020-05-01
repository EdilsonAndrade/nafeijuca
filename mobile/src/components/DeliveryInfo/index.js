import React from 'react';
import { Switch, Image } from 'react-native';
import DeliveryMoto from '~/assets/deliverymotorcycle.png';
import {
  DeliveryInfoView, DeliveryBikeTimeAndPriceContainer,
  DeliveryPriceTimeContainer, TimeTextContent, PriceContent,
  WillGetInPersonContainer, WillGetInPersonText,
} from './styles';

export default function DeliveryInfo() {
  return (
    <DeliveryInfoView>

      <DeliveryBikeTimeAndPriceContainer>
        <Image source={DeliveryMoto} style={{ width: 32 }} />
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
