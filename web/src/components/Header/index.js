import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Container, HeaderLogo, Menus, LiElement, SubMenu } from './styles';
import Logo from '~/assets/logo.png';
import { signoutRequesst } from '~/store/modules/auth/actions';
import history from '~/services/history';

export default function Header({ props }) {
  const dispatch = useDispatch();
  const store = useSelector(state => state.user.store);
  const [activeMenu, setActiveMenu] = useState('Vendas');
  const user = useSelector(state => state.user);
  useEffect(() => {
    history.push(history.location.pathname);
    setActiveMenu(history.location.pathname);
  }, []);
  const handleLogout = () => {
    dispatch(signoutRequesst());
  };
  return (
    <Container>
      <nav>
        <Menus>
          <LiElement>
            <NavLink
              to="/dashboard"
              onClick={() => setActiveMenu('/dashboard')}
            >
              <HeaderLogo src={Logo} alt="nafeijuca" />
            </NavLink>
            <strong>{store ? store.name : 'Sem Loja Cadastrada'}</strong>
          </LiElement>
        </Menus>
        <Menus adminMenu>
          {user.isAdmin ? (
            <>
              <LiElement active={activeMenu === '/dashboard'}>
                <SubMenu
                  activeStyle={{ color: '#251c1f' }}
                  to="/dashboard"
                  onClick={() => setActiveMenu('/dashboard')}
                >
                  Vendas
                </SubMenu>
              </LiElement>
              <LiElement active={activeMenu === '/product'}>
                <SubMenu
                  activeStyle={{ color: '#251c1f' }}
                  to="/product"
                  onClick={() => setActiveMenu('/product')}
                >
                  Produtos
                </SubMenu>
              </LiElement>
              {user.systemAdmin ? (
                <LiElement active={activeMenu === '/store'}>
                  <SubMenu
                    activeStyle={{ color: '#251c1f' }}
                    to="/store"
                    onClick={() => setActiveMenu('/store')}
                  >
                    Lojas
                  </SubMenu>
                </LiElement>
              ) : (
                ''
              )}

              <LiElement active={activeMenu === '/users'}>
                <SubMenu
                  activeStyle={{ color: '#251c1f' }}
                  to="/users"
                  onClick={() => setActiveMenu('/users')}
                >
                  Usuários
                </SubMenu>
              </LiElement>
            </>
          ) : (
            <LiElement active={activeMenu === '/dashboard'}>
              <SubMenu
                activeStyle={{ color: '#251c1f' }}
                to="/dashboard"
                onClick={() => setActiveMenu('/dashboard')}
              >
                Vendas
              </SubMenu>
            </LiElement>
          )}
          <LiElement onClick={handleLogout}>
            <span>Sair do sistema</span>
          </LiElement>
        </Menus>
      </nav>
    </Container>
  );
}
