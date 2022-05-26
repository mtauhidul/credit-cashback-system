import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import styles from './editProfile.module.scss';

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

export default function EditProfile({
  profile,
  setProfile,
  updateCurrentProfile,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const uid = window.localStorage.getItem('uid');

  const handleSubmit = () => {
    updateCurrentProfile();
    handleClose();
  };

  return (
    <div>
      {uid && (
        <Button
          variant='contained'
          sx={{
            width: '240px',
            height: 50,
            marginTop: 2,
            color: 'white',
          }}
          onClick={handleOpen}>
          Edit Profile
        </Button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h5' component='h2'>
            Edit Profile
          </Typography>
          <hr />
          <br />
          <div className={styles.modalInputWrapper}>
            <TextField
              value={profile.name}
              id='outlined-basic'
              label='Name'
              variant='outlined'
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <TextField
              value={profile.userName}
              id='outlined-basic'
              label='User Name'
              variant='outlined'
              onChange={(e) =>
                setProfile({ ...profile, userName: e.target.value })
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
