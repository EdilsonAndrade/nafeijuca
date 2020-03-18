import styled from 'styled-components';

export const Container = styled.div`
  div {
    position: relative;
    svg {
      position: absolute;
      top: 10px;
      left: 8px;
    }
  }
`;

export const SearchInput = styled.input`
  padding: 5px 5px 5px 25px;
  height: 30px;
  border-radius: 6px;
  border: none;
  margin: 5px;
  width: 15%;
  font-size: 18px;
  ::placeholder {
    color: #ccc;
  }
`;
