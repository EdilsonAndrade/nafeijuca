import styled from 'styled-components';
import { darken } from 'polished';

const ButtonContent = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  color: #fff;
  background: ${props => (props.background ? props.background : '#f28a18')};
  width: 142px;
  height: 36px;
  border: none;
  padding: 8px;
  margin: 10px;
  border-radius: 4px;
  font-weight: bold;
  svg {
    margin-right: 13px;
  }
  &:hover {
    background: ${darken(0.09, '#f28a18')};
  }
`;
export default ButtonContent;
