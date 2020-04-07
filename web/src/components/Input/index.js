import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { InputField } from './styles';

export default function Input({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = '', registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue: ref => {
        ref.value = null;
      },
    });
  }, [fieldName, registerField]);
  return (
    <>
      {label ? <strong>{label}</strong> : ''}
      <InputField ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && (
        <span style={{ color: '#f00', fontWeight: 'bold' }}>{error}</span>
      )}
    </>
  );
}
