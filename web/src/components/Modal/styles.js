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
    align-items: center;
    justify-content: center;
  }
`;

export const ButtonContents = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 300px;
  margin: 20px auto;
`;
export const Title = styled.strong`
  font-size: 45px;
`;

export const Message = styled.p`
  font-size: 32px;
`;
