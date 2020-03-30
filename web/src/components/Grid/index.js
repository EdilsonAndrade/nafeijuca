import React from 'react';

import MUIDataTable from 'mui-datatables';

export default function Grid({ handleRowSelect, handleRowDelete, ...rest }) {
  const options = {
    filterType: 'checkbox',
    selectableRows: 'single',
    selectableRowsOnClick: true,
    onRowsSelect: handleRowSelect,
    onRowsDelete: handleRowDelete,
    rowsPerPage: 5,
    print: false,
    selectTableRows: 'single',
    selectableRowsHeader: false,
    rowsPerPageOptions: [2, 5, 15, 30],
    textLabels: {
      body: {
        noMatch: 'Desculpe, nenhum registro encontrado',
      },
      pagination: {
        next: 'Proxima pagina',
        previous: 'Voltar pagina',
        rowsPerPage: 'Linhas por página',
        displayRows: 'de',
      },
      filter: {
        all: 'TODOS',
        title: 'FILTROS',
        reset: 'RESETAR',
      },
      selectedRows: {
        text: 'linhas(s) selecionadas',
        delete: 'Excluir',
        deleteAria: 'Excluir linha selecionada',
      },
    },
  };

  return (
    <span>
      <MUIDataTable {...rest} options={options} />
    </span>
  );
}
