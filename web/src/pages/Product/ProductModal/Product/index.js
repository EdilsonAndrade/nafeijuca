import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Select from '~/components/Select';
import Switch from '~/components/Switch';
import Modal from '~/components/Modal';
import Button from '~/components/Button';
import Input from '~/components/Input';
import * as ProductGroupActions from '~/store/modules/productGroup/actions';
import { saveRequest, deleteRequest } from '~/store/modules/product/actions';
import api from '~/services/api';
import InputNumber from '~/components/InputNumber';
import { ImageContainer } from './styles';

export default function Product() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const formRefProduct = useRef(null);
  const user = useSelector(state => state.user);
  const [productGroupData, setProductGroupData] = useState();
  const productGroups = useSelector(state => state.productGroup.productGroups);
  const productGroupSelected = useSelector(state => state.productGroup);
  const product = useSelector(state => state.product);

  useEffect(() => {
    setTimeout(() => {
      if (product.Store && formRefProduct.current) {
        formRefProduct.current.setData(product);
        if (product.File) {
          formRefProduct.current.setFieldValue('imageId', {
            id: product.File.id,
            url: product.File.url,
          });
        }

        setProductGroupData({
          value: productGroupSelected.id,
          label: productGroupSelected.name,
        });
      } else {
        formRefProduct.current.setFieldValue('storeId', user.store.id);
      }
    }, 50);
  }, [
    product,
    productGroupSelected.id,
    productGroupSelected.name,
    user.store.id,
  ]);

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

  const handleDeleteProduct = () => {
    setOpen(true);
  };
  const handleConfirmDelete = () => {
    dispatch(deleteRequest(product));
    setOpen(false);
  };
  return (
    <Form ref={formRefProduct} id="productForm" onSubmit={handleSubmitProduct}>
      <Input hidden name="id" />
      <div className="titleCenter">
        <strong>Selecione o grupo na lista e crie um produto</strong>
      </div>
      <div>
        <Input hidden name="storeId" />
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
      <ImageContainer name="imageId" />
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
        {product.id ? (
          <div>
            <Button
              width="200px"
              buttonType="button"
              handleClick={handleDeleteProduct}
            >
              Excluir produto
            </Button>
          </div>
        ) : (
          ''
        )}
      </div>
      <Modal
        message="Deseja excluir este produto?"
        open={open}
        handleClose={() => setOpen(false)}
        dialog
        handleConfirm={handleConfirmDelete}
      />
    </Form>
  );
}
