import styled, { css } from 'styled-components';
import NumberFormat from 'react-number-format';

export const InputField = styled(NumberFormat)`
  ${props =>
    props.hidden &&
    css`
      width: '0px';
    `}

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
