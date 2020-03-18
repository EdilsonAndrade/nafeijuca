import React from 'react';

import { MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';
import {
  Container,
  ContentGrid,
  Product,
  ProductDetails,
  ProductName,
  ProductDescription,
  PriceContent,
  ProductPrice,
  ContentButtons,
  ImageProduct,
  ProductContentText,
  QuantityInput,
} from './styles';
import Feijuca from '~/assets/doseujeito.jpg';
import FeijucaExecutiva from '~/assets/executiva.jpg';

export default function ProductCard() {
  return (
    <Container>
      <ContentGrid>
        <Product>
          <ProductDetails>
            <ProductContentText>
              <ProductName>Do seu jeito - serve 1 pessoa</ProductName>
              <ProductDescription>
                Caso queira arroz, selecione o mesmo, a feijuca vai com feijão
                preto com pedaços de bacon e (costelinha, calabresa, paio, carne
                seca e lombo) serve 1 pessoa. escolha mais 2 complementos
              </ProductDescription>
            </ProductContentText>
            <PriceContent>
              <ProductPrice>R$ 32,00</ProductPrice>
              <ContentButtons>
                <button type="button">
                  <MdAddCircleOutline color="#f5871e" size={22} />
                </button>
                <QuantityInput type="text" value={2} />
                <button type="button">
                  <MdRemoveCircleOutline color="#f5871e" size={22} />
                </button>
              </ContentButtons>
            </PriceContent>
          </ProductDetails>
          <ImageProduct src={Feijuca} alt="feijuca" />
        </Product>

        <Product>
          <ProductDetails>
            <ProductContentText>
              <ProductName>
                Feijoada completa - 1 pessoa - arroz, bisteca, torresmo, couve,
                farofa, molho de pimenta, laranja, caipirinha (aperitivo) e
                sobremesa.
              </ProductName>
              <ProductDescription>
                Feijoada contém uma porção de feijão preto, bacon, linguiça
                (paio e calabresa), carne seca, costelinha de porco e lombo.
                Acompanhada de uma porção de arroz, torresmo, couve, bisteca,
                farofa, laranja, molho de pimenta e para tornar esta experiência
                ainda mais prazerosa, uma caipirinha (aperitivo) e uma sobremesa
                especial.
              </ProductDescription>
            </ProductContentText>
            <PriceContent>
              <ProductPrice>R$ 60,00</ProductPrice>
              <ContentButtons>
                <button type="button">
                  <MdAddCircleOutline color="#f5871e" size={22} />
                </button>
                <QuantityInput type="text" value={2} />
                <button type="button">
                  <MdRemoveCircleOutline color="#f5871e" size={22} />
                </button>
              </ContentButtons>
            </PriceContent>
          </ProductDetails>
          <ImageProduct src={FeijucaExecutiva} alt="feijuca" />
        </Product>
        <Product>
          <ProductDetails>
            <ProductContentText>
              <ProductName>Do seu jeito - serve 1 pessoa</ProductName>
              <ProductDescription>
                Caso queira arroz, selecione o mesmo, a feijuca vai com feijão
                preto com pedaços de bacon e (costelinha, calabresa, paio, carne
                seca e lombo) serve 1 pessoa. escolha mais 2 complementos
              </ProductDescription>
            </ProductContentText>
            <PriceContent>
              <ProductPrice>R$ 32,00</ProductPrice>
              <ContentButtons>
                <button type="button">
                  <MdAddCircleOutline color="#f5871e" size={22} />
                </button>
                <QuantityInput type="text" value={2} />
                <button type="button">
                  <MdRemoveCircleOutline color="#f5871e" size={22} />
                </button>
              </ContentButtons>
            </PriceContent>
          </ProductDetails>
          <ImageProduct src={Feijuca} alt="feijuca" />
        </Product>

        <Product>
          <ProductDetails>
            <ProductContentText>
              <ProductName>
                Feijoada completa - 1 pessoa - arroz, bisteca, torresmo, couve,
                farofa, molho de pimenta, laranja, caipirinha (aperitivo) e
                sobremesa.
              </ProductName>
              <ProductDescription>
                Feijoada contém uma porção de feijão preto, bacon, linguiça
                (paio e calabresa), carne seca, costelinha de porco e lombo.
                Acompanhada de uma porção de arroz, torresmo, couve, bisteca,
                farofa, laranja, molho de pimenta e para tornar esta experiência
                ainda mais prazerosa, uma caipirinha (aperitivo) e uma sobremesa
                especial.
              </ProductDescription>
            </ProductContentText>
            <PriceContent>
              <ProductPrice>R$ 60,00</ProductPrice>
              <ContentButtons>
                <button type="button">
                  <MdAddCircleOutline color="#f5871e" size={22} />
                </button>
                <QuantityInput type="text" value={2} />
                <button type="button">
                  <MdRemoveCircleOutline color="#f5871e" size={22} />
                </button>
              </ContentButtons>
            </PriceContent>
          </ProductDetails>
          <ImageProduct src={FeijucaExecutiva} alt="feijuca" />
        </Product>
        <Product>
          <ProductDetails>
            <ProductContentText>
              <ProductName>Do seu jeito - serve 1 pessoa</ProductName>
              <ProductDescription>
                Caso queira arroz, selecione o mesmo, a feijuca vai com feijão
                preto com pedaços de bacon e (costelinha, calabresa, paio, carne
                seca e lombo) serve 1 pessoa. escolha mais 2 complementos
              </ProductDescription>
            </ProductContentText>
            <PriceContent>
              <ProductPrice>R$ 32,00</ProductPrice>
              <ContentButtons>
                <button type="button">
                  <MdAddCircleOutline color="#f5871e" size={22} />
                </button>
                <QuantityInput type="text" value={2} />
                <button type="button">
                  <MdRemoveCircleOutline color="#f5871e" size={22} />
                </button>
              </ContentButtons>
            </PriceContent>
          </ProductDetails>
          <ImageProduct src={Feijuca} alt="feijuca" />
        </Product>

        <Product>
          <ProductDetails>
            <ProductContentText>
              <ProductName>
                Feijoada completa - 1 pessoa - arroz, bisteca, torresmo, couve,
                farofa, molho de pimenta, laranja, caipirinha (aperitivo) e
                sobremesa.
              </ProductName>
              <ProductDescription>
                Feijoada contém uma porção de feijão preto, bacon, linguiça
                (paio e calabresa), carne seca, costelinha de porco e lombo.
                Acompanhada de uma porção de arroz, torresmo, couve, bisteca,
                farofa, laranja, molho de pimenta e para tornar esta experiência
                ainda mais prazerosa, uma caipirinha (aperitivo) e uma sobremesa
                especial.
              </ProductDescription>
            </ProductContentText>
            <PriceContent>
              <ProductPrice>R$ 60,00</ProductPrice>
              <ContentButtons>
                <button type="button">
                  <MdAddCircleOutline color="#f5871e" size={22} />
                </button>
                <QuantityInput type="text" value={2} />
                <button type="button">
                  <MdRemoveCircleOutline color="#f5871e" size={22} />
                </button>
              </ContentButtons>
            </PriceContent>
          </ProductDetails>
          <ImageProduct src={FeijucaExecutiva} alt="feijuca" />
        </Product>
      </ContentGrid>
    </Container>
  );
}
