import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Switch from '~/components/Switch';
import Grid from '~/components/Grid';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { saveRequest, deleteRequest } from '~/store/modules/subitems/actions';
import InputNumber from '~/components/InputNumber';
import Modal from '~/components/Modal';

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
    name: 'detail',
    label: 'Detalhe',
  },
  {
    name: 'mandatory',
    label: 'Obrigatório',
  },
  {
    name: 'min',
    label: 'Minimo',
  },
  {
    name: 'max',
    label: 'Máximo',
  },
  {
    name: 'price',
    label: 'Preço',
  },
];

export default function SubProducts() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const formSubItemRef = useRef(null);
  const user = useSelector(state => state.user);
  const [subItems, setSubItems] = useState();
  const product = useSelector(state => state.product);
  const [subItemId, setSubItemId] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      formSubItemRef.current.setData(product);
    }, 50);
    setSubItems(product.SubItems);
  }, [product]);

  const handleSubmiteSubItem = async data => {
    try {
      if (data.SubItem.name === '') {
        toast.error('Nome do sub item obrigatório!');
      } else {
        dispatch(saveRequest({ ...data, productId: data.id }));
      }
    } catch (err) {
      const validationErros = {};
      const { response } = err;
      if (response) {
        const { error } = response.data;
        if (error.includes('already')) {
          toast.error('Complemento com este nome já existe');
        } else {
          toast.error(error);
        }
      } else if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErros[error.path] = error.message;
        });
        formSubItemRef.current.setErrors(validationErros);
      } else {
        toast.error('Ocorreu um erro no servidor, tenta mais tarde');
        toast.error(err);
      }
    }
  };

  const rowDelete = (rowsDeleted, data) => {
    const { index } = rowsDeleted.data[0];
    const selectedSubItem = subItems[index];

    setSubItemId({ ...selectedSubItem, storeId: user.store.id });
    setOpen(true);
    return false;
  };
  const handleConfirmDelete = () => {
    dispatch(deleteRequest(subItemId));
    formSubItemRef.current.reset();
    setOpen(false);
  };
  const handleRowSelect = (currentRowsSelected, allRowsSelected) => {
    const { index } = currentRowsSelected[0];
    const selectedSubItem = subItems[index];
    if (allRowsSelected.length > 0) {
      formSubItemRef.current.setData({
        SubItem: {
          ...selectedSubItem,
        },
      });
    } else {
      formSubItemRef.current.reset();
    }
  };
  return (
    <Form ref={formSubItemRef} id="productForm" onSubmit={handleSubmiteSubItem}>
      <Input hidden name="id" />
      <Input hidden name="storeId" />
      <div>
        <Input name="SubItem.id" hidden />
      </div>
      <div>
        <div>
          <Input width="310px" name="SubItem.name" label="Nome" />
        </div>
        <div>
          <Input width="320px" name="SubItem.detail" label="Detalhe" />
        </div>
        <div>
          <Input
            width="80px"
            name="SubItem.ProductsItems.min"
            label="Minimo"
            type="number"
          />
        </div>
        <div>
          <Input
            width="80px"
            name="SubItem.ProductsItems.max"
            label="Máximo"
            type="number"
          />
        </div>
        <div>
          <InputNumber
            width="120px"
            name="SubItem.price"
            label="Preço"
            decimalSeparator=","
            decimalScale={2}
            allowNegative={false}
            prefix="R$"
            fixedDecimalScale
          />
        </div>
        <div>
          <Input
            name="SubItem.quantity"
            label="Quantidade em estoque"
            type="number"
          />
        </div>
        <div>
          <Switch name="SubItem.active" label="Ativar?" />
        </div>
        <div>
          <Switch
            name="SubItem.ProductsItems.mandatory"
            label="Obrigatório ?"
          />
        </div>
        <div>
          <Button width="100px" buttonType="submit">
            Salvar
          </Button>
        </div>
      </div>

      <Grid
        data={subItems}
        columns={columns}
        handleRowSelect={handleRowSelect}
        handleRowDelete={rowDelete}
      />
      <Modal
        message="Deseja excluir este complemento?"
        open={open}
        handleClose={() => setOpen(false)}
        dialog
        handleConfirm={handleConfirmDelete}
      />
    </Form>
  );
}
