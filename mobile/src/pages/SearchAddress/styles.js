import styled from 'styled-components/native';


export const ContainerBackAndInput = styled.View`
background:#eee;
flex-direction:row;
align-items:center;
justify-content:center;
width:90%;
border-radius:8px;
`;

export const InputAddress = styled.TextInput`
font-size:15px;
background:#eee;
width:80%;

padding:5px;
color:#666;
`;


export const MainSafeAreaView = styled.SafeAreaView.attrs({

})`
  background: #fff;
  margin-top:10px;
  height:87%;
`;


export const FlatListAddresses = styled.FlatList``;

export const AddressContainer = styled.View`
  display:flex;
  flex-direction:row;
  align-items:center;
  padding:5px 15px;
`;

export const AddressTitleAndDetailContent = styled.View`
display: flex;
margin-left:10px;
`;

export const AddressName = styled.Text.attrs({
  numberOfLines: 2,
})`
font-size: 16px;
color:#666;

`;

export const AddressDetail = styled.Text`
font-size: 13px;
color:#666;
`;
