import React from 'react';

import { MdPauseCircleFilled, MdPlayCircleFilled } from 'react-icons/md';
import { Container, CategoryContainer, ProductGroup, Products } from './styles';
import Button from '~/components/Button';

export default function Product() {
  return (
    <Container>
      <strong>Cardápio</strong>
      <h2>
        O cardápio é a vitrine tanto do PDV quanto do aplicativo, então capriche
        na foto, nome e detalhes
      </h2>
      <CategoryContainer>
        <Button width="230px" buttonType="button">
          Adicionar categoria
        </Button>
        <div>
          <span>Editar código PDV</span>
          <span>Reordenar cardápio</span>
        </div>
      </CategoryContainer>
      <ProductGroup active>
        <strong>FEIJOADA LIGHT</strong>
        <div>
          <span>
            <MdPlayCircleFilled size={22} />
            <span>Pausar</span>
          </span>
          <div>
            <span>Duplicar</span>
            <span>Editar</span>
          </div>
        </div>
      </ProductGroup>
      <Products>
        <span>Bana a milanmesa inteira (dividida ao meio)</span>
        <div>
          <div>
            <input type="text" value="4,90" />
            <MdPauseCircleFilled size={22} active={false} />
            <span>Pausado</span>
          </div>
          <div>
            <span>Duplicar</span>
            <span>Editar</span>
          </div>
        </div>
      </Products>
    </Container>
  );
}
