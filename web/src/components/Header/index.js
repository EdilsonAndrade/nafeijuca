import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Container, HeaderLogo, Menus, SubMenu } from './styles';
import Logo from '~/assets/logo.png';

export default function Header() {
  const isAdmin = useSelector(state => state.user.isAdmin);
  return (
    <Container>
      <nav>
        <div>
          <NavLink to="/dashboard">
            <HeaderLogo src={Logo} alt="nafeijuca" />
          </NavLink>
        </div>

        <Menus>
          {isAdmin ? (
            <>
              <SubMenu activeStyle={{ color: '#4444' }} to="/product">
                Produtos
              </SubMenu>
              <SubMenu activeStyle={{ color: '#4444' }} to="/store">
                Lojas
              </SubMenu>
            </>
          ) : (
            ''
          )}

          <button type="button">Sair do sistema</button>
        </Menus>
      </nav>
    </Container>
  );
}
