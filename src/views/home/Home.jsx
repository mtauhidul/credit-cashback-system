import { CircularProgress, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { typeBasedData } from '../../utils/db';
import styles from './home.module.scss';

export default function Home() {
  const [rows, setRows] = useState([]);

  const getTopRowItems = async () => {
    const response = await typeBasedData();
    if (response.length > 0) {
      setRows(response);
    }
  };

  useEffect(() => {
    getTopRowItems();
  }, []);

  // Type based implementation
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  useEffect(() => {
    const categories = [
      'Restaurants',
      'Grocery Stores',
      'Gas Stations',
      'Travel',
      'Streaming Services',
      'Gym Memberships',
      'Transit',
      'Medical Stores',
    ];

    const newRows = [...rows];
    newRows.map((newRow, index) => {
      return newRow.type === categories[index];
    });
    setRows(newRows);
  }, []);

  const d = new Date();
  let currentMonth = month[d.getMonth()];

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (searchText) {
      const newRows = [...rows];
      const filteredRows = newRows.filter((newRow) =>
        newRow.card?.toLowerCase().includes(searchText?.toLowerCase())
      );
      setRows(filteredRows);
    } else {
      getTopRowItems();
    }
  }, [searchText]);

  return (
    <main className={styles.mainTableContainer}>
      <div className={styles.mainTableHeader}>
        <h1
          style={{
            textTransform: 'capitalize',
            wordSpacing: '10px',
            fontSize: '44px',
          }}>
          Cashback categories
        </h1>
      </div>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <br />

        <TextField
          sx={{ width: '100%', maxWidth: '960px' }}
          id='outlined-basic'
          label='Search card'
          variant='outlined'
          onChange={(e) => setSearchText(e.target.value)}
        />
        <br />
        <Table sx={{ minWidth: 650 }} aria-label='credit table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Type</TableCell>
              <TableCell align='center'>Month</TableCell>
              <TableCell align='center'>Card</TableCell>
              <TableCell align='center'>Cashback</TableCell>
            </TableRow>
          </TableHead>
          {rows ? (
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow
                    key={row.type}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell
                      style={{
                        color: '#1876D1',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                      }}
                      as={Link}
                      to={`/table/${row.type.toLowerCase()}`}
                      align='center'
                      component='th'
                      scope='row'>
                      {row?.type}
                    </TableCell>
                    <TableCell align='center'>{currentMonth}</TableCell>
                    <TableCell align='center'>{row?.card}</TableCell>
                    <TableCell align='center'>{row?.cashback}%</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'center',
                textAlign: 'center',
                margin: '50px auto',
              }}>
              <CircularProgress />
            </Box>
          )}
        </Table>
      </TableContainer>
    </main>
  );
}
