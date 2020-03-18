import React from 'react';

import { Container, Title } from './styles';

export default function GroupCard({ groupName, children }) {
  return (
    <Container>
      <strong>{groupName}</strong>

      {children}
    </Container>
  );
}
