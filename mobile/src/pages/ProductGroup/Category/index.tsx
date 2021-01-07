import React from 'react';
import PropTypes from 'prop-types';
import { ViewContainer, CategoryTitleText } from './styles';


export default function Category({ item }) {
  return (
    <ViewContainer>
      <CategoryTitleText>{item.name}</CategoryTitleText>
    </ViewContainer>
  );
}

Category.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

Category.defaultProps = {
  item: {},
};
