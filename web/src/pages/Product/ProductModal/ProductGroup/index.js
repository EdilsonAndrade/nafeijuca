import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Switch from '~/components/Switch';
import Button from '~/components/Button';
import Input from '~/components/Input';
import * as ProductGroupActions from '~/store/modules/productGroup/actions';

export default function ProductGroup() {
  const dispatch = useDispatch();
  const formGroupRef = useRef(null);
  const productGroup = useSelector(state => state.productGroup);
  const user = useSelector(state => state.user);
  useEffect(() => {
    if (productGroup && formGroupRef.current !== null) {
      formGroupRef.current.setData(productGroup);
    }
  }, [productGroup]);
  const handleSubmitGroup = async data => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Grupo deve ser informado'),
        quantityTotal: Yup.string().required(
          'Quantidade total deve ser informada'
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      if (data.discount === '') {
        data.discount = null;
      }

      dispatch(
        ProductGroupActions.saveRequest({ ...data, storeId: user.store.id })
      );
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
  return (
    <Form ref={formGroupRef} id="groupForm" onSubmit={handleSubmitGroup}>
      <Input hidden name="id" />
      <div className="titleCenter">
        <strong>Defina o nome do grupo ou selecione da lista</strong>
      </div>
      <div>
        <div>
          <Input name="name" label="Grupo" />
        </div>
        <div>
          <Input name="storeId" hidden />
        </div>
        <div>
          <Input name="description" label="Descrição" />
        </div>

        <div>
          <Input name="discount" type="number" label="Desconto no grupo" />
        </div>
        <div>
          <Input
            name="quantityTotal"
            type="number"
            label="Quantidade total no grupo"
          />
        </div>
        <div>
          <Switch name="active" label="Ativo ?" />
        </div>
        <div>
          <Switch name="star" label="Destaque ?" />
        </div>
        <div>
          <Switch name="considerQuantity" label="Considerar quantidade ?" />
        </div>
        <div>
          <Button width="220px" buttonType="submit">
            Salvar grupo
          </Button>
        </div>
      </div>
    </Form>
  );
}
