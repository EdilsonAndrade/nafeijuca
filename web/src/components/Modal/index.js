import React from 'react';

import Backdrop from '@material-ui/core/Backdrop';

import { ModalContainer, FadeContainer, Title, Message } from './styles';
import Button from '../Button';

export default function Modal({
  title,
  message,
  open,
  dialog,
  handleConfirm,
  handleClose,
}) {
  return (
    <ModalContainer
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <FadeContainer in={open}>
        <div>
          {title ? <Title>{title}</Title> : ''}
          <Message id="transition-modal-description">{message}</Message>
          <span>
            <Button
              icon="delete"
              buttonType="button"
              background="#b00"
              type="button"
              handleClick={handleClose}
            >
              NÃO
            </Button>
            <Button
              buttonType="button"
              type="button"
              handleClick={handleConfirm}
            >
              SIM
            </Button>
          </span>
        </div>
      </FadeContainer>
    </ModalContainer>
  );
}
