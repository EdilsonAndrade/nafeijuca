import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
  background: #fff;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 14px;
  form {
    position: relative;
    top: -60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 75%;
    input {
      padding: 13px 8px;
      margin: 5px 0;
      background: rgba(192, 192, 192, 0.3);
      border: none;
      border-radius: 6px;
      font-size: 16px;
      color: #999;
      &::placeholder {
        color: #999;
      }
    }
    span {
      color: #ed4135;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
    button {
      padding: 13px 8px;
      margin: 15px 0;
      background: #f5871e;
      border: none;
      border-radius: 6px;
      color: #fff;
      transition: background 0.5s;
      &:hover {
        background: ${darken(0.09, '#f5871e')};
      }
    }
    a {
      margin-top: 10px;
      text-align: center;
      color: #fff;
      transition: color 0.5s;
      &:hover {
        color: ${darken(0.3, '#fff')};
      }
    }
  }
`;
