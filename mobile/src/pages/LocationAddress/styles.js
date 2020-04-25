import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';


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
width:80%;
padding:30px;
text-align:center;
border-radius:6px;


`;


export const MainScrollViewVertical = styled.ScrollView.attrs({

})`
  background: #fff;
  margin-top:10px;
`;
