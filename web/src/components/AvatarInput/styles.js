import styled from 'styled-components';

const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;
  label {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
    img {
      height: 180px;
      width: 180px;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.3);
      background: #eee;
    }
    svg {
      height: 180px;
      width: 180px;
    }
  }
  input {
    display: none;
  }
`;
export default Container;
