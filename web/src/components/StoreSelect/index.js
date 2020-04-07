import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from '../Select';
import * as StoreActions from '~/store/modules/store/actions';
import api from '~/services/api';

export default function StoreSelect({ name, label }) {
  const dispatch = useDispatch();
  const [storeData, setStoreData] = useState();
  const stores = useSelector(state => state.store.stores);
  const filterStores = inputValue => {
    const data = stores.map(d => ({
      value: d.id,
      label: d.name,
    }));
    return data.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadStores = async inputValue => {
    if (inputValue) {
      return filterStores(inputValue);
    }

    const response = await api.get('/stores');

    dispatch(StoreActions.loadSuccess(response.data));
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
        loadOptions={loadStores}
        cacheOptions
        defaultOptions
        value={storeData}
        onChange={e => setStoreData(e)}
        name={name}
      />
    </span>
  );
}
