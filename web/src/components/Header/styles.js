import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  background: #251c1f;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  nav {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    strong {
      margin-left: 5px;
      font-size: 18px;
    }
  }
`;

export const HeaderLogo = styled.img`
  padding: 10px;
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

export const Menus = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;

  button {
    margin-left: 10px;
    color: #810042;
    border: none;
    background: none;
    width: 100%;

    font-size: 16px;
  }
  ${props =>
    props.adminMenu
      ? css`
          justify-content: flex-end;
        `
      : ''}
`;
export const LiElement = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;

  color: #bbbaba;
  height: 80px;
  position: relative;
  text-align: center;
  ${props =>
    props.active
      ? css`
          background: #f28a18;
        `
      : ''}

  span {
    margin-left: 10px;
    cursor: pointer;
  }
`;
export const SubMenu = styled(NavLink)`
  font-size: 18px;
  font-weight: bold;
  color: #bbbaba;
  position: relative;
  width: 130px;
`;
