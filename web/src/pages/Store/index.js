import React, { useEffect, useState, useRef } from 'react';
import { Form } from '@unform/web';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Switch from '@material-ui/core/Switch';
import Input from '~/components/Input';
import Button from '~/components/Button';
import * as StoreActions from '~/store/modules/store/actions';
import api from '~/services/api';
import Avatar from '~/components/AvatarInput';
import Grid from '~/components/Grid';
import {
  Container,
  InputName,
  InputAddress,
  InputAddressLineTwo,
  InputZipCode,
  InputCnpj,
  ContainerColumn,
  ButtonDiv,
} from './styles';

const columns = [
  {
    name: 'id',
    label: 'Id',
  },
  {
    name: 'name',
    label: 'Loja',
  },
  {
    name: 'address',
    label: 'Endereço',
  },
  {
    name: 'zipcode',
    label: 'Cep',
  },
  {
    name: 'active',
    label: 'Ativa',
    options: {
      customBodyRender: (value, tableMeta, updateValue) => (
        <Switch checked={value} />
      ),
    },
  },
  {
    name: 'latitude',
    label: 'Latitude',
  },
  {
    name: 'longitude',
    label: 'Longitude',
  },
];
export default function Store() {
  const [stores, setStores] = useState([]);
  const formRef = useRef();
  const dispatch = useDispatch();
  const [storeData, setStoreData] = useState();

  const getAllStores = async () => {
    const response = await api.get('/stores');
    setStores(response.data);
  };
  useEffect(() => {
    getAllStores();
  }, []);

  const handleSubmit = async data => {
    try {
      const { id } = data;
      console.log(JSON.stringify(data));
      // if (id) {
      //   const response = await api.put(`/stores/${data.id}`, data);
      //   dispatch(StoreActions.saveSuccess(response.data));
      //   toast.warn('Loja alterada com sucesso');
      // } else {
      //   const response = await api.post('/stores', data);
      //   dispatch(StoreActions.saveSuccess(response.data));
      //   toast.success('Loja criada com sucesso');
      // }
      // getAllStores();
    } catch ({ response }) {
      const { error } = response.data;
      if (error) {
        toast.error(error);
      } else {
        toast.error('Ocorreu um erro no servidor, tenta mais tarde');
      }
    }
  };
  const rowDelete = (rowsDeleted, data) => {
    const { index } = rowsDeleted.data[0];
    const selectedStore = stores[index];
    // setUser(selectedStore);
    // setOpen(true);
    return false;
  };
  const handleConfirmDelete = () => {
    //  dispatch(deleteRequest(userId));
    // formRef.current.reset();
    // setOpen(false);
  };
  const handleRowSelect = (currentRowsSelected, allRowsSelected) => {
    const { index } = currentRowsSelected[0];
    const selectedStore = stores[index];
    if (allRowsSelected.length > 0) {
      formRef.current.setData(selectedStore);

      setStoreData({
        value: selectedStore.id,
        label: selectedStore.name,
      });
    } else {
      formRef.current.reset();
    }
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Input name="id" type="number" hidden />
        <ContainerColumn>
          <Avatar name="avatar" />
          <div>
            <div>
              <label htmlFor="name">Nome</label>
              <InputName name="name" placeholder="Nome da loja" type="text" />
            </div>
            <div>
              <label htmlFor="address">Endereço</label>
              <InputAddress name="address" placeholder="Endereço" type="text" />
            </div>
            <div>
              <label htmlFor="number">Número</label>
              <Input
                name="number"
                placeholder="Preencha com o número"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="addressLineTwo">Complemento</label>
              <InputAddressLineTwo
                name="addressLineTwo"
                type="text"
                placeholder="Preencha com complemento"
              />
            </div>
          </div>
        </ContainerColumn>
        <ContainerColumn>
          <div>
            <div>
              <label htmlFor="neighborhood">Bairro</label>
              <Input
                name="neighborhood"
                placeholder="Preencha com o bairro"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="zipCode">Cep</label>
              <InputZipCode
                name="zipcode"
                mask="99999-999"
                alwaysShowMask={false}
                placeholder="Preencha o cep"
              />
            </div>
            <div>
              <label htmlFor="cnpj">CNPJ</label>
              <InputCnpj
                name="cnpj"
                mask="99.999.999/9999-99"
                placeholder="Preencha com o cnpj"
              />
            </div>
            <div>
              <label htmlFor="city">Cidade</label>
              <Input name="city" placeholder="Preencha com a cidade" />
            </div>
            <div>
              <Switch name="active" label="Ativa" />
            </div>
            <ButtonDiv>
              <Button type="submit" saveButton>
                Salvar
              </Button>
            </ButtonDiv>
          </div>
        </ContainerColumn>
      </Form>
      <Grid
        data={stores}
        columns={columns}
        handleRowSelect={handleRowSelect}
        handleRowDelete={rowDelete}
        rowsPerPage={2}
      />
    </Container>
  );
}
