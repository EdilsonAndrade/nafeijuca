import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import { MdInsertPhoto } from 'react-icons/md';
import Container from './styles';
import api from '~/services/api';

export default function Avatar({ name, ...rest }) {
  const { fieldName, defaultValue, registerField } = useField(name);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const [avatarId, setAvatarId] = useState(null);

  const avatarRef = useRef();
  const handlePreview = async e => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) {
      setPreview(null);
    }
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
    const data = new FormData();

    data.append('file', file);

    const response = await api.post('/files', data);

    const { id } = response.data;
    setAvatarId(id);
  };

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: avatarRef.current,
      path: 'files[0]',
      setValue: (ref, value) => {
        setPreview(value);
      },
      getValue: (ref, value) => {
        value = ref.getAttribute('data-id');
        if (!value) return null;

        return value;
      },
      clearValue: ref => {
        ref.value = '';
        setPreview(null);
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <label htmlFor="avatar">
        {preview ? (
          <img src={preview} alt="Preview" />
        ) : (
          <MdInsertPhoto size={52} color="#ccc" />
        )}
      </label>
      <input
        type="file"
        data-id={avatarId}
        defaultValue={defaultValue}
        id="avatar"
        preview={preview}
        accept="image/*"
        ref={avatarRef}
        onChange={handlePreview}
        {...rest}
      />
    </Container>
  );
}
