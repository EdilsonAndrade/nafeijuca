import React, { useRef, useState } from 'react';
import { Container, Title, FieldContents, NewUserTag, ForgotPasswordContainer, Line, ForgotPassworText, LineSendEmail } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import handleErrors from '../../utils/handleErrors';
import { TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import api from '../../services/api';
import { loginRequest } from '../../store/modules/user/actions';
import { useNavigation } from '@react-navigation/native';

interface ILogin {
  email: string;
  password: string;

}

export default function Login({ route }) {
  const passwordRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [emailConfirmed, setEmailConfirmed] = useState(true);
  const navigation = useNavigation();
  const newUser = route.params?.newUser;
  const expired = route.params?.expired;
  const dispatch = useDispatch();



  const handleLogin = async (data: ILogin) => {
    formRef?.current?.setErrors({});
    const schema = Yup.object().shape({
      email: Yup.string().required("E-mail é obrigatório").email("Digite um e-mail válido"),
      password: Yup.string().required("Senha é obrigatória")
    });

    try {
      await schema.validate(data, {
        abortEarly: false
      })


      setLoading(true);
      const response = await api.post('/sessions', {
        ...data
      });

      if (response.data.user.confirmed === undefined || !response.data.user.confirmed) {
        formRef?.current?.setErrors({ email: 'Email ainda não confirmado, acesse seu e-mail e confirme clicando no link' });
        setEmailConfirmed(false);
        setLoading(false);
        return;
      }
      setEmailConfirmed(true);
      dispatch(loginRequest(response.data));
      navigation.navigate('Order');
      setLoading(false);

    } catch (err) {
      setLoading(false);
      if (err instanceof Yup.ValidationError) {
        formRef?.current?.setErrors(handleErrors(err));
        return;
      }
      const { error } = err.response.data;
      if (error.includes("User does not exist")) {
        formRef?.current?.setErrors({ email: "Usuário ou senha invalido!" });
      } else if (error.includes("Password does not match")) {
        formRef?.current?.setErrors({ email: "Usuário ou senha invalido!" });
      } else {
        formRef?.current?.setErrors({ email: error });
      }
    }
  }

  return (
    <Container>
      <Title>Faça login para continuar</Title>
      {newUser ?
        <NewUserTag>
          Parabéns, enviamos um link para seu email, é necessário clicar nele para confirmar.
          Após isto, efetue login.
      </NewUserTag>
        : null}
      {expired ?
        <NewUserTag>
          Seu acesso expirou, é necessário se logar novamente.
    </NewUserTag>
        : null}
      <FieldContents>
        <Form ref={formRef} onSubmit={handleLogin}>

          <Input
            icon="email"
            iconColor="#ffc700"
            keyType="next"
            title="Seu e-mail"
            name="email"
            onSubmit={() => passwordRef?.current?.focus()}
          />

          <Input
            icon="lock"
            refInput={passwordRef}
            iconColor="#ffc700"
            keyType="send"
            title="Sua senha"
            name="password"
            isPassword={true}
            onSubmit={() => formRef?.current?.submitForm()}
          />
          <Button
            action={() => formRef?.current?.submitForm()}
            text="ENTRAR"
            loading={loading}
          />
        </Form>
        {!emailConfirmed ?
          <ForgotPasswordContainer>
            <LineSendEmail />
            <TouchableOpacity onPress={() => navigation.navigate("ResendEmail")}>
              <ForgotPassworText>
                Reenviar e-mail
        </ForgotPassworText>
            </TouchableOpacity>
            <LineSendEmail />
          </ForgotPasswordContainer>

          :

          null}


        <ForgotPasswordContainer>
          <Line />
          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
            <ForgotPassworText>
              Esqueci minha senha
          </ForgotPassworText>
          </TouchableOpacity>
          <Line />
        </ForgotPasswordContainer>
      </FieldContents>

    </Container>
  );
}
