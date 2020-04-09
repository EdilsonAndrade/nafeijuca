import React, { useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import { InputField } from './styles';

export default function InputNumber({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);
  const [value, setValue] = useState();
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'state',
      getValue: (ref, value) => {
        return ref.state.numAsString;
      },
      setValue: (ref, value) => {
        if (value) {
          ref.state.numAsString = value;
          ref.state.value = value;
          setValue(value);
        }
      },
      clearValue: (ref, value) => {
        ref.state = null;
      },
    });
  }, [fieldName, registerField]);
  return (
    <>
      {label ? <strong>{label}</strong> : ''}
      <InputField ref={inputRef} defaultValue={value} {...rest} />
      {error && (
        <span style={{ color: '#f00', fontWeight: 'bold' }}>{error}</span>
      )}
    </>
  );
}
