import styled from 'styled-components/native';


export const StoreKm = styled.Text`
color:rgba(235, 107, 107, 1);
font-weight:bold;
font-size:15px;
`;


export const DeliveryInfoView = styled.View`
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  padding:10px;
  background: #eee;
  align-items:center;
  border:1px solid #ddd;
`;

export const DeliveryBikeTimeAndPriceContainer = styled.View`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  
`;
export const DeliveryPriceTimeContainer = styled.View`
  display:flex;
  margin-left:5px;
`;
export const TimeTextContent = styled.Text`
  color: #000;
  font-weight:600;
  font-size:16px;
`;

export const PriceContent = styled.Text`
  color: #f40;
  font-size:13px;
  font-weight:600;
`;
export const WillGetInPersonContainer = styled.View`
display:flex;
`;
export const WillGetInPersonText = styled.Text`
  color:#f40;
  font-weight:600;
  font-size:12px;
`;
