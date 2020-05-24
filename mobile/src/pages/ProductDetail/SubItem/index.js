import React, { useEffect, useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import {
  SubItemHeaderContainer, InfoTitleView, TitleText, QuantityText, MandatoryView, MandatoryText, ItemView, ItemsContainer,
} from './styles';

const SubItem = ({ items, mandatory }) => {
  const [checkedItem, setCheckedItem] = useState();
  const [countSelected, setCountSelected] = useState(0);
  const handleCheckItem = (min, max, itemName) => {
    console.log(mandatory);
    console.log(max);
    console.log(countSelected);
    console.log(itemName);
    if (mandatory) {
      if (countSelected < max) {
        setCountSelected(countSelected + 1);
      } else {
        setCheckedItem(itemName);
      }
    }
  };
  return (
    <>
      <SubItemHeaderContainer>
        <InfoTitleView>
          <TitleText>
            {mandatory ? `Selecione até ${items[0].ProductsItems.max} ${items[0].ProductsItems.max > 1 ? 'items' : 'item'}` : 'Deseja adicionar mais items ?'}
            {' '}
          </TitleText>
          <QuantityText>

            {items[0].ProductsItems.min}
            {' '}
            de
            {' '}
            {' '}
            {items[0].ProductsItems.max}
            {' '}
          </QuantityText>
        </InfoTitleView>
        <MandatoryView>
          <MandatoryText>{mandatory ? 'Obrigatório' : ''}</MandatoryText>
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
                R$
                {Number(item.price).toFixed(2)}
              </QuantityText>
            </ItemView>
          </InfoTitleView>

          <CheckBox
            value={checkedItem === item.name}
            disabled={false}
            onValueChange={() => handleCheckItem(item.ProductsItems.min, item.ProductsItems.max, item.name)}
          />
        </ItemsContainer>
      ))}
    </>
  );
};

export default SubItem;
