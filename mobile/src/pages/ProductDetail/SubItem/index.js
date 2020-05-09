import React, { useEffect, useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import {
  SubItemHeaderContainer, InfoTitleView, TitleText, QuantityText, MandatoryView, MandatoryText, ItemView, ItemsContainer,
} from './styles';

const SubItem = () => {
  const [subItems, setSubItems] = useState([]);
  const [checkedItem, setCheckedItem] = useState();
  useEffect(() => {
    setSubItems([{
      name: 'Suco de melancia Garrafa 500ml',
      price: 'R$ 5,09',
    },
    {
      name: 'Suco de Limão Garrafa 500ml',
      price: 'R$ 5,09',
    }, {
      name: 'Suco de Laranja Garrafa 500ml',
      price: 'R$ 5,09',
    }]);
  }, []);

  return (
    <>
      <SubItemHeaderContainer>
        <InfoTitleView>
          <TitleText>Escolha o item</TitleText>
          <QuantityText>0 de 1</QuantityText>
        </InfoTitleView>
        <MandatoryView>
          <MandatoryText>Obrigatório</MandatoryText>
        </MandatoryView>
      </SubItemHeaderContainer>
      {subItems.map((item) => (
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
