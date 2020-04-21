import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '~/components/Input';
import InputNumber from '~/components/InputNumber';
import Button from '~/components/Button';
import Select from '~/components/Select';

export default function Customer({ formRef }) {
  const addresses = useSelector(state => state.client.Address);
  const [addressData, setAddressData] = useState();
  const client = useSelector(state => state.client);
  useEffect(() => {
    if (addressData) {
      const selectedAddress = addresses.filter(
        a => a.id === addressData.value
      )[0];
      if (selectedAddress) {
        formRef.current.setFieldValue('Address.id', addressData.value);
        formRef.current.setFieldValue('Address.address', addressData.label);
        formRef.current.setFieldValue('Address.number', selectedAddress.number);
        formRef.current.setFieldValue(
          'Address.addressLineTwo',
          selectedAddress.addressLineTwo
        );
        formRef.current.setFieldValue(
          'Address.neighborhood',
          selectedAddress.neighborhood
        );
        formRef.current.setFieldValue(
          'Address.zipcode',
          selectedAddress.zipcode
        );
        formRef.current.setFieldValue(
          'Address.latitude',
          selectedAddress.latitude
        );
        formRef.current.setFieldValue(
          'Address.longitude',
          selectedAddress.longitude
        );
        formRef.current.setFieldValue('Address.km', selectedAddress.km);
      } else {
        formRef.current.reset();
        formRef.current.setData(client);
      }
    }
  }, [addressData, addresses, client, formRef, setAddressData]);
  const filterAddress = inputValue => {
    const data = addresses.map(d => ({
      value: d.id,
      label: d.address,
    }));
    return data.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  const loadAddress = async inputValue => {
    if (inputValue) {
      return filterAddress(inputValue);
    }

    const dataSt = addresses.map(d => ({
      value: d.id,
      label: d.address,
    }));

    return new Promise(resolve => {
      resolve(dataSt);
    });
  };
  return (
    <>
      <Input name="id" hidden />
      <Input name="storeId" hidden />
      <div className="rows">
        <div className="columns">
          <Input name="name" label="Nome" />
        </div>
        <div className="columns">
          <Input name="email" label="E-mail" />
        </div>
        <div className="columns">
          <InputNumber
            name="phone"
            label="Telefone"
            type="tel"
            format="(##)#####-##-##"
            mask="_"
          />
        </div>
        {addresses && addresses.length > 1 ? (
          <span className="select">
            <Select
              label="Endereços"
              loadOptions={loadAddress}
              cacheOptions
              defaultOptions
              name="addressesClient"
              value={addressData}
              onChange={e => setAddressData(e)}
            />
          </span>
        ) : (
          ''
        )}
        <Button buttonType="submit">Salvar</Button>
      </div>
    </>
  );
}

Customer.propTypes = {
  formRef: PropTypes.shape({
    current: PropTypes.shape({
      setFieldValue: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};
