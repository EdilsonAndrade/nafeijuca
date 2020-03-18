import React from 'react';
import { Input, Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import Logo from './styles';
import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('Email é obrigatorio'),
  password: Yup.string().required('A senha é obrigatória'),
});
export default function SignIn() {
  return (
    <>
      <Logo src={logo} alt="NaFeijuca" />
      <Form schema={schema} onSubmit="">
        <Input name="email" type="email" placeholder="Seu melhor e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Seu senha secreta"
        />
        <button type="submit">Acessar</button>
      </Form>
    </>
  );
}
