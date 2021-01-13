import React, { useRef, useState } from 'react';
import { Container, AvatarContainer, CameraIcon, Avatar, FieldContents, PasswordContent } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/Input';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import handleErrors from '../../utils/handleErrors';
import { TextInput } from 'react-native';
import api from '../../services/api';
import { setUser } from '../../store/modules/user/actions';
import { useNavigation } from '@react-navigation/native';
import FakeAvatar from '../../assets/avatar.png';

interface IProfile {
  name: string;
  email: string;
  oldPassword: string;
  password: string;
}

export default function Profile() {
  const oldPasswordref = useRef<TextInput>();
  const emailRef = useRef<TextInput>();
  const passwordRef = useRef<TextInput>();
  const confirmPasswordRef = useRef<TextInput>();
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleChangeProfile = async (data: IProfile) => {
    formRef?.current?.setErrors({});
    const schema = Yup.object().shape({
      email: Yup.string().required("E-mail é obrigatório").email("Digite um e-mail válido"),
      oldPassword: Yup.string(),
      password: Yup.string().when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
    });
    try {
      await schema.validate(data, {
        abortEarly: false
      })
      setLoading(true);
      const response = await api.put(`/users/${user.id}`, {
        ...data
      });

      dispatch(setUser(response.data));
      navigation.navigate('Profile')
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
      }
    }
  }

  return (
    <Container>

      <FieldContents>
        <Form ref={formRef} initialData={user} onSubmit={handleChangeProfile}>
          <AvatarContainer>
            <Avatar source={user.avatar ? { uri: user.avatar.url } : FakeAvatar} />
            <CameraIcon name="photo-camera" size={52} color="#ffc700" />
          </AvatarContainer>
          <Input
            icon="person-outline"
            iconColor="#ffc700"
            keyType="next"
            name="name"
            onSubmit={() => emailRef.current?.focus()}
            title="Nome"
          />
          <Input
            icon="mail-outline"
            iconColor="#ffc700"
            keyType="next"
            title="Seu e-mail"
            name="email"
            onSubmit={() => oldPasswordref.current?.focus()}
          />

          <PasswordContent>
            <Input
              icon="lock-outline"
              iconColor="#ffc700"
              keyType="next"
              title="Senha atual"
              name="oldPassword"
              isPassword={true}
              onSubmit={() => passwordRef.current?.focus()}
            />
            <Input
              icon="lock-outline"
              iconColor="#ffc700"
              keyType="next"
              title="Senha atual"
              name="password"
              isPassword={true}
              onSubmit={() => confirmPasswordRef.current?.focus()}
            />
            <Input
              icon="lock-outline"
              iconColor="#ffc700"
              keyType="send"
              title="Confirmar senha"
              name="confirmPassword"
              isPassword={true}
              onSubmit={() => formRef?.current?.submitForm()}
            />
          </PasswordContent>
        </Form>
      </FieldContents>

    </Container>
  );
}
