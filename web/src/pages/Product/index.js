import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from '@unform/web';
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
import * as ProductGroupActions from '~/store/modules/productGroup/actions';
import * as ProductActions from '~/store/modules/product/actions';
import InputNumber from '~/components/InputNumber';

export default function Product() {
  const productGroups = useSelector(state => state.productGroup.productGroups);

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const productRef = useRef(null);
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
  useEffect(() => {
    dispatch(ProductGroupActions.loadRequest(user.store.id));
  }, [dispatch, user.store.id]);

  const handleEditProductGroup = productGroup => {
    dispatch(ProductGroupActions.editSuccess(productGroup));
    setOpenModal(true);
  };

  const handleEditProduct = (productToEdit, productGroup) => {
    dispatch(ProductGroupActions.editSuccess(productGroup));
    dispatch(ProductActions.editSuccess(productToEdit));
    setOpenModal(true);
  };
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
  const renderProductGroupAndProduct = () => {
    return productGroups.map(pg => {
      return (
        <div key={pg.id}>
          <ProductGroup active={pg.active}>
            <strong>{pg.name}</strong>
            <div>
              <span>
                <Button buttonType="button" icon="none" naked>
                  <PauseComponent size={22} />
                </Button>
                <span>{pg.active ? 'Pausar' : 'Pausado'}</span>
              </span>
              <div>
                <Button icon="none" naked fontSize="16px" buttonType="button">
                  Duplicar
                </Button>
                <Button
                  icon="none"
                  naked
                  fontSize="16px"
                  handleClick={() => handleEditProductGroup(pg)}
                  buttonType="button"
                >
                  Editar
                </Button>
              </div>
            </div>
          </ProductGroup>
          {pg.Products.map(product => (
            <Products key={product.id}>
              <div>
                <span>{product.name}</span>
                <div>
                  <div>
                    <InputNumber
                      name="preco"
                      decimalSeparator=","
                      decimalScale={2}
                      allowNegative={false}
                      prefix="R$"
                      fixedDecimalScale
                      value={product.price}
                    />
                    <Button icon="none" naked buttonType="button">
                      <PauseComponent
                        size={22}
                        color={product.active ? '#444' : 'rgb(255,76,0)'}
                      />
                    </Button>
                    <span>{product.active ? 'Pausar' : 'Pausado'}</span>
                  </div>
                  <div>
                    <Button
                      icon="none"
                      naked
                      fontSize="16px"
                      buttonType="button"
                    >
                      Duplicar
                    </Button>
                    <Button
                      icon="none"
                      naked
                      fontSize="16px"
                      handleClick={() => handleEditProduct(product, pg)}
                      buttonType="button"
                    >
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            </Products>
          ))}
        </div>
      );
    });
  };

  const handleNewCategory = () => {
    dispatch(ProductGroupActions.editSuccess(null));
    dispatch(ProductActions.editSuccess(null));
    setOpenModal(true);
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
          handleClick={handleNewCategory}
        >
          Adicionar produto
        </Button>
        <div>
          <span>Editar código PDV</span>
          <span>Reordenar cardápio</span>
        </div>
      </CategoryContainer>
      <ProductModal open={openModal} handleClose={() => setOpenModal(false)} />
      <Form ref={productRef}>{renderProductGroupAndProduct()}</Form>
      <Products>
        <div>
          <span>Feijoada Completa 2 Pessoas</span>
          <div>
            <div>
              <input type="text" />
              <PauseComponent size={22} />
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
              <input type="text" />
              <PauseComponent size={22} />
              <span>Pausado</span>
            </div>
          </div>
          <div>
            <div>Farofa - Serve 1 Pessoa</div>
            <div>
              <input type="text" />
              <PauseComponent size={22} />
              <span>Pausado</span>
            </div>
          </div>
          <div>
            <div>Torresmo - Serve 1 Pessoa</div>
            <div>
              <input type="text" />
              <PauseComponent size={22} />
              <span>Pausado</span>
            </div>
          </div>
          <div>
            <div>Banana a milanesa - Uma banana (dividida ao meio)</div>
            <div>
              <input type="text" />
              <PauseComponent size={22} />
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
              <input type="text" />
              <PauseComponent size={22} />
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
              <input type="text" />
              <PauseComponent size={22} />
              <span>Pausado</span>
            </div>
          </div>
          <div>
            <div>Farofa - Servem 2 Pessoas</div>
            <div>
              <input type="text" />
              <PauseComponent size={22} />
              <span>Pausado</span>
            </div>
          </div>
          <div>
            <div>Torresmo - Serve 2 Pessoas</div>
            <div>
              <input type="text" />
              <PauseComponent size={22} />
              <span>Pausado</span>
            </div>
          </div>
        </ProductChildren>
      </Products>
    </Container>
  );
}
