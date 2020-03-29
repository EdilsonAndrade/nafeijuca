import React, { useState, useRef, useEffect } from 'react';

import { Form } from '@unform/web';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Grid from '~/components/Grid';
import SwitchButton from '~/components/Switch';
import Input from '~/components/Input';
import Button from '~/components/Button';
import api from '~/services/api';
import Avatar from '~/components/AvatarInput';
import Select from '~/components/Select';
import { Container, ContainerColumn, ButtonDiv } from './styles';
import { saveSuccess, loadSuccess } from '~/store/modules/user/actions';
import * as StoreActions from '~/store/modules/store/actions';

const columns = [
  {
    name: 'id',
    label: 'Id',
  },
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'email',
    label: 'E-mail',
  },
  {
    name: 'admin',
    label: 'IsAdmin',
  },
];

export default function Users() {
  const formRef = useRef(null);
  const stores = useSelector(state => state.store.stores);

  const [storeData, setStoreData] = useState();
  const users = useSelector(state => state.user.users);
  const dispatch = useDispatch();
  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        storeId: Yup.string().required('Selecione uma loja'),
        name: Yup.string(6, '6 carecteres').required(
          'Nome deve ser informado - 6 chars'
        ),
        email: Yup.string()
          .email('Informar um e-mail válido')
          .required('Informar um e-mail'),
        password: Yup.string(6).required(
          'Password deve ser informado com 6 caracteres'
        ),
        passwordConfirm: Yup.string(6).required(
          'Confirmação de senha obrigatória'
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      if (data.password !== data.passwordConfirm) {
        formRef.current.setErrors({
          passwordConfirm: 'Senha de confirmação em inconformidade',
        });
      } else {
        const response = await api.post('/users', data);
        toast.success('User criado com sucesso');
        dispatch(saveSuccess(response.data));
        formRef.current.reset();
      }
    } catch (err) {
      const validationErros = {};
      const { response } = err;
      if (response) {
        const { error } = response.data;
        if (error.includes('already')) {
          toast.error('Usuário com este e-mail já existe');
        } else {
          toast.error(error);
        }
      } else if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErros[error.path] = error.message;
        });
        formRef.current.setErrors(validationErros);
      } else {
        toast.error('Ocorreu um erro no servidor, tenta mais tarde');
        toast.error(err);
      }
    }
  }

  const filterStores = inputValue => {
    const data = stores.map(d => ({
      value: d.id,
      label: d.name,
    }));
    return data.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadStores = async inputValue => {
    if (inputValue) {
      return filterStores(inputValue);
    }

    const response = await api.get('/stores');

    dispatch(StoreActions.loadSuccess(response.data));
    const dataSt = response.data.map(d => ({
      value: d.id,
      label: d.name,
    }));

    return new Promise(resolve => {
      resolve(dataSt);
    });
  };

  const handleRowSelect = (currentRowsSelected, allRowsSelected) => {
    const { index } = currentRowsSelected[0];
    const selectedUser = users[index];
    if (allRowsSelected.length > 0) {
      formRef.current.setData({
        ...selectedUser,
        avatarId: selectedUser.useravatar ? selectedUser.useravatar.url : null,
      });
      setStoreData({
        value: selectedUser.store.id,
        label: selectedUser.store.name,
      });
    } else {
      formRef.current.reset();
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const response = await api.get('/users');
      if (response.data) {
        const formatedData = response.data.map(x => ({
          ...x,
          admin: x.isAdmin ? 'Sim' : 'Não',
        }));
        dispatch(loadSuccess(formatedData));
      }
    };
    getUsers();
  }, [dispatch]);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <ContainerColumn>
          <Avatar name="avatarId" />
          <span>
            <Select
              id="storeId"
              label="Loja"
              loadOptions={loadStores}
              cacheOptions
              defaultOptions
              value={storeData}
              onChange={e => setStoreData(e)}
              name="storeId"
            />
          </span>
          <div>
            <div>
              <label htmlFor="name">Nome</label>
              <Input name="name" placeholder="Nome do usuario" type="text" />
            </div>
            <div>
              <label htmlFor="email">E-mail</label>
              <Input name="email" placeholder="E-mail" />
            </div>
            <div>
              <label htmlFor="password">Senha</label>
              <Input name="password" placeholder="Senha" type="password" />
            </div>
            <div>
              <label htmlFor="passwordConfirm">Confirmação de Senha</label>
              <Input
                name="passwordConfirm"
                placeholder="Confirmação de senha"
                type="password"
              />
            </div>
            <div>
              <SwitchButton name="isAdmin" label="Administrador ?" />
            </div>
          </div>
          <Grid
            data={users}
            columns={columns}
            handleRowSelect={handleRowSelect}
          />
          <ButtonDiv>
            <Button buttonType="submit" type="submit" saveButton>
              Salvar
            </Button>
          </ButtonDiv>
        </ContainerColumn>
      </Form>
    </Container>
  );
}
