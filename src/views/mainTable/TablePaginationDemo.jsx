import TablePagination from '@mui/material/TablePagination';
import * as React from 'react';

export default function TablePaginationDemo({
  rows,
  page,
  handleChangePage,
  rowsPerPage,
  handleChangeRowsPerPage,
}) {
  return (
    <TablePagination
      sx={{ overflow: 'visible' }}
      component='div'
      count={rows.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
