import React, { useRef, useState } from 'react';
import { Container, Title, FieldContents, ButtonContent, ButtonText, ForgotPasswordContainer, Line, ForgotPassworText } from './styles';
import { useDispatch } from 'react-redux';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import handleErrors from '../../utils/handleErrors';
import { TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import api from '../../services/api';
import { setUser } from '../../store/modules/user/actions';
import { useNavigation } from '@react-navigation/native';

interface ILogin {
  email: string;
  password: string;

}

export default function Login() {
  const passwordRef = useRef<TextInput>();
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

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
      
      dispatch(setUser(response.data));
      navigation.navigate('Home')
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
      }else if(error.includes("Password does not match")) {
        formRef?.current?.setErrors({ email: "Usuário ou senha invalido!" });
      }else{
        formRef?.current?.setErrors({ email: error});
      }
    }
  }

  return (
    <Container>
      <Title>Faça login para continuar</Title>
      <FieldContents>
        <Form ref={formRef} onSubmit={handleLogin}>

          <Input
            icon="email"
            iconColor="#ffc700"
            keyType="next"
            title="Seu e-mail"
            name="email"
            onSubmit={() => passwordRef.current?.focus()}
          />

          <Input
            icon="lock"
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
        <ForgotPasswordContainer>
          <Line />
          <TouchableOpacity onPress={()=>navigation.navigate("ForgotPassword")}>
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
