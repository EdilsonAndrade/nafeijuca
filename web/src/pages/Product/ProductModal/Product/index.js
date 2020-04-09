import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Select from '~/components/Select';
import Switch from '~/components/Switch';

import Button from '~/components/Button';
import Input from '~/components/Input';
import * as ProductGroupActions from '~/store/modules/productGroup/actions';
import { saveRequest } from '~/store/modules/product/actions';
import api from '~/services/api';
import InputNumber from '~/components/InputNumber';

export default function Product() {
  const dispatch = useDispatch();
  const formRefProduct = useRef(null);
  const user = useSelector(state => state.user);
  const [productGroupData, setProductGroupData] = useState();
  const productGroups = useSelector(state => state.productGroup.productGroups);
  const product = useSelector(state => state.product);

  useEffect(() => {
    setTimeout(() => {
      if (formRefProduct.current) {
        const weekDays = product.weekdaysActive.split(',');
        const weekdaysActiveFormated = weekDays.map(d => {
          return d;
        });
        const [...rest] = weekDays;
        console.log(JSON.stringify({ ...rest }));
        formRefProduct.current.setData({
          ...product,
          weekdaysActive: rest,
        });

        setProductGroupData({
          value: product.Store.id,
          label: product.Store.name,
        });
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
        productGroupId: Yup.string().required('Grupo é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(saveRequest(data));
    } catch (err) {
      console.log(err);
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
    <Form ref={formRefProduct} id="productForm" onSubmit={handleSubmitProduct}>
      <Input hidden name="id" />
      <div className="titleCenter">
        <strong>Selecione o grupo na lista e crie um produto</strong>
      </div>
      <div>
        <Input name="storeId" hidden value={user.store.id} />
      </div>

      <span>
        <Select
          name="pgId"
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
          <InputNumber
            name="promotionPrice"
            label="Preço promocional"
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
      <hr />
      <div className="titleCenter">
        <strong>Escolha os dias da semana para ter o produto ativo</strong>
      </div>
      <div className="weekDays">
        <div>
          <Switch name="weekdaysActive.2" label="Segunda" />
        </div>
        <div>
          <Switch name="weekdaysActive.3" label="Terça" />
        </div>

        <div>
          <Switch name="weekdaysActive.4" label="Quarta" />
        </div>

        <div>
          <Switch name="weekdaysActive.5" label="Quinta" />
        </div>

        <div>
          <Switch name="weekdaysActive.6" label="Sexta" />
        </div>

        <div>
          <Switch name="weekdaysActive.7" label="Sábado" />
        </div>

        <div>
          <Switch name="weekdaysActive.1" label="Domingo" />
        </div>
        <div>
          <Button width="200px" buttonType="submit">
            Salvar produto
          </Button>
        </div>
      </div>
    </Form>
  );
}
