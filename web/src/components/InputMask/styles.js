import styled from 'styled-components';
import InputMask from 'react-input-mask';

export const InputMaskContainer = styled(InputMask)`
  padding: 13px 8px;
  margin: 15px 0;

  border: 1px solid #eee;
  border-radius: 6px;
  font-size: 16px;
  color: #999;
  &::placeholder {
    color: #999;
  }
`;
