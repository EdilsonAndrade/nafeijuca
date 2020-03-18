import React from 'react';
import Header from '~/components/Header';
import { Wrapper, Content } from './styles';

export default function DefaultLayout({ children, isAdmin }) {
  return (
    <Wrapper>
      <Header isAdmin={isAdmin} />
      <Content>{children}</Content>
    </Wrapper>
  );
}
