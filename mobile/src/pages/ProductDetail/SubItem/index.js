import React, { useEffect, useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import PropTypes from 'prop-types';
import {
  SubItemHeaderContainer, InfoTitleView, TitleText, QuantityText, MandatoryView, MandatoryText, ItemView, ItemsContainer,
} from './styles';

const SubItem = ({
  items, mandatory, onUnCheck, onCheck,
}) => {
  const [checkBoxs, setCheckbox] = useState([]);
  const [minSelect, setMinSelect] = useState(items[0].ProductsItems.min);


  useEffect(() => {
    const itemsChks = [];
    items.forEach((element) => {
      itemsChks.push({
        id: element.id,
        checked: false,
        mandatory: element.ProductsItems.mandatory,
        min: element.ProductsItems.min,
        max: element.ProductsItems.max,
        price: element.price,
      });
    });

    setCheckbox(itemsChks);
  }, []);


  const handleSubItemSelect = (id, needed, max) => {
    setCheckbox(() => {
      const newCheckbox = [...checkBoxs];
      let neededSelected = 0;
      newCheckbox.forEach((subItem) => {
        if (subItem.id === id) {
          if (needed && !subItem.checked) {
            const checkboxMandatory = [...checkBoxs].filter((x) => x.checked === true);
            neededSelected = checkboxMandatory.length;
            if (checkboxMandatory !== undefined && checkboxMandatory.length === max) {
              newCheckbox.forEach((subItemMandatory) => {
                subItemMandatory.checked = false;
                setMinSelect(1);
              });
            }
          }
          subItem.checked = !subItem.checked;

          const item = items.filter((x) => x.id === id);

          if (item) {
            if (subItem.checked) {
              if (needed) {
                if (neededSelected < max) {
                  setMinSelect(minSelect + 1);
                  onCheck(subItem);
                }
              } else {
                setMinSelect(minSelect + 1);
                onCheck(subItem);
              }
            } else {
              setMinSelect(minSelect - 1);
              onUnCheck(subItem);
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

            {minSelect}
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
          {checkBoxs && checkBoxs.filter((x) => x.id === item.id).map((cb) => (
            <CheckBox
              key={cb.id}
              value={cb.checked}
              onValueChange={() => {
                handleSubItemSelect(cb.id, cb.mandatory, cb.max);
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
  onUnCheck: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
};
