import React from 'react';
import PropTypes from 'prop-types';
import {
  ModalContainer,
  ModalContent,
  HeaderContainer,
  BodyContent,
} from './styles';

import Button from '~/components/Button';
import Product from './Product';
import ProductGroup from './ProductGroup';

export default function ProductModal({ open, handleClose }) {
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
          <ProductGroup />
          <hr />
          <Product />
        </BodyContent>
      </ModalContent>
    </ModalContainer>
  );
}

ProductModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
