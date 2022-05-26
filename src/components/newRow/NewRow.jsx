import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectId, selectIsAuthenticated } from '../../store/slices/authSlice';
import { createNewRow } from '../../utils/db';
import styles from './newRow.module.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function NewRow({ getSpecificUser, getAllUsers, getAllRows }) {
  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const mainId = useSelector(selectId);
  const storedId = window.localStorage.getItem('uid');
  const storedToken = window.localStorage.getItem('token');

  const months = [
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
  const currentMonth = months[d.getMonth()];
  const currentYear = new Date().getFullYear();
  const nextMonth = months[d.getMonth() + 1];
  const nextNextMonth = months[d.getMonth() + 2];

  const currentMonths = [];
  currentMonths.push(currentMonth);
  currentMonths.push(nextMonth);
  currentMonths.push(nextNextMonth);

  const { type } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (isAuthenticated && mainId === storedId && storedToken) {
      setOpen(true);
    } else {
      navigate('/auth');
    }
  };
  const handleClose = () => setOpen(false);
  const uid = window.localStorage.getItem('uid');
  const [newRow, setNewRow] = useState({
    year: currentYear,
    month: '',
    card: '',
    cashback: null,
    type: type.replace(/_/g, ' '),
    userId: uid,
    upVote: 0,
    downVote: 0,
    points: 0,
  });

  const handleChange = (e) => {
    setNewRow({ ...newRow, month: e.target.value });
  };

  const handleSubmit = async () => {
    toast.loading('Submitting...');
    if (newRow.month && newRow.card && newRow.cashback) {
      const response = await createNewRow({
        ...newRow,
        points: newRow.cashback * 2,
      });
      if (!response) {
        toast.dismiss();
        toast.success('Successfully added row');
        handleClose();
        setNewRow({
          year: currentYear,
          month: '',
          card: '',
          cashback: null,
          type: type.replace(/_/g, ' '),
          userId: uid,
          upVote: 0,
          downVote: 0,
          points: 0,
        });
        getAllUsers();
        getAllRows();
        getSpecificUser();
      }
    } else {
      toast.dismiss();
      toast.error('Invalid data');
    }
  };

  return (
    <div>
      <Button
        variant='contained'
        sx={{
          width: 240,
          height: 50,
          marginTop: 2,
          color: 'white',
        }}
        onClick={handleOpen}>
        Add new row
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h5' component='h2'>
            Cashback information
          </Typography>
          <hr />
          <br />
          <div className={styles.modalInputWrapper}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Month</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={newRow.month}
                label='Month'
                onChange={handleChange}>
                {currentMonths.map((month, i) => {
                  return (
                    <MenuItem key={month + i} value={`${month}`}>
                      {month}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              value={newRow.card}
              id='outlined-basic'
              label='Card'
              variant='outlined'
              onChange={(e) =>
                setNewRow({
                  ...newRow,
                  card: e.target.value,
                })
              }
            />
            <TextField
              value={newRow.cashback}
              id='outlined-basic'
              label='Cashback'
              variant='outlined'
              onChange={(e) =>
                setNewRow({
                  ...newRow,
                  cashback: e.target.value,
                })
              }
            />
            <br />
            <Button
              onClick={() => handleSubmit()}
              sx={{ height: 50, fontSize: 20 }}
              variant='contained'>
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
