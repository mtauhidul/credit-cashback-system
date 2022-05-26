import AdbIcon from '@mui/icons-material/Adb';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectIsAuthenticated,
  selectName,
  setEmail,
  setFeedbacks,
  setId,
  setIsAuthenticated,
  setName,
  setPoints,
  setRows,
  setUserName,
} from '../../store/slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    window.localStorage.removeItem('uid');
    window.localStorage.removeItem('token');
    dispatch(setName(''));
    dispatch(setUserName(''));
    dispatch(setEmail(''));
    dispatch(setId(''));
    dispatch(setIsAuthenticated(false));
    dispatch(setPoints(''));
    dispatch(setFeedbacks([]));
    dispatch(setRows([]));
    handleCloseUserMenu();
  };

  const name = useSelector(selectName);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const loggedUserId = window.localStorage.getItem('uid');

  return (
    <AppBar position='static'>
      <Container>
        <Toolbar disableGutters>
          <CreditScoreIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />
          <Typography
            variant='h6'
            noWrap
            component='a'
            as={Link}
            to=''
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            CASHBACK
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'>
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography as={Link} to={''} textAlign='center'>
                  Home
                </Typography>
              </MenuItem>
              {!isAuthenticated && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography as={Link} to={'auth'} textAlign='center'>
                    Login
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            CASHBACK
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              as={Link}
              to={''}
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
              }}>
              Home
            </Button>

            {name && (
              <Button
                sx={{
                  my: 2,
                  display: 'block',
                  mr: 3,
                  color: '#011E3C',
                  cursor: 'auto',
                  ml: 1,
                }}>
                {name}
              </Button>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={name} src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {isAuthenticated && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    as={Link}
                    to={`/dashboard/${loggedUserId}`}
                    textAlign='center'>
                    Dashboard
                  </Typography>
                </MenuItem>
              )}
              {!isAuthenticated && (
                <Button
                  as={Link}
                  to={'auth'}
                  onClick={handleCloseNavMenu}
                  sx={{
                    mr: 2,
                    display: 'block',
                  }}>
                  Login
                </Button>
              )}
              {isAuthenticated && (
                <MenuItem onClick={handleLogOut}>
                  <Typography as={Link} to={''} textAlign='center'>
                    Logout
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
