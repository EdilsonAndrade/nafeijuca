import React from 'react';
import { Form } from '@unform/web';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Input from '~/components/Input';
import Button from '~/components/Button';
import * as StoreActions from '~/store/modules/store/actions';
import api from '~/services/api';
import Avatar from '~/components/AvatarInput';
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

export default function Store() {
  const store = useSelector(state => state.store);
  const dispatch = useDispatch();
  const handleSubmit = async data => {
    try {
      const dataToSend = { ...data, active: true };
      const response = await api.post('/stores', dataToSend);
      toast.success('Loja criada com sucesso');
      dispatch(StoreActions.saveSuccess(response.data));
    } catch ({ response }) {
      const { error } = response.data;
      if (error) {
        toast.error(error);
      } else {
        toast.error('Ocorreu um erro no servidor, tenta mais tarde');
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} initialData={store}>
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
            <ButtonDiv>
              <Button type="submit" saveButton>
                Salvar
              </Button>
            </ButtonDiv>
          </div>
        </ContainerColumn>
      </Form>
    </Container>
  );
}
