import styled, { css } from 'styled-components';
import { darken } from 'polished';

const ButtonContent = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 11px;
  color: #fff;
  background: ${props => (props.background ? props.background : '#f28a18')};
  width: ${props => (props.width ? props.width : '')};
  border: none;
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '6px')};
  font-weight: bold;
  font-size: ${props => (props.fontSize ? props.fontSize : '18px')};

  margin-top: ${props => (props.marginTop ? props.marginTop : '')};
  position: ${props => (props.position ? props.position : '')};
  left: ${props => (props.left ? props.left : '')};
  svg {
    margin-right: 13px;
  }
  &:hover {
    background: ${darken(0.09, '#f28a18')};
  }
  ${props =>
    props.naked
      ? css`
          background: none;
          &:hover {
            background: none;
            font-weight: bold;
          }
          display: inline-block;
          color: #444;
          font-weight: 200;
          padding: 5px;
          border-radius: 0px;
          svg {
            font-weight: bold;
          }
        `
      : ''}
`;
export default ButtonContent;
