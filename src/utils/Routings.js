import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { selectId, selectIsAuthenticated } from '../store/slices/authSlice';
import Auth from '../views/auth/Auth';
import Retrieve from '../views/auth/Retrieve';
import Dashboard from '../views/dashboard/Dashboard';
import Home from '../views/home/Home';
import MainTable from '../views/mainTable/MainTable';

const Routings = ({ getAllRows, getAllUsers, getSpecificUser }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const id = useSelector(selectId);
  const storedId = window.localStorage.getItem('uid');
  const storedToken = window.localStorage.getItem('token');

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route
        path='auth'
        element={
          <Auth
            getAllRows={getAllRows}
            getAllUsers={getAllUsers}
            getSpecificUser={getSpecificUser}
          />
        }
      />
      <Route path='retrieve' element={<Retrieve />} />
      <Route path='dashboard'>
        <Route
          path=':userid'
          element={
            <Dashboard
              getAllRows={getAllRows}
              getAllUsers={getAllUsers}
              getSpecificUser={getSpecificUser}
            />
          }
        />
      </Route>
      <Route path='table'>
        <Route
          path=':type'
          element={
            <MainTable
              getAllRows={getAllRows}
              getAllUsers={getAllUsers}
              getSpecificUser={getSpecificUser}
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default Routings;
