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
      getValue: (ref, newValue) => {
        if (ref.state === null || ref.state.numAsString === '') {
          return 0;
        }
        return ref.state.numAsString;
      },
      setValue: (ref, newValue) => {
        if (
          newValue &&
          ref.state !== null &&
          ref.state.numAsString !== undefined
        ) {
          ref.state.numAsString = newValue;
          ref.state.value = newValue;
          setValue(newValue);
        } else {
          setValue(0);
        }
      },
      clearValue: (ref, _) => {
        ref.state = 0;
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
