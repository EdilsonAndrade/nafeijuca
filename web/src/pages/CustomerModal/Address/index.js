import React from 'react';

import Input from '~/components/Input';
import InputNumber from '~/components/InputNumber';

export default function Address() {
  return (
    <>
      <div>
        <div>
          <Input
            name="Address.address"
            label="Endereço"
            width="300px"
            placeholder="Endereço"
          />
        </div>

        <div>
          <Input
            name="Address.number"
            label="Número"
            width="60px"
            placeholder="Número"
          />
        </div>
        <div>
          <Input
            name="Address.addressLineTwo"
            label="Complemento"
            width="150px"
            placeholder="Complemento"
          />
        </div>
        <div>
          <Input
            name="Address.neighborhood"
            label="Bairro"
            width="160px"
            placeholder="Bairro"
          />
        </div>
        <div>
          <InputNumber
            name="Address.zipcode"
            label="Cep"
            width="120px"
            format="#####-###"
            placeholder="Cep"
          />
        </div>

        <div>
          <Input
            name="Address.latitude"
            label="Latitude"
            width="200px"
            disabled
          />
        </div>
        <div>
          <Input
            name="Address.longitude"
            label="Longitude"
            width="200px"
            disabled
          />
        </div>
        <div>
          <InputNumber
            name="Address.km"
            label="Distancia da loja em KM"
            width="60px"
            disabled
          />
        </div>
      </div>
    </>
  );
}
