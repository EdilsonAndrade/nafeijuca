import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';

import { Container, ButtonText } from './styles';

interface IButton {
  text: string;
  action(): void;
  loading: boolean;

}
const Button: React.FC<IButton> = ({ text, action, loading }) => {
  return (
    loading
      ?
      <ActivityIndicator size={22} color="#ffc700" />
      :
      <TouchableOpacity onPress={action}>
        <Container>
          <ButtonText>
            {text}
          </ButtonText>
        </Container>
      </TouchableOpacity>
  )
}

export default Button;