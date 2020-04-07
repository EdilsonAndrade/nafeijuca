import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import Select from '~/components/Select';
import Switch from '~/components/Switch';
import {
  ModalContainer,
  ModalContent,
  HeaderContainer,
  BodyContent,
} from './styles';

import Button from '~/components/Button';
import Input from '~/components/Input';
import * as ProductGroupActions from '~/store/modules/productGroup/actions';
import api from '~/services/api';
import InputMask from '~/components/InputMask';

export default function ProductModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const formGroupRef = useRef(null);
  const formRefProduct = useRef(null);
  const user = useSelector(state => state.user);
  const [productGroupData, setProductGroupData] = useState();
  const productGroups = useSelector(state => state.productGroup.productGroups);

  const handleSubmitProduct = async data => {
    console.log(data);
  };
  const handleSubmitGroup = async data => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Grupo deve ser informado'),
        quantityTotal: Yup.string().required(
          'Quantidade total deve ser informada'
        ),
        discount: Yup.string().required,
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(ProductGroupActions.saveRequest(data));
    } catch (err) {
      const validationErros = {};
      const { response } = err;
      if (response) {
        const { error } = response.data;
        if (error.includes('already')) {
          toast.error('Grupo com este nome já existe');
        } else {
          toast.error(error);
        }
      } else if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErros[error.path] = error.message;
        });
        formGroupRef.current.setErrors(validationErros);
      } else {
        toast.error('Ocorreu um erro no servidor, tenta mais tarde');
        toast.error(err);
      }
    }
  };

  const filterProductGroups = inputValue => {
    const data = productGroups.map(d => ({
      value: d.id,
      label: d.name,
    }));
    return data.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadProductGroups = async inputValue => {
    if (inputValue) {
      return filterProductGroups(inputValue);
    }

    const response = await api.get(`/stores/${user.store.id}/productgroups`);

    dispatch(ProductGroupActions.loadSuccess(response.data));
    const dataSt = response.data.map(d => ({
      value: d.id,
      label: d.name,
    }));

    return new Promise(resolve => {
      resolve(dataSt);
    });
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
            marginTop="-16px"
            position="relative"
            left="12px;"
            handleClick={handleClose}
          >
            X
          </Button>
        </HeaderContainer>
        <BodyContent>
          <Form ref={formGroupRef} onSubmit={handleSubmitGroup}>
            <div className="titleCenter">
              <strong>Defina o nome do grupo ou selecione da lista</strong>
            </div>
            <div>
              <div>
                <Input name="name" label="Grupo" />
              </div>
              <div>
                <Input name="storeId" hidden value={user.store.id} />
              </div>
              <div>
                <Input name="description" label="Descrição" />
              </div>

              <div>
                <Input
                  name="discount"
                  type="number"
                  label="Desconto no grupo"
                />
              </div>
              <div>
                <Input
                  name="quantityTotal"
                  type="number"
                  label="Quantidade total no grupo"
                />
              </div>
              <div>
                <Switch name="star" label="Destaque ?" />
              </div>
              <div>
                <Switch
                  name="considerQuantity"
                  label="Considerar total de quantidade ?"
                />
              </div>
              <div>
                <Button width="220px" buttonType="submit">
                  Salvar grupo
                </Button>
              </div>
            </div>
          </Form>
          <hr />

          <Form ref={formRefProduct} onSubmit={handleSubmitProduct}>
            <div className="titleCenter">
              <strong>Selecione o grupo na lista e crie um produto</strong>
            </div>
            <span>
              <Select
                name="productGroupId"
                label="Lista de Grupos "
                loadOptions={loadProductGroups}
                cacheOptions
                defaultOptions
                value={productGroupData}
                onChange={e => setProductGroupData(e)}
              />
            </span>
            <div>
              <div>
                <Input name="name" label="Produto" />
              </div>
              <div>
                <Input name="description" label="Detalhe" />
              </div>
              <div>
                <Input
                  name="equivalentAmount"
                  label="Equivale a qual quantidade"
                  type="number"
                />
              </div>
              <div>
                <InputMask name="price" mask="99.99" label="Produto" />
              </div>
              <div>
                <InputMask
                  name="promotionPrice"
                  mask="99.99"
                  label="Preço promocional"
                />
              </div>
              <div>
                <Input
                  name="quantity"
                  label="Quantidade em estoque"
                  type="number"
                />
              </div>
              <div>
                <Switch name="active" label="Ativar?" />
              </div>
            </div>
            <hr />
            <div className="titleCenter">
              <strong>
                Escolha os dias da semana para ter o produto ativo
              </strong>
            </div>
            <div className="weekDays">
              <div>
                <Switch name="monday" label="Segunda" />
              </div>
              <div>
                <Switch name="tuesday" label="Terça" />
              </div>

              <div>
                <Switch name="wednesday" label="Quarta" />
              </div>

              <div>
                <Switch name="thursday" label="Quinta" />
              </div>

              <div>
                <Switch name="friday" label="Sexta" />
              </div>

              <div>
                <Switch name="saturday" label="Sábado" />
              </div>

              <div>
                <Switch name="sunday" label="Domingo" />
              </div>
              <div>
                <Button width="200px" buttonType="submit">
                  Salvar produto
                </Button>
              </div>
            </div>
          </Form>
        </BodyContent>
      </ModalContent>
    </ModalContainer>
  );
}

ProductModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
