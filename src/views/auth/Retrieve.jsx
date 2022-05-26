import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { resetAccount } from '../../utils/auth';
import styles from './auth.module.scss';

const Retrieve = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await resetAccount(email);
    if (!response) {
      setStep(2);
    }
  };
  return (
    <main className={styles.container}>
      <form>
        <h2>Retrieve Account</h2>
        <br />
        <br />
        {step === 1 && (
          <TextField
            className={styles.textField}
            id='outlined-basic'
            label='Registered email'
            variant='outlined'
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        {step === 2 && <h2>Please check your email</h2>}

        <br />

        {step === 1 && (
          <Button onClick={(e) => handleSubmit(e)} variant='contained'>
            Submit
          </Button>
        )}
        <br />
        <Button as={Link} to='/auth' variant='text'>
          Back
        </Button>
      </form>
    </main>
  );
};

export default Retrieve;
