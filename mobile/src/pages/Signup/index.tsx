import React, { useRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import NaFeijucaTypography from '../../assets/nafeijucatext.png';
import SignupBackground from '../../assets/signupbackground.png';
import { Form } from '@unform/mobile';
import {SubmitHandler, FormHandles} from '@unform/core';
import {
  Container, Logo, Title, FieldsContainer, FieldsTitle, FieldContent, InputField,
  SaveButton, SaveButtonText
} from './styles';
import { Platform, TextInput, TouchableOpacity } from 'react-native';
import { IsOptional } from 'prop-types';

interface ISignup {
  email:string;
  name:string;
  password:string;
  confirmPassword:string;
  phone:string;

}
const Signup: React.FC = () => {

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
const formRef = useRef<FormHandles>(null);

  const handleSubmit:SubmitHandler<ISignup> = (data) => {
    console.log('salva', data);
  }
  return (<Container
    behavior="height"
    keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
  >
    <Title>
      Crie Sua Conta!
    </Title>
    <FieldsContainer

    >
      <Form ref={formRef} onSubmit={handleSubmit}>
      <FieldsTitle>
        Nome
      </FieldsTitle>
      <FieldContent>
        <Icon name="person" size={22} color="#ffc700" />
        <InputField
        refInput={passwordRef}
        name="name"
          keyType="next"
          onSubmit={() => emailRef.current?.focus()} />
      </FieldContent>
      <FieldsTitle>
        Seu Email
      </FieldsTitle>
      <FieldContent>
        <Icon name="email" size={22} color="#ffc700" />
        <InputField
        
          keyType="next"
          name="email"
          refInput={emailRef}
          keyBoardStyle="email-address"
          onSubmit={() => passwordRef.current?.focus()} />
      </FieldContent>
      <FieldsTitle>
        Sua Senha
      </FieldsTitle>
      <FieldContent>
        <Icon name="lock" size={22} color="#ffc700" />
        <InputField 
        refInput={passwordRef}
          isPassword={true}
          name="password"
          
          onSubmit={() => confirmPasswordRef.current?.focus()}
        />
      </FieldContent>
      <FieldsTitle>
        Confirme sua Senha
      </FieldsTitle>
      <FieldContent>
        <Icon name="lock" size={22} color="#ffc700" />
        <InputField 
        refInput={confirmPasswordRef}
          keyType="next"
          name="confirmPassword"
          
          onSubmit={() => phoneRef.current?.focus()}
        />
      </FieldContent>
      <FieldsTitle>
        Seu Telefone
      </FieldsTitle>
      <FieldContent>
        <Icon name="call" size={22} color="#ffc700" />
        <InputField 
        refInput={phoneRef}
        keyBoardStyle="phone-pad"
          keyType="send"
          name="phone"
          onSubmit={handleSubmit} />
      </FieldContent>
      </Form>
      <TouchableOpacity onPress={()=>formRef.current.submitForm()}>
        <SaveButton >
          <SaveButtonText>
            CADASTRAR
          </SaveButtonText>
        </SaveButton>
      </TouchableOpacity>
    </FieldsContainer>
  </Container>)
}

export default Signup;