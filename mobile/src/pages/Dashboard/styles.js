import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';


export const MainSafeAreaView = styled(SafeAreaView)`
height:82%;
width:100%;
`;
export const ImageFeijucaContent = styled.Image`
  width: 90px;
  height:90px;
  border-radius:35px;
  opacity:.9;
  top: 18px;
`;

export const TitleContent = styled.Text`

font-size:22px;
color: #444;
background:#fff;
width:100%;
padding:10px;
text-align:center;
border-radius:6px;
top:15px;

`;


export const MainScrollViewVertical = styled.ScrollView.attrs({

})`
  background: #fff;
  margin-top:10px;
`;
