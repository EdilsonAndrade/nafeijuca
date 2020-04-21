import React from 'react';

import Input from '~/components/Input';

export default function Customer() {
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
          <Input name="phone" label="Telefone" />
        </div>
      </div>
    </>
  );
}
