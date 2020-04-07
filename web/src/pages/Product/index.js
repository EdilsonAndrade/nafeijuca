import React, { useState } from 'react';

import {
  Container,
  CategoryContainer,
  ProductGroup,
  Products,
  ProductChildren,
  PauseComponent,
  ArrowLeft,
  ArrowDown,
} from './styles';
import Button from '~/components/Button';
import ProductModal from './ProductModal';

export default function Product() {
  const [openModal, setOpenModal] = useState(false);
  const [activesSubMenus, setActiveSubMenus] = useState([
    {
      id: '1',
      status: true,
    },
    {
      id: '2',
      status: false,
    },
  ]);
  const handleActiveDeactiveMenus = id => {
    let status = false;
    activesSubMenus.forEach(item => {
      if (id === item.id) {
        status = !item.status;
      }
    });
    const actsSub = activesSubMenus.map(m => ({
      ...m,
      status: m.id === id ? status : m.status,
    }));
    setActiveSubMenus(actsSub);
    return status;
  };

  return (
    <Container>
      <strong>Cardápio</strong>
      <h2>
        O cardápio é a vitrine tanto do PDV quanto do aplicativo, então capriche
        na foto, nome e detalhes
      </h2>
      <CategoryContainer>
        <Button
          width="230px"
          buttonType="button"
          handleClick={() => setOpenModal(true)}
        >
          Adicionar produto
        </Button>
        <div>
          <span>Editar código PDV</span>
          <span>Reordenar cardápio</span>
        </div>
      </CategoryContainer>
      <ProductModal open={openModal} handleClose={() => setOpenModal(false)} />
      <ProductGroup active>
        <strong>FEIJOADA LIGHT</strong>
        <div>
          <span>
            <PauseComponent size={22} />
            <span>Pausar</span>
          </span>
          <div>
            <span>Duplicar</span>
            <span>Editar</span>
          </div>
        </div>
      </ProductGroup>
      <Products>
        <div>
          <span>Banana milanmesa inteira (dividida ao meio)</span>
          <div>
            <div>
              <input type="text" value="4,90" />
              <PauseComponent size={22} active={false.toString()} />
              <span>Pausado</span>
            </div>
            <div>
              <span>Duplicar</span>
              <span>Editar</span>
            </div>
          </div>
        </div>
        <div>
          <span>Vinagrete - Serve 1 pessoa</span>
          <div>
            <div>
              <input type="text" value="4,90" />
              <PauseComponent size={22} active />
              <span>Pausar</span>
            </div>
            <div>
              <span>Duplicar</span>
              <span>Editar</span>
            </div>
          </div>
        </div>
      </Products>
      <Products>
        <div>
          <span>Feijoada Completa 2 Pessoas</span>
          <div>
            <div>
              <input type="text" value="4,90" />
              <PauseComponent size={22} active={false} />
              <span>Pausado</span>
            </div>
            <div>
              <span>Duplicar</span>
              <span>Editar</span>
              {activesSubMenus.find(x => x.id === '1' && x.status === true) ? (
                <ArrowDown onClick={() => handleActiveDeactiveMenus('1')} />
              ) : (
                <ArrowLeft onClick={() => handleActiveDeactiveMenus('1')} />
              )}
            </div>
          </div>
        </div>
        <ProductChildren
          id="1"
          active={activesSubMenus.find(x => x.id === '1' && x.status === true)}
        >
          <strong>Escolha um complemento</strong>
          <div>
            <div>Couve - Serve 1 Pessoa</div>
            <div>
              <input type="text" value="4,90" />
              <PauseComponent size={22} active={false} />
              <span>Pausado</span>
            </div>
          </div>
          <div>
            <div>Farofa - Serve 1 Pessoa</div>
            <div>
              <input type="text" value="4,90" />
              <PauseComponent size={22} active={false} />
              <span>Pausado</span>
            </div>
          </div>
          <div>
            <div>Torresmo - Serve 1 Pessoa</div>
            <div>
              <input type="text" value="4,90" />
              <PauseComponent size={22} active={false} />
              <span>Pausado</span>
            </div>
          </div>
          <div>
            <div>Banana a milanesa - Uma banana (dividida ao meio)</div>
            <div>
              <input type="text" value="4,90" />
              <PauseComponent size={22} active />
              <span>Pausar</span>
            </div>
          </div>
        </ProductChildren>
      </Products>
      <Products>
        <div>
          <span>Feijoada Completa 1 Pessoa</span>
          <div>
            <div>
              <input type="text" value="14,90" />
              <PauseComponent size={22} active={false} />
              <span>Pausado</span>
            </div>
            <div>
              <span>Duplicar</span>
              <span>Editar</span>
              {activesSubMenus.find(x => x.id === '2' && x.status === true) ? (
                <ArrowDown onClick={() => handleActiveDeactiveMenus('2')} />
              ) : (
                <ArrowLeft onClick={() => handleActiveDeactiveMenus('2')} />
              )}
            </div>
          </div>
        </div>
        <ProductChildren
          id="2"
          active={activesSubMenus.find(x => x.id === '2' && x.status === true)}
        >
          <strong>Escolha um complemento</strong>
          <div>
            <div>Molho de pimenta</div>
            <div>
              <input type="text" value="4,90" />
              <PauseComponent size={22} active={false} />
              <span>Pausado</span>
            </div>
          </div>
          <div>
            <div>Farofa - Servem 2 Pessoas</div>
            <div>
              <input type="text" value="4,90" />
              <PauseComponent size={22} active={false} />
              <span>Pausado</span>
            </div>
          </div>
          <div>
            <div>Torresmo - Serve 2 Pessoas</div>
            <div>
              <input type="text" value="4,90" />
              <PauseComponent size={22} active={false} />
              <span>Pausado</span>
            </div>
          </div>
        </ProductChildren>
      </Products>
    </Container>
  );
}
