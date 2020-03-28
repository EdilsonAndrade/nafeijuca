import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = '', registerField, error } = useField(name);
  useEffect(() => {
    console.tron.warn(`ref= ${inputRef.current}`);
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue: ref => {
        ref.value = '';
      },
    });
  }, [fieldName, registerField]);
  return (
    <>
      <input ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && (
        <span style={{ color: '#f00', fontWeight: 'bold' }}>{error}</span>
      )}
    </>
  );
}
