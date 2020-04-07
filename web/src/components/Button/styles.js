import styled from 'styled-components';
import { darken } from 'polished';

const ButtonContent = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 11px;
  color: #fff;
  background: ${props => (props.background ? props.background : '#f28a18')};
  width: ${props => (props.width ? props.width : '142px')};
  border: none;
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '6px')};
  font-weight: bold;
  font-size: 18px;
  margin-top: ${props => (props.marginTop ? props.marginTop : '')};
  position: ${props => (props.position ? props.position : '')};
  left: ${props => (props.left ? props.left : '')};
  svg {
    margin-right: 13px;
  }
  &:hover {
    background: ${darken(0.09, '#f28a18')};
  }
`;
export default ButtonContent;
