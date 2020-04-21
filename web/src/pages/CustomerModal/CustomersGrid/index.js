import React from 'react';
import PropTypes from 'prop-types';
import Grid from '~/components/Grid';

export default function CustomersGrid({ data, handleRowSelect, rowDelete }) {
  const columns = [
    {
      name: 'id',
      label: 'Id',
    },
    {
      name: 'name',
      label: 'Nome',
    },
    {
      name: 'phone',
      label: 'Telefone',
    },
    {
      name: 'email',
      label: 'E-mail',
    },
  ];
  return (
    <Grid
      data={data}
      columns={columns}
      handleRowSelect={handleRowSelect}
      handleRowDelete={rowDelete}
      rowsPerPage={2}
    />
  );
}

CustomersGrid.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.none),
    PropTypes.node,
  ]),
};

CustomersGrid.defaultProps = {
  data: [],
};
