import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';

export const ModalContainer = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FadeContainer = styled(Fade)`
  background: #fff;
  padding: 50px;
  border-radius: 8px;
  color: #444;
  > div {
    display: flex;
    flex-direction: column;
  }
  span {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
  }
`;
export const Title = styled.strong`
  font-size: 45px;
`;

export const Message = styled.p`
  font-size: 32px;
`;
