import React from 'react';
import { Scope } from '@unform/core';

import Input from '~/components/Input';
import InputNumber from '~/components/InputNumber';

export default function Address() {
  return (
    <Scope path="Address">
      <Input name="id" hidden />
      <div className="rows">
        <div className="columns">
          <Input
            name="address"
            label="Endereço"
            width="300px"
            placeholder="Endereço"
          />
        </div>

        <div className="columns">
          <Input
            name="number"
            label="Número"
            width="60px"
            placeholder="Número"
          />
        </div>
        <div className="columns">
          <Input
            name="addressLineTwo"
            label="Complemento"
            width="150px"
            placeholder="Complemento"
          />
        </div>
        <div className="columns">
          <Input
            name="neighborhood"
            label="Bairro"
            width="160px"
            placeholder="Bairro"
          />
        </div>
        <div className="columns">
          <InputNumber
            name="zipcode"
            label="Cep"
            width="120px"
            format="#####-###"
            placeholder="Cep"
          />
        </div>

        <div className="columns">
          <Input name="latitude" label="Latitude" width="200px" disabled />
        </div>
        <div className="columns">
          <Input name="longitude" label="Longitude" width="200px" disabled />
        </div>
        <div className="columns">
          <InputNumber
            name="km"
            label="Distancia da loja em KM"
            width="60px"
            disabled
          />
        </div>
      </div>
    </Scope>
  );
}
