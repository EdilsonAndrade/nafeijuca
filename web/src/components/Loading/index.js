import React from 'react';
import { useSelector } from 'react-redux';

import { MdAutorenew } from 'react-icons/md';
import { Container } from './styles';

export default function Loading() {
  const loading = useSelector(state => state.load.loading);

  return (
    <Container loading={loading.toString()}>
      <MdAutorenew size={32} color="#f5871e" />
    </Container>
  );
}
