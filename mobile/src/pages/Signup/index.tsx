import React, { useRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import NaFeijucaTypography from '../../assets/nafeijucatext.png';
import { Container, Logo, Title, FieldsContainer, FieldsTitle, FieldContent, InputField } from './styles';
import { Platform, TextInput, KeyboardAvoidingView } from 'react-native';

const Signup: React.FC = () => {

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);

  const handleSubmit = () => {

  }
  return (<Container
    behavior="height"
    keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
  >
      <Logo source={NaFeijucaTypography}></Logo>
      <Title>
        Preencha os dados para cadastro!
    </Title>
      <FieldsContainer

      >
        <FieldsTitle>
          Nome
      </FieldsTitle>
        <FieldContent>
          <Icon name="person" size={22} color="#ffc700" />
          <InputField
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()} />
        </FieldContent>
        <FieldsTitle>
          Seu Email
      </FieldsTitle>
        <FieldContent>
          <Icon name="email" size={22} color="#ffc700" />
          <InputField
            returnKeyType="next"
            ref={emailRef}
            keyboardType="email-address"
            onSubmitEditing={() => passwordRef.current?.focus()} />
        </FieldContent>
        <FieldsTitle>
          Sua Senha
      </FieldsTitle>
        <FieldContent>
          <Icon name="lock" size={22} color="#ffc700" />
          <InputField ref-={passwordRef}
            secureTextEntry
            autoCompleteType="password" returnKeyType="next"
            onSubmitEditing={() => phoneRef.current?.focus()}
          />
        </FieldContent>
        <FieldsTitle>
          Seu Telefone
      </FieldsTitle>
        <FieldContent>
          <Icon name="call" size={22} color="#ffc700" />
          <InputField ref={phoneRef}
            keyboardType="phone-pad"
            returnKeyType="send"
            onSubmitEditing={handleSubmit} />
        </FieldContent>
      </FieldsContainer>

    </Container>)
}

export default Signup;