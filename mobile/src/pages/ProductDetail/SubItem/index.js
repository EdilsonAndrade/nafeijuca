import React, { useEffect, useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import {
  SubItemHeaderContainer, InfoTitleView, TitleText, QuantityText, MandatoryView, MandatoryText, ItemView, ItemsContainer,
} from './styles';

const SubItem = ({ items }) => {
  const [checkedItem, setCheckedItem] = useState();


  return (
    <>
      <SubItemHeaderContainer>
        <InfoTitleView>
          <TitleText>
            {items[0].ProductsItems.mandatory ? `Selecione até ${items[0].ProductsItems.max} ${items[0].ProductsItems.max > 1 ? 'items' : 'item'}` : 'Deseja adicionar mais items ?'}
            {' '}
          </TitleText>
          <QuantityText>0 de 1</QuantityText>
        </InfoTitleView>
        <MandatoryView>
          <MandatoryText>Obrigatório</MandatoryText>
        </MandatoryView>
      </SubItemHeaderContainer>
      {items.map((item) => (
        <ItemsContainer key={item.name}>
          <InfoTitleView>
            <ItemView>
              <InfoTitleView>
                <TitleText>{item.name}</TitleText>

              </InfoTitleView>
              <QuantityText>
                +
                {' '}
                {item.price}
              </QuantityText>
            </ItemView>
          </InfoTitleView>
          <CheckBox
            value={checkedItem === item.name}
            disabled={false}
            onValueChange={() => setCheckedItem(item.name)}
          />
        </ItemsContainer>
      ))}
    </>
  );
};

export default SubItem;
