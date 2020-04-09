import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Switch from '~/components/Switch';

import Button from '~/components/Button';
import Input from '~/components/Input';
import * as ProductGroupActions from '~/store/modules/productGroup/actions';
import { saveRequest } from '~/store/modules/product/actions';
import api from '~/services/api';
import InputNumber from '~/components/InputNumber';

export default function SubProducts() {
  const dispatch = useDispatch();
  const formRefProduct = useRef(null);
  const user = useSelector(state => state.user);

  const product = useSelector(state => state.product);

  useEffect(() => {
    setTimeout(() => {
      if (product.Store && formRefProduct.current) {
        formRefProduct.current.setData(product);
      }
    }, 50);
  }, [product]);

  const handleSubmitProduct = async data => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Produto obrigatório'),
        description: Yup.string().required('Descrição obrigatória'),
        equivalentAmount: Yup.string().required(
          'Total equivalente obrigatório'
        ),
        price: Yup.string().required('Preço obrigatório'),
        quantity: Yup.string().required('Quantidade obrigatório'),
        pgId: Yup.string().required('Grupo é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      if (data.promotionPrice === '') {
        data.promotionPrice = null;
      }
      dispatch(saveRequest({ ...data, productGroupId: data.pgId }));
    } catch (err) {
      const validationErros = {};
      const { response } = err;
      if (response) {
        const { error } = response.data;
        if (error.includes('already')) {
          toast.error('Produto com este nome já existe');
        } else {
          toast.error(error);
        }
      } else if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErros[error.path] = error.message;
        });
        formRefProduct.current.setErrors(validationErros);
      } else {
        toast.error('Ocorreu um erro no servidor, tenta mais tarde');
        toast.error(err);
      }
    }
  };

  return (
    <Form ref={formRefProduct} id="productForm" onSubmit={handleSubmitProduct}>
      <Input hidden name="id" />
      <div>
        <Input name="storeId" hidden value={user.store.id} />
      </div>
      <div>
        <div>
          <Input name="name" label="Nome" />
        </div>
        <div>
          <Input name="description" label="Detalhe" />
        </div>
        <div>
          <Input name="min" label="Minimo" type="number" />
        </div>
        <div>
          <Input name="max" label="Máximo" type="number" />
        </div>
        <div>
          <InputNumber
            name="price"
            label="Preço"
            decimalSeparator=","
            decimalScale={2}
            allowNegative={false}
            prefix="R$"
            fixedDecimalScale
          />
        </div>
        <div>
          <Input name="quantity" label="Quantidade em estoque" type="number" />
        </div>
        <div>
          <Switch name="active" label="Ativar?" />
        </div>
      </div>
    </Form>
  );
}
