import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
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
import { formatPrice } from '~/services/formatDecimal';

export default function Product() {
  const productGroups = useSelector(state => state.productGroup.productGroups);
  const [activesSubMenus, setActiveSubMenus] = useState();
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const productRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (user.store !== null) {
      dispatch(ProductGroupActions.loadRequest(user.store.id));
    } else {
      toast.warn('Usuário não associado à alguma loja');
    }
  }, [dispatch, user.store]);

  useEffect(() => {
    if (productGroups) {
      const activesMenus = [];

      productGroups.forEach(g => {
        const products = g.Products;
        products.forEach(p => {
          activesMenus.push({
            id: p.id,
            status: true,
          });
        });
      });

      setActiveSubMenus(activesMenus);
    }
  }, [productGroups]);

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

  const handleChangePrice = (e, productId) => {
    if (e.key === 'Enter') {
      console.tron.warn(e.target.value);
      console.tron.warn(productId);
    } else {
      toast.warn('Para salvar, aperte enter');
    }
  };

  const renderMandatoryChildren = (subItems, productId) => {
    const mandatoryItems = subItems.filter(
      x => x.ProductsItems.mandatory === true
    );

    if (mandatoryItems && mandatoryItems.length > 0) {
      return (
        <ProductChildren
          id={productId}
          active={
            activesSubMenus &&
            activesSubMenus.find(x => x.id === productId && x.status === true)
          }
        >
          <strong>Escolha um complemento</strong>
          {mandatoryItems.map(s => (
            <div key={s.id}>
              <div>{s.name}</div>
              <div>
                <InputNumber
                  name="price"
                  decimalSeparator=","
                  decimalScale={2}
                  allowNegative={false}
                  prefix="R$"
                  fixedDecimalScale
                  value={s.price}
                  onKeyUp={e => handleChangePrice(e, productId)}
                />
                <PauseComponent size={22} />
                <span>{s.active ? 'Pausar' : 'Pausado'}</span>
              </div>
            </div>
          ))}
        </ProductChildren>
      );
    }
  };

  const renderNonMandatoryChildren = (subItems, productId) => {
    const nonMandatoryItems = subItems.filter(
      x => x.ProductsItems.mandatory === false
    );
    if (nonMandatoryItems && nonMandatoryItems.length > 0) {
      return (
        <ProductChildren
          id={productId}
          active={
            activesSubMenus &&
            activesSubMenus.find(x => x.id === productId && x.status === true)
          }
        >
          <strong>Deseja adicionar algum complemento</strong>
          {nonMandatoryItems.map(s => (
            <div key={s.id}>
              <div>{s.name}</div>
              <div>
                <InputNumber
                  name="price"
                  decimalSeparator=","
                  decimalScale={2}
                  allowNegative={false}
                  prefix="R$"
                  fixedDecimalScale
                  value={s.price}
                  onKeyUp={e => handleChangePrice(e, productId)}
                />
                <PauseComponent size={22} />
                <span>{s.active ? 'Pausar' : 'Pausado'}</span>
              </div>
            </div>
          ))}
        </ProductChildren>
      );
    }
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
                    {product.SubItems.length > 0 ? (
                      activesSubMenus &&
                      activesSubMenus.find(
                        x => x.id === product.id && x.status === true
                      ) ? (
                        <ArrowDown
                          onClick={() => handleActiveDeactiveMenus(product.id)}
                        />
                      ) : (
                        <ArrowLeft
                          onClick={() => handleActiveDeactiveMenus(product.id)}
                        />
                      )
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
              {renderMandatoryChildren(product.SubItems, product.id)}
              {renderNonMandatoryChildren(product.SubItems, product.id)}
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

  return user.store !== null ? (
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
    </Container>
  ) : (
    ''
  );
}
