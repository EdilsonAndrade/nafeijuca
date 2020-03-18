import React from 'react';

import { Container, HeaderLogo, Menus, SubMenu } from './styles';
import Logo from '~/assets/logo.png';

export default function Header({ isAdmin, amIonManage }) {
  return (
    <Container>
      <nav>
        <div>
          <HeaderLogo src={Logo} alt="nafeijuca" />
        </div>

        <Menus>
          {isAdmin ? <SubMenu to="/manage">Gerenciar Loja</SubMenu> : ''}

          <button type="button">Sair do sistema</button>
        </Menus>
      </nav>
    </Container>
  );
}
