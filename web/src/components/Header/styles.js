import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
  line-height: 50px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  nav {
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    div {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
`;

export const HeaderLogo = styled.img`
  max-width: 50px;
  border-radius: 50%;
`;
export const Menus = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  button {
    margin-left: 20px;
    color: #de3b3b;
    border: none;
    background: none;
  }
`;

export const SubMenu = styled(NavLink)`
  font-size: 22px;
  font-weight: bold;
  color: #f5871e;
  margin-right: 10px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    height: 24px;
    width: 1px;
    background: #eee;
    top: 13px;
    margin-left: 3px;
  }
`;
