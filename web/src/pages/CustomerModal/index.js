import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {
  ModalContainer,
  ModalContent,
  HeaderContainer,
  BodyContent,
} from './styles';

import Button from '~/components/Button';
import Customer from './Customer';
import Address from './Address';
import CustomersGrid from './CustomersGrid';
import {
  saveRequest,
  loadRequest,
  editSuccess,
} from '~/store/modules/client/actions';

export default function CustomerModal({ open, handleClose }) {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const clients = useSelector(state => state.client.clients);
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (user.store) {
      dispatch(loadRequest(user.store.id));
    }
  }, [dispatch, user.store]);

  const handleSaveClient = async data => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(6, '6 carecteres').required(
          'Nome deve ser informado - 6 chars'
        ),
        email: Yup.string()
          .email('Informar um e-mail válido')
          .required('Informar um e-mail'),
        phone: Yup.string().required('Informe um número de telefone'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (
        !data.Address.address ||
        !data.Address.number ||
        !data.Address.addressLineTwo
      ) {
        toast.error('Preencha todos os campos do endereço');
      } else {
        dispatch(saveRequest({ ...data, storeId: user.store.id }));
      }
    } catch (err) {
      const validationErros = {};
      const { response } = err;
      if (response) {
        const { error } = response.data;
        if (error.includes('already')) {
          toast.error('Usuário já existe');
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
  };

  const handleRowSelect = (currentRowsSelected, allRowsSelected) => {
    const { dataIndex } = currentRowsSelected[0];
    const selectedClient = clients[dataIndex];
    if (allRowsSelected.length > 0) {
      if (selectedClient.Addresses.length === 1) {
        formRef.current.setData({
          ...selectedClient,
          Address: selectedClient.Addresses
            ? selectedClient.Addresses[0]
            : null,
        });
      } else {
        formRef.current.setData(selectedClient);
      }

      dispatch(
        editSuccess({ ...selectedClient, Address: selectedClient.Addresses })
      );
    }
  };

  return (
    <ModalContainer open={open}>
      <ModalContent>
        <HeaderContainer>
          <Button
            borderRadius="65%"
            width="44px"
            icon="none"
            buttonType="button"
            marginTop="-41px"
            position="relative"
            left="40px;"
            handleClick={handleClose}
          >
            X
          </Button>
        </HeaderContainer>
        <BodyContent>
          <h2>Cadastro de Clientes</h2>
          <Form ref={formRef} onSubmit={handleSaveClient}>
            <Customer formRef={formRef} />
            <Address />
            <CustomersGrid data={clients} handleRowSelect={handleRowSelect} />
          </Form>
        </BodyContent>
      </ModalContent>
    </ModalContainer>
  );
}

CustomerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
