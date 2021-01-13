import React, { useRef, useState } from 'react';
import { Container, Title, FieldContent } from './styles';
import { FormHandles } from "@unform/core";
import { Form } from '@unform/mobile';
import Input from '../../components/Input';

import Button from '../../components/Button';
import handleErrors from '../../utils/handleErrors';
import api from '../../services/api';
import * as Yup from 'yup';

interface IResendEmail {
  email: string;
}
const ResendEmail: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState('');

  const handleSendEmail = async (data: IResendEmail) => {
    setEmailSent("");
    formRef?.current?.setErrors({});
    const schema = Yup.object().shape({
      email: Yup.string().required("E-mail é obrigatório").email("Digite um e-mail válido"),
    });

    try {
      await schema.validate(data, {
        abortEarly: false
      })


      setLoading(true);
      await api.put('/confirmation', {
        ...data
      });

  setEmailSent("E-mail foi enviado para sua conta verifique e clique no link e depois faça login")
      setLoading(false);

    } catch (err) {
      setLoading(false);
      if (err instanceof Yup.ValidationError) {
        formRef?.current?.setErrors(handleErrors(err));
        return;
      }
      const { error } = err.response.data;
      if (error.includes("User not found")) {
        formRef?.current?.setErrors({ email: "Usuário não encontrado" });
      } else {
        formRef?.current?.setErrors({ email: error });
      }
      setEmailSent("");

    }
  }

  return (
    <Container>
      <Title>
        Enviaremos no seu e-mail o link para desbloquear sua conta!
      </Title>
      <FieldContent>
        <Form ref={formRef} onSubmit={handleSendEmail}>
          <Input
            keyType="send"
            icon="mail-outline"
            iconColor="#ffc700"
            name="email"
            title="Seu e-mail"
            onSubmit={() => formRef.current?.submitForm()} />


        </Form>
      
      <Button
        loading={loading}
        action={() => formRef.current?.submitForm()}
        text="REENVIAR E-MAIL DE CONFIRMARÇÃO"
      />
      </FieldContent>
      <Title>
        {emailSent}
      </Title>
    </Container>
  )
}

export default ResendEmail;