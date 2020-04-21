import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '~/components/Input';
import InputNumber from '~/components/InputNumber';
import Button from '~/components/Button';
import Select from '~/components/Select';

export default function Customer() {
  const addresses = useSelector(state => state.client.Address);

  return (
    <>
      <Input name="id" hidden />
      <Input name="storeId" hidden />
      <div>
        <div>
          <Input name="name" label="Nome" />
        </div>
        <div>
          <Input name="email" label="E-mail" />
        </div>
        <div>
          <InputNumber
            name="phone"
            label="Telefone"
            type="tel"
            format="(##)#####-##-##"
            mask="_"
          />
        </div>

        <Button buttonType="submit">Salvar</Button>
      </div>
    </>
  );
}
