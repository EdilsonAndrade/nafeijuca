import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Logo from './styles';
import logo from '~/assets/logo.png';
import Input from '~/components/Input';
import { requestSignin } from '~/store/modules/auth/actions';
import Loading from '~/components/Loading';

export default function SignIn() {
  const loading = useSelector(state => state.load.loading);

  const dispatch = useDispatch();
  const formRef = useRef(null);
  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Insira um e-mail válido')
          .required('Email é obrigatorio'),
        password: Yup.string().required('A senha é obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(requestSignin(data));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors = {};
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach(error => {
            validationErrors[error.path] = error.message;
          });
          formRef.current.setErrors(validationErrors);
        }
      }
    }
  }

  return (
    <>
      <Logo src={logo} alt="NaFeijuca" />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu melhor e-mail" />
        <span />
        <Input
          name="password"
          type="password"
          placeholder="Seu senha secreta"
        />
        <span />
        {loading ? <Loading /> : <button type="submit">Acessar</button>}
      </Form>
    </>
  );
}
