import React, { useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import Switch from '@material-ui/core/Switch';

export default function SwitchButton({ name, label, ...rest }) {
  const switchButtonRef = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);

  const [checked, setChecked] = useState(false);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: switchButtonRef.current.querySelector('input'),
      path: 'checked',
      setValue(ref, value) {
        setChecked(value);
      },
      clearValue: () => {
        setChecked(false);
      },
    });
  }, [fieldName, registerField, switchButtonRef]);

  return (
    <>
      {label ? <strong>{label}</strong> : ''}
      <Switch
        ref={switchButtonRef}
        checked={checked}
        onClick={() => setChecked(!checked)}
        defaultValue={defaultValue}
        {...rest}
      />
    </>
  );
}
