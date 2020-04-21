import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import {
  ModalContainer,
  ModalContent,
  HeaderContainer,
  BodyContent,
} from './styles';

import Button from '~/components/Button';
import Customer from './Customer';
import Address from './Address';

export default function CustomerModal({ open, handleClose }) {
  const formRef = useRef(null);

  const handleSaveClient = data => {
    console.log(data);
  };
  return (
    <ModalContainer open={open}>
      <ModalContent>
        <HeaderContainer>
          <Button
            borderRadius="65%"
            width="44px"
            icon="none"
            buttonType="button"
            marginTop="-41px"
            position="relative"
            left="40px;"
            handleClick={handleClose}
          >
            X
          </Button>
        </HeaderContainer>
        <BodyContent>
          <Form ref={formRef} onSubmit={handleSaveClient}>
            <Customer />
            <Address />
          </Form>
        </BodyContent>
      </ModalContent>
    </ModalContainer>
  );
}

CustomerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
