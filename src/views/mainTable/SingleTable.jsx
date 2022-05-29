import SortIcon from '@mui/icons-material/Sort';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Button, IconButton, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { default as React, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './mainTable.module.scss';
import TablePaginationDemo from './TablePaginationDemo';

const SingleTable = ({
  month,
  searchData,
  rows,
  listedFeedbacksUpVotes,
  listedFeedbacksDownVotes,
  allUsers,
  userId,
  addUpVote,
  addDownVote,
  type,
  setSearchText,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div style={{ marginTop: '80px' }}>
      <div className={styles.mainTableHeader}>
        <h1
          style={{
            textTransform: 'capitalize',
            wordSpacing: '10px',
            fontSize: '44px',
          }}>
          {type.replace(/_/g, ' ')} - {month}
        </h1>
      </div>
      <br />

      <TextField
        sx={{ width: '100%', maxWidth: '960px' }}
        id='outlined-basic'
        label='Search'
        variant='outlined'
        onChange={(e) => setSearchText(e.target.value)}
      />
      <br />
      <br />
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='credit table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>User ID</TableCell>
              <TableCell align='center'>Month</TableCell>
              <TableCell align='center'>
                <Button
                  sx={{ textTransform: 'capitalize' }}
                  onClick={() => searchData('Cards')}
                  endIcon={<SortIcon />}>
                  Card
                </Button>
              </TableCell>
              <TableCell align='center'>
                <Button
                  sx={{ textTransform: 'capitalize' }}
                  onClick={() => searchData('Cashback')}
                  endIcon={<SortIcon />}>
                  Cashback
                </Button>
              </TableCell>
              <TableCell align='center'>
                <Button
                  sx={{ textTransform: 'capitalize' }}
                  onClick={() => searchData('Feedbacks')}
                  endIcon={<SortIcon />}>
                  UpVotes
                </Button>
              </TableCell>
              <TableCell align='center'>DownVotes</TableCell>
              <TableCell align='right' className={styles.thLast}>
                Feedback
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell
                    as={Link}
                    to={`/dashboard/${row?.userId}`}
                    sx={{
                      minWidth: '100px',
                      color: 'var(--PRIMARY) ',
                      fontWeight: '500',
                    }}
                    align='center'
                    component='th'
                    scope='row'>
                    {allUsers.find((user) => user.id === row.userId)?.userName}{' '}
                    ({allUsers.find((user) => user.id === row.userId)?.points})
                  </TableCell>
                  <TableCell align='center'>{row.month}</TableCell>
                  <TableCell align='center'>{row.card}</TableCell>
                  <TableCell align='center'>{row.cashback}%</TableCell>
                  <TableCell align='center'>{row.upVote}</TableCell>
                  <TableCell align='center'>{row.downVote}</TableCell>
                  <TableCell className={styles.tdLast} align='right'>
                    <IconButton
                      sx={{
                        color: listedFeedbacksUpVotes(row.id) && '#1876D0',
                      }}
                      disabled={
                        row.userId === userId ||
                        listedFeedbacksDownVotes(row.id)
                          ? true
                          : false
                      }
                      onClick={() => addUpVote(row.id, row.userId)}
                      aria-label='delete'>
                      <ThumbUpIcon />
                    </IconButton>
                    <IconButton
                      sx={{
                        color: listedFeedbacksDownVotes(row.id) && '#1876D0',
                      }}
                      disabled={
                        row.userId === userId || listedFeedbacksUpVotes(row.id)
                          ? true
                          : false
                      }
                      onClick={() => addDownVote(row.id, row.userId)}
                      aria-label='delete'>
                      <ThumbDownIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            <TablePaginationDemo
              rows={rows}
              rowsPerPage={rowsPerPage}
              page={page}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SingleTable;
