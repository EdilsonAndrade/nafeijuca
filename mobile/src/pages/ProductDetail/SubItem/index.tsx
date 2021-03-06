import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import {
  SubItemHeaderContainer, InfoTitleView, TitleText, QuantityText, MandatoryView, MandatoryText, ItemView, ItemsContainer, CheckBoxItem,
} from './styles';

const SubItem = ({
  items, mandatory, onUnCheck, onCheck, clearMandatory,
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
        disabled: false,
      });
    });

    setCheckbox(itemsChks);
  }, []);


  const handleSubItemSelect = (id, needed, max, checking) => {
    let neededSelected = 0;
    let newCheckbox = [];
    newCheckbox = [...checkBoxs];

    newCheckbox.forEach((subItem) => {
      if (checking) {
        subItem.disabled = false;
        setMinSelect(minSelect - 1);
      } else {
        setMinSelect(minSelect + 1);
      }
      if (subItem.id === id) {
        if (needed && !subItem.checked) {
          const checkboxMandatory = [...checkBoxs].filter((x) => x.checked === true);

          neededSelected = checkboxMandatory.length;
        }

        subItem.checked = !subItem.checked;

        const item = items.filter((x) => x.id === id);

        if (item) {
          if (subItem.checked) {
            if (needed) {
              if (neededSelected < max) {
                onCheck(subItem);
              }
            } else {
              onCheck(subItem);
            }
          } else {
            onUnCheck(subItem);
          }
        }
      }
    });

    if (neededSelected + 1 >= max) {
      newCheckbox = newCheckbox.map((cb) => {
        if (cb.mandatory) {
          if (!cb.checked) {
            cb.disabled = true;
          } else {
            cb.disabled = false;
          }
        }

        return cb;
      });
    } else {
      newCheckbox = newCheckbox.map((cb) => {
        cb.disabled = false;
        return cb;
      });
    }
    setCheckbox(newCheckbox);
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
            <CheckBoxItem
              key={cb.id}
              value={cb.checked}
              onValueChange={() => {
                handleSubItemSelect(cb.id, cb.mandatory, cb.max, cb.checked);
              }}
              tintColors={{ true: '#36b254', false: '#36b254' }}
              disabled={cb.disabled}
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
