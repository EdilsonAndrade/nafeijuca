import React, { useRef, useEffect } from 'react';

import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import { InputMaskContainer } from './styles';

export default function InputMaskForm({ name, label, ...rest }) {
  const ref = useRef();

  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'value',
      clearValue: maskRef => {
        maskRef.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      {label ? <strong>{label}</strong> : ''}
      <InputMaskContainer
        {...rest}
        defaultValue={defaultValue}
        maskChar=""
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}
InputMaskForm.propTypes = {
  name: PropTypes.string.isRequired,
  mask: PropTypes.string.isRequired,
  label: PropTypes.string,
};

InputMaskForm.defaultProps = {
  label: '',
};
