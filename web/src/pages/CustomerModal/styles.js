import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';

export const ModalContainer = styled(Modal)`
  width: 100%;
`;

export const ModalContent = styled.div`
  background: #fff;
  width: 98rem;
  margin: 100px auto;
  height: 80%;
  border-radius: 8px;
  padding: 20px;
`;
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const BodyContent = styled.div`
  form {
    border: 1px solid #eee;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    span.select {
      margin: 0 5px;
      width: 350px;
    }
    > div.rows {
      display: flex;
      align-items: center;
      button {
        margin-top: 17px;
      }
      div.columns {
        margin: 5px;
        display: flex;
        flex-direction: column;
      }
    }

    div.titleCenter {
      justify-content: center;
      strong {
        font-size: 22px;
      }
      background: #eee;
      padding: 10px;
      border-radius: 6px;
    }
    div.weekDays {
      margin: 10px auto;
      width: 60%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`;
