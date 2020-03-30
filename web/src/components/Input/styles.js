import styled, { css } from 'styled-components';

export const InputField = styled.input`
  display: ${props => (props.hidden ? 'none' : 'block')};
  ${props =>
    props.hidden &&
    css`
      width: '0px';
    `}
`;
