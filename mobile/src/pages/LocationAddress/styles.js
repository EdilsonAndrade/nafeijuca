import styled from 'styled-components/native';
import { SafeAreaView, FlatList } from 'react-native';


export const MainSafeAreaView = styled(SafeAreaView)`
width:100%;
top:10px;
`;
export const ImageFeijucaContent = styled.Image`
  width: 90px;
  height:90px;
  border-radius:35px;
  opacity:.9;
  top: 18px;
`;
export const Container = styled.View`

display:flex;
align-items:center;
`;
export const TitleContent = styled.Text`

font-size:22px;
color: #666;
width:90%;
padding:30px;
text-align:center;
border-radius:6px;


`;


export const MainScrollViewVertical = styled.ScrollView.attrs({

})`
  background: #fff;
  margin-top:10px;
`;


export const ContainerInputAddress = styled.View`
background:#ddd;
width:80%;
height:50px;
border-radius:6px;
display:flex;
flex-direction:row;
align-items:center;
padding:5px;

`;

export const InputAddress = styled.TextInput`
width:100%;
font-size:15px;
`;
