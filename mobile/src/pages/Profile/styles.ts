import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
export const Container = styled.View`
  flex:1;
  padding:40px;
  background:#fff;
  align-items:center;
  width:100%;
  justify-content:center;
`;

export const AvatarContainer = styled.View ` 
  align-items:center;
  justify-content:center;
  width:100%;
  position:relative;
`;

export const CameraIcon = styled(Icon)`
position:absolute;
bottom:-10px;
right:20%;

`
export const Avatar = styled.Image`
width: 136px;
height:136px;
border-radius:68px;

`;

export const FieldContents= styled.View`
width:100%;
`;

export const PasswordContent = styled.View`

margin-top:20px;
`;