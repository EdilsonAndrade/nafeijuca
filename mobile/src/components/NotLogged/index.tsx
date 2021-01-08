import React from 'react';

import { Container, Title, SubTitle, ButtonContainer } from './styles';
import { useNavigation } from '@react-navigation/native';
const NotLogged: React.FC = () => {

  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Signup')
  }
  return (
    <Container>
      <Title>
        Falta pouco!
      </Title>
      <SubTitle>
      Para concluir o pedido, você precisa se cadastrar ou logar!. 
      </SubTitle>
      <ButtonContainer onPress={handlePress} title="Entrar ou cadastrar-se" />
    </Container>
  )
}

export default NotLogged;