import React from 'react';

import Input from '~/components/Input';

export default function Address() {
  return (
    <>
      <div>
        <div>
          <Input name="Address.name" label="Endereço" />
        </div>
        <div>
          <Input name="Address.number" label="Número" />
        </div>
        <div>
          <Input name="Address.neighborhood" label="Bairro" />
        </div>
        <div>
          <Input name="Address.zipcode" label="Complemento" />
        </div>
      </div>
      <div>
        <div>
          <Input name="Address.latitude" label="Latitude" />
        </div>
        <div>
          <Input name="Address.longitude" label="Longitude" />
        </div>
        <div>
          <Input name="Address.km" label="Distancia da loja em KM" />
        </div>
      </div>
    </>
  );
}
