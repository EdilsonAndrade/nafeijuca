import React, { useRef } from 'react';

import NaFeijucaTypography from '../../assets/nafeijucatext.png';
import SignupBackground from '../../assets/signupbackground.png';
import { Form } from '@unform/mobile';
import {SubmitHandler, FormHandles} from '@unform/core';
import {
  Container, Logo, Title, FieldsContainer, FieldsTitle, FieldContent, InputField,
  SaveButton, SaveButtonText
} from './styles';
import { Platform, TextInput, TouchableOpacity } from 'react-native';
import Input from '../../components/Input';

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
       <Input
        icon="person"
        iconColor="#ffc700"
        title="Nome"
        refInput={passwordRef}
        name="name"
          keyType="next"
          onSubmit={() => emailRef.current?.focus()} />
        <Input
         icon="email"
         iconColor="#ffc700"
         title="Seu email"
          keyType="next"
          name="email"
          refInput={emailRef}
          keyBoardStyle="email-address"
          onSubmit={() => passwordRef.current?.focus()} />
        <Input
         icon="lock"
         iconColor="#ffc700"
         title="Sua senha" 
        refInput={passwordRef}
          isPassword={true}
          name="password"
          
          onSubmit={() => phoneRef.current?.focus()}
        />
        <Input
         icon="call"
         iconColor="#ffc700"
         title="Seu telefone" 
        refInput={phoneRef}
        keyBoardStyle="phone-pad"
          keyType="send"
          name="phone"
          onSubmit={handleSubmit} />
      
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