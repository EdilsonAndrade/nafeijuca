import styled from 'styled-components/native';
import { SafeAreaView, Animated, Platform } from 'react-native';

export const MainSafeAreaView = styled(SafeAreaView)`
flex:1;
padding:15px;
background:#fff;
`;

export const MainScrollViewVertical = styled.ScrollView.attrs({

})`

`;

export const SecondHeaderView = styled(Animated.View)`
justify-content:center;
align-items:center;
top:${Platform.OS === 'ios' ? '30px' : '20px'};
display:flex;
flex-direction:row;
justify-content:space-around;


`;
export const TopView = styled.View`
display:flex;
flex-direction:row;
justify-content:space-around;
align-items:center;
`;


export const TitleContent = styled(Animated.Text)`
  font-weight:600;
  font-size:20px;
  color:#000;
  padding:15px;
  
`;

export const SecondaryTopText = styled(Animated.Text)`
font-weight:700;
color:#000;
  
`;

export const StoreKm = styled.Text`
color:rgba(235, 107, 107, 1);
font-weight:bold;
font-size:15px;
`;

export const MinimunOrderContainer = styled.View`
margin-top:10px;
display:flex;

flex-direction:row;
justify-content:center;
align-items:center;
`;
export const MinimunOrderContent = styled.Text`
color: #666;
font-size:13px;
margin-left:3px;
`;
