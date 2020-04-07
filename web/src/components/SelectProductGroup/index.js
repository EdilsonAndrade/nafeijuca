import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from '../Select';
import * as ProductGroupActions from '~/store/modules/productGroup/actions';
import api from '~/services/api';

export default function SelectProductGroup({ name, label, storeId }) {
  const dispatch = useDispatch();
  const [productGroupData, setProductGroupData] = useState();
  const productGroups = useSelector(state => state.productGroup.productGroups);
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

    const response = await api.get(`/stores/${storeId}/productgroups`);

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
    <span>
      <Select
        id={name}
        label={label}
        loadOptions={loadProductGroups}
        cacheOptions
        defaultOptions
        value={productGroupData}
        name={name}
      />
    </span>
  );
}
