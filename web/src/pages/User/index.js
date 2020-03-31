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
import {
  saveRequest,
  loadSuccess,
  deleteRequest,
} from '~/store/modules/user/actions';
import Modal from '~/components/Modal';
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
    name: 'store.name',
    label: 'Loja',
  },
  {
    name: 'email',
    label: 'E-mail',
  },
  {
    name: 'admin',
    label: 'Administrador',
  },
];

export default function Users() {
  const formRef = useRef(null);
  const stores = useSelector(state => state.store.stores);
  const isUserAdmin = useSelector(state => state.user.isAdmin);
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [userId, setUser] = useState(null);
  const [storeData, setStoreData] = useState();
  const user = useSelector(state => state.user);
  const { users } = user;
  const dispatch = useDispatch();

  async function handleSubmit(formData) {
    try {
      let data = null;
      if (user.systemAdmin) {
        data = formData;
      } else {
        data = { ...formData, storeId: user.store.id };
      }
      const schema = Yup.object().shape({
        storeId: Yup.string().required('Selecione uma loja'),
        name: Yup.string(6, '6 carecteres').required(
          'Nome deve ser informado - 6 chars'
        ),
        email: Yup.string()
          .email('Informar um e-mail válido')
          .required('Informar um e-mail'),
        id: Yup.string(),
        password: Yup.string(6).when('id', (id, field) =>
          !id ? field.required('Senha é obrigatória') : field
        ),
        passwordConfirm: Yup.string(6).when('password', (password, field) =>
          password ? field.required('Confirmação de senha obrigatória') : field
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      if (!data.id && data.password !== data.passwordConfirm) {
        formRef.current.setErrors({
          passwordConfirm: 'Senha de confirmação diferente',
        });
      } else {
        dispatch(saveRequest({ ...data, isUserAdmin }));
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

  const rowDelete = (rowsDeleted, data) => {
    const { index } = rowsDeleted.data[0];
    const selectedUser = users[index];
    setUser(selectedUser);
    setOpen(true);
    return false;
  };
  const handleConfirmDelete = () => {
    dispatch(deleteRequest(userId));
    formRef.current.reset();
    setOpen(false);
  };
  const handleRowSelect = (currentRowsSelected, allRowsSelected) => {
    const { index } = currentRowsSelected[0];
    const selectedUser = users[index];
    if (allRowsSelected.length > 0) {
      formRef.current.setData({
        ...selectedUser,
        avatarUrl: selectedUser.useravatar ? selectedUser.useravatar.url : null,
        avatarId: selectedUser.useravatar ? selectedUser.useravatar.id : null,
      });
      setUpdate(true);

      setStoreData({
        value: selectedUser.store.id,
        label: selectedUser.store.name,
      });
    } else {
      setUpdate(false);
      formRef.current.reset();
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      let response = null;
      if (!user.store) {
        response = await api.get('/users');
      } else {
        response = await api.get(`/users/${user.store.id}`);
      }

      dispatch(loadSuccess(response.data));
    };
    getUsers();
  }, [dispatch, user.store]);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <ContainerColumn>
          <Avatar name="avatarUrl" />
          <Input name="avatarId" hidden />
          {user.systemAdmin && (
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
          )}

          <div>
            <Input name="id" type="number" hidden />
            <div>
              <label htmlFor="name">Nome</label>
              <Input name="name" placeholder="Nome do usuario" type="text" />
            </div>
            <div>
              <label htmlFor="email">E-mail</label>
              <Input name="email" placeholder="E-mail" />
            </div>
            <div>
              <label htmlFor="password">
                {update ? 'Senha antiga' : 'Senha'}
              </label>
              <Input name="password" placeholder="Senha" type="password" />
            </div>
            <div>
              <label htmlFor="passwordConfirm">
                {update ? 'Nova senha' : 'Confirmação de Senha'}
              </label>
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
            handleRowDelete={rowDelete}
          />
          <ButtonDiv>
            <Button buttonType="submit" type="submit" saveButton>
              Salvar
            </Button>
          </ButtonDiv>
        </ContainerColumn>
      </Form>
      <Modal
        message="Deseja excluir este usuário?"
        open={open}
        handleClose={() => setOpen(false)}
        dialog
        handleConfirm={handleConfirmDelete}
      />
    </Container>
  );
}
