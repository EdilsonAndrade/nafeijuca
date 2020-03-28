import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import { MdInsertPhoto } from 'react-icons/md';
import Container from './styles';
import api from '~/services/api';

export default function Avatar() {
  const { defaultValue, registerField } = useField('avatar');
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
        clearValue: ref => {
          setPreview(null);
        },
      });
    }
  }, [ref]); // eslint-disable-line

  async function handleImageChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('/files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }
  return (
    <Container>
      <label htmlFor="avatar">
        {preview ? (
          <img src={preview} alt="" />
        ) : (
          <MdInsertPhoto size={52} color="#ccc" />
        )}
      </label>
      <input
        type="file"
        id="avatar"
        accept="image/*"
        onChange={handleImageChange}
        data-file={file}
        ref={ref}
      />
    </Container>
  );
}
