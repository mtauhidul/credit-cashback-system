import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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

  const d = new Date();
  let currentMonth = month[d.getMonth()];

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
        <Table sx={{ minWidth: 650 }} aria-label='credit table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Type</TableCell>
              <TableCell align='center'>Month</TableCell>
              <TableCell align='center'>Card</TableCell>
              <TableCell align='center'>Cashback</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell
                style={{
                  color: '#1876D1',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
                as={Link}
                to='/table/restaurants'
                align='center'
                component='th'
                scope='row'>
                Restaurants
              </TableCell>
              <TableCell align='center'>{currentMonth}</TableCell>
              <TableCell align='center'>{rows[0]?.card}</TableCell>
              <TableCell align='center'>{rows[0]?.cashback}%</TableCell>
            </TableRow>

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell
                style={{
                  color: '#1876D1',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
                as={Link}
                to='/table/grocery_stores'
                align='center'
                component='th'
                scope='row'>
                Grocery Stores
              </TableCell>
              <TableCell align='center'>{currentMonth}</TableCell>
              <TableCell align='center'>{rows[1]?.card}</TableCell>
              <TableCell align='center'>{rows[1]?.cashback}%</TableCell>
            </TableRow>

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell
                style={{
                  color: '#1876D1',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
                as={Link}
                to='/table/gas_stations'
                align='center'
                component='th'
                scope='row'>
                Gas Stations
              </TableCell>
              <TableCell align='center'>{currentMonth}</TableCell>
              <TableCell align='center'>{rows[2]?.card}</TableCell>
              <TableCell align='center'>{rows[2]?.cashback}%</TableCell>
            </TableRow>

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell
                style={{
                  color: '#1876D1',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
                as={Link}
                to='/table/travel'
                align='center'
                component='th'
                scope='row'>
                Travel
              </TableCell>
              <TableCell align='center'>{currentMonth}</TableCell>
              <TableCell align='center'>{rows[3]?.card}</TableCell>
              <TableCell align='center'>{rows[3]?.cashback}%</TableCell>
            </TableRow>

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell
                style={{
                  color: '#1876D1',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
                as={Link}
                to='/table/streaming_services'
                align='center'
                component='th'
                scope='row'>
                Streaming Services
              </TableCell>
              <TableCell align='center'>{currentMonth}</TableCell>
              <TableCell align='center'>{rows[4]?.card}</TableCell>
              <TableCell align='center'>{rows[4]?.cashback}%</TableCell>
            </TableRow>

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell
                style={{
                  color: '#1876D1',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
                as={Link}
                to='/table/gym_memberships'
                align='center'
                component='th'
                scope='row'>
                Gym Memberships
              </TableCell>
              <TableCell align='center'>{currentMonth}</TableCell>
              <TableCell align='center'>{rows[5]?.card}</TableCell>
              <TableCell align='center'>{rows[5]?.cashback}%</TableCell>
            </TableRow>

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell
                style={{
                  color: '#1876D1',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
                as={Link}
                to='/table/transit'
                align='center'
                component='th'
                scope='row'>
                Transit
              </TableCell>
              <TableCell align='center'>{currentMonth}</TableCell>
              <TableCell align='center'>{rows[6]?.card}</TableCell>
              <TableCell align='center'>{rows[6]?.cashback}%</TableCell>
            </TableRow>

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell
                style={{
                  color: '#1876D1',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
                as={Link}
                to='/table/medical_stores'
                align='center'
                component='th'
                scope='row'>
                Medical Stores
              </TableCell>
              <TableCell align='center'>{currentMonth}</TableCell>
              <TableCell align='center'>{rows[7]?.card}</TableCell>
              <TableCell align='center'>{rows[7]?.cashback}%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}
