import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import { AsyncSelectField } from './styles';

const Select = ({ name, label, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'props.value',
      clearValue: ref => {
        // console.log(ref);
      },
      getValue: (ref, value) => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map(option => option.value);
        }
        if (!ref.props.value) {
          return '';
        }
        return ref.props.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);
  return (
    <>
      {label && <strong>{label}</strong>}
      <AsyncSelectField
        cacheOptions
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
      {error && (
        <span style={{ color: '#f00', fontWeight: 'bold' }}>{error}</span>
      )}
    </>
  );
};
export default Select;
Select.propTypes = {
  name: PropTypes.string.isRequired,
};
