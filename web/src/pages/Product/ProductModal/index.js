import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ModalContainer,
  ModalContent,
  HeaderContainer,
  BodyContent,
  TabContainer,
  Tab,
  TabContent,
} from './styles';

import Button from '~/components/Button';
import Product from './Product';
import ProductGroup from './ProductGroup';
import SubProducts from './SubProducts';

export default function ProductModal({ open, handleClose }) {
  const [tab, setTab] = useState('PRODUTO');
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
          <TabContainer>
            <Tab onClick={() => setTab('PRODUTO')} active={tab === 'PRODUTO'}>
              Produto
            </Tab>
            <Tab
              onClick={() => setTab('COMPLEMENTO')}
              active={tab === 'COMPLEMENTO'}
            >
              Complementos
            </Tab>
          </TabContainer>
          <TabContent active={tab === 'PRODUTO'}>
            <Product />
          </TabContent>
          <TabContent active={tab === 'COMPLEMENTO'}>
            <SubProducts />
          </TabContent>
        </BodyContent>
      </ModalContent>
    </ModalContainer>
  );
}

ProductModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
