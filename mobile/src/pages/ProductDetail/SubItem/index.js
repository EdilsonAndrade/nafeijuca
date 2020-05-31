import React, { useEffect, useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import PropTypes from 'prop-types';
import {
  SubItemHeaderContainer, InfoTitleView, TitleText, QuantityText, MandatoryView, MandatoryText, ItemView, ItemsContainer,
} from './styles';

const SubItem = ({ items, mandatory }) => {
  const [checkBoxs, setCheckbox] = useState([]);
  const [min, setMin] = useState(items[0].ProductsItems.min);
  const { max } = items[0].ProductsItems;

  useEffect(() => {
    const itemsChks = [];
    items.forEach((element) => {
      itemsChks.push({
        id: element.id,
        checked: false,
      });
    });

    setCheckbox(itemsChks);
  }, []);


  const handleGetValue = (id) => {
    if (checkBoxs !== undefined && checkBoxs.find((x) => x.id === id)) {
      const item = checkBoxs.find((x) => x.id === id);
      console.log('entrei aqui');
      return item.checked;
    }
    console.log('entrei aqui 2');
    return false;
  };
  const handleSubjectSelect = (id) => {
    setCheckbox(() => {
      const newCheckbox = [...checkBoxs];
      newCheckbox.forEach((subject) => {
        if (subject.id === id) {
          subject.checked = !subject.checked;
          const item = items.filter((x) => x.id === id);
          if (item) {
            if (subject.checked) {
              setMin(min + 1);
            } else {
              setMin(min - 1);
            }
          }
        }
      });

      return newCheckbox;
    });
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

            {min}
            {' '}
            de
            {' '}
            {' '}
            {max}
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
          {checkBoxs && checkBoxs.filter((x) => x.id === item.id).map((cb) => (
            <CheckBox
              key={cb.id}
              value={cb.checked}
              onValueChange={() => {
                handleSubjectSelect(cb.id);
              }}
              tintColors={{ true: '#36b254', false: '#36b254' }}
            />

          ))}


        </ItemsContainer>

      ))}

    </>
  );
};

export default SubItem;

SubItem.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
