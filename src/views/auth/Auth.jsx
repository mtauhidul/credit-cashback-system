import GoogleIcon from '@mui/icons-material/Google';
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { selectAllUsers } from '../../store/slices/allUsersSlice';
import { googleSingIn, login, register } from '../../utils/auth';
import { validator } from '../../utils/authHelper';
import { createNewUser } from '../../utils/db';
import styles from './auth.module.scss';

const Auth = ({ getSpecificUser, getAllUsers, getAllRows }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [authType, setAuthType] = useState('Login');
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
    id: '',
    isAuthenticated: false,
  });

  const users = useSelector(selectAllUsers);

  const formHelper = (property, value) => {
    const response = validator(property, value);
    if (response !== false) {
      setError('');
      if (property === 'name') {
        setUser({ ...user, name: response });
      } else if (property === 'userName') {
        const userNameCheck = users.find((user) => user.userName === response);

        if (!userNameCheck) {
          setUser({ ...user, userName: response });
        } else {
          setError('User name already exists');
        }
      } else if (property === 'email') {
        setUser({ ...user, email: response });
      } else if (property === 'password') {
        setUser({ ...user, password: response });
      }
    } else {
      if (property === 'name') {
        setError('Name length must be greater than 7');
      } else if (property === 'userName') {
        setError('User name length must be greater than 5');
      } else if (property === 'email') {
        setError('Email is not valid');
      } else if (property === 'password') {
        setError('Password is not strong enough');
      }
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const authForm = document.getElementById('authForm');
    if (authType === 'Registration') {
      if (
        user.name &&
        user.userName &&
        user.email &&
        user.password &&
        error === ''
      ) {
        const handleRegister = async () => {
          const response = await register(user.email, user.password);
          if (response.uid) {
            await createNewUser(
              {
                name: user.name,
                userName: user.userName,
                email: user.email,
                points: 0,
                rows: [],
                feedbacks: [],
              },
              response.uid
            );
          }
          return response;
        };
        const result = handleRegister();
        toast.promise(result, {
          loading: 'Submitting...',
          success: (data) => {
            getAllUsers();
            getAllRows();
            if (!data.uid) throw new Error(data);
            return 'Registration successful';
          },
          error: (error) => {
            return `${error.message.slice(9, -1)}`;
          },
        });
        authForm.reset();
      } else {
        setError('Please enter valid information');
      }
    } else if (authType === 'Login') {
      if (user.email && user.password && error === '') {
        const handleLogin = async () => {
          const response = await login(user.email, user.password);
          return response;
        };
        const result = handleLogin();
        toast.promise(result, {
          loading: 'Submitting...',
          success: (data) => {
            if (!data.uid) throw new Error(data);
            window.localStorage.setItem('uid', data.uid);
            window.localStorage.setItem('token', data.accessToken);

            getAllUsers();
            getAllRows();
            getSpecificUser();

            if (location.pathname.slice(1) === 'auth') {
              navigate('/');
            }

            return 'Login successful';
          },
          error: (error) => {
            return `${error.message.slice(9, -1)}`;
          },
        });
        authForm.reset();
      } else {
        setError('Please enter valid information');
      }
    }
  };

  const handleGoogleSign = async () => {
    const response = await googleSingIn();
    if (response.uid) {
      getSpecificUser();
      if (location.pathname.slice(1) === 'auth') {
        navigate('/');
      }
    }
  };

  return (
    <main className={styles.container}>
      <ReactTooltip />
      <form id='authForm'>
        <h2>{authType}</h2>
        <br />
        {error !== '' && (
          <p style={{ color: 'red', fontWeight: '500' }}>{error}</p>
        )}
        <br />
        {authType === 'Registration' && (
          <TextField
            required
            className={styles.textField}
            id='outlined-basic'
            label='Name'
            variant='outlined'
            onBlur={(e) => formHelper('name', e.target.value)}
          />
        )}
        {authType === 'Registration' && (
          <TextField
            required
            className={styles.textField}
            id='outlined-basic'
            label='User Name'
            variant='outlined'
            onBlur={(e) => formHelper('userName', e.target.value)}
          />
        )}
        <TextField
          required
          className={styles.textField}
          id='outlined-basic'
          label='Email'
          variant='outlined'
          onBlur={(e) => formHelper('email', e.target.value)}
        />
        <TextField
          required
          data-html={true}
          data-tip='<ul><li> ● At least eight characters long</li><li> ● Must have a capital letter</li><li> ● Must have a lowercase letter</li><li> ● Must have a special character</li><li> ● Must have a number</li></ul>'
          type='password'
          className={styles.textField}
          id='outlined-basic'
          label='Password'
          variant='outlined'
          onBlur={(e) => formHelper('password', e.target.value)}
        />
        <Button
          type='submit'
          onClick={(e) => formSubmit(e)}
          variant='contained'>
          Submit
        </Button>
        <br />
        {authType === 'Registration' ? (
          <small>
            Already registered?{' '}
            <span
              className={styles.clickable}
              onClick={() => setAuthType('Login')}>
              login
            </span>{' '}
            here
          </small>
        ) : (
          <small>
            Not registered?{' '}
            <span
              className={styles.clickable}
              onClick={() => setAuthType('Registration')}>
              register
            </span>{' '}
            here
          </small>
        )}
        <br />
        {authType === 'Login' && (
          <h3>
            Forgot password? <Link to='/retrieve'>click here</Link>
          </h3>
        )}
        <br />
        <Button
          onClick={() => handleGoogleSign()}
          variant='outlined'
          endIcon={<GoogleIcon />}>
          Authenticate using Google
        </Button>
      </form>
    </main>
  );
};

export default Auth;
