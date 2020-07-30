import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #c89d00, #ffca05);
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: linear-gradient(180deg, #c89d00, #ffca05);
  form {

      label {
        font-size: 18px;
        font-weight: bold;
      }
    }
    input {
      padding: 10px;
      border: 1px solid #eee;
      margin: 5px 0;
      ::placeholder {
        color: #afabac;
        font-size: 17px;
      }
      border-radius: 4px;
    }
  }
`;

export const Logo = styled.img`
  border-radius: 50%;
  border: none;
  max-width: 120px;
`;
