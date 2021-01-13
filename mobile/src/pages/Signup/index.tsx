import React, { useRef, useState } from 'react';
import { Form } from '@unform/mobile';
import { useSelector, useDispatch } from 'react-redux';
import { SubmitHandler, FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import {
  Container, Logo, Title, FieldsContainer} from './styles';
import { Platform, TextInput } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Yup from 'yup';
import handleErrors from '../../utils/handleErrors';
import api from '../../services/api';

interface ISignup {
  email: string;
  name: string;
  password: string;
  phone: string;

}
const Signup: React.FC = () => {

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const store = useSelector((state)=>state.store);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleSubmit: SubmitHandler<ISignup> =async (data) => {
    try {

      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        email: Yup.string().required("E-mail é obrigatório").email("Informe um e-mail no formato correto"),
        name: Yup.string().required("Nome é obrigatório"),
        password: Yup.string().required("Senha deve ser informada")
      });

      await schema.validate(data, {
        abortEarly: false
      })

      setLoading(true);
      await api.post('/users',{
        ...data,
        storeId: store.id
      })

      navigation.navigate('Login',{
        newUser:true
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        formRef.current?.setErrors(handleErrors(err));
        return;
      }
      const {error} = err.response.data;
      if(error.includes("User already exists")){
        formRef.current?.setErrors({email:"E-mail já cadastrado"})
      }
    }
    setLoading(false);
  }
  return (<Container
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
  >
    <Title>
      Crie Sua Conta!
    </Title>
    <FieldsContainer

    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          icon="person-outline"
          iconColor="#ffc700"
          title="Nome"
          name="name"
          keyType="next"
          onSubmit={() => emailRef.current?.focus()} />
        <Input
          icon="mail-outline"
          iconColor="#ffc700"
          title="Seu email"
          keyType="next"
          name="email"
          refInput={emailRef}
          keyBoardStyle="email-address"
          onSubmit={() => passwordRef.current?.focus()} />
        <Input
          icon="lock-outline"
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
      <Button
      text="CADASTRAR"
      action={() => formRef.current.submitForm()}
      loading={loading}
      />
    </FieldsContainer>
  </Container>)
}

export default Signup;