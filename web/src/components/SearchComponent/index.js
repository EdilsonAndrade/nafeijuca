import React from 'react';
import { MdSearch } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Container, SearchInput } from './styles';

export default function SearchComponent({ placeHolder }) {
  return (
    <Container>
      <div>
        <MdSearch color="#ccc" size={22} />
        <SearchInput placeholder={placeHolder} />
      </div>
    </Container>
  );
}

SearchComponent.propTypes = {
  placeHolder: PropTypes.string,
};

SearchComponent.defaultProps = {
  placeHolder: '',
};
