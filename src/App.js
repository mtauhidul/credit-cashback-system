import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore';
import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { setAllRows } from './store/slices/allRowsSlice';
import { setAllUsers } from './store/slices/allUsersSlice';
import {
  setEmail,
  setFeedbacks,
  setId,
  setIsAuthenticated,
  setName,
  setPoints,
  setRows,
  setUserName,
} from './store/slices/authSlice';
import { app } from './utils/firebase.config';
import Routings from './utils/Routings';

const App = () => {
  const db = getFirestore(app);
  const dispatch = useDispatch();

  const getAllRows = async () => {
    const querySnapshot = await getDocs(collection(db, 'rows'));
    const rowList = [];
    querySnapshot.forEach((doc) => {
      const newObject = {
        id: doc.id,
        userId: doc.data().userId,
        type: doc.data().type,
        month: doc.data().month,
        card: doc.data().card,
        cashback: doc.data().cashback,
        upVote: doc.data().upVote,
        downVote: doc.data().downVote,
        points: doc.data().points,
        year: doc.data().year,
      };
      rowList.push(newObject);
    });
    dispatch(setAllRows([]));
    return dispatch(setAllRows(rowList));
  };

  const getAllUsers = async () => {
    const userList = [];
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach((doc) => {
      const newObject = {
        id: doc.id,
        name: doc.data().name,
        userName: doc.data().userName,
        email: doc.data().email,
        points: doc.data().points,
        rows: doc.data().rows,
        feedbacks: doc.data().feedbacks,
      };

      userList.push(newObject);
    });
    return dispatch(setAllUsers(userList));
  };

  const getSpecificUser = async () => {
    const id = window.localStorage.getItem('uid');
    await onSnapshot(doc(db, 'users', id), (doc) => {
      const { name, userName, email, rows, feedbacks, points } = doc.data();
      dispatch(setName(name));
      dispatch(setUserName(userName));
      dispatch(setEmail(email));
      dispatch(setId(id));
      dispatch(setIsAuthenticated(true));
      dispatch(setRows(rows));
      dispatch(setFeedbacks(feedbacks));
      dispatch(setPoints(points));
    });
  };

  useEffect(() => {
    getSpecificUser();
    getAllRows();
    getAllUsers();
  }, []);

  return (
    <main>
      <Toaster />
      <Header />
      <Routings
        getAllRows={getAllRows}
        getAllUsers={getAllUsers}
        getSpecificUser={getSpecificUser}
      />
      <Footer />
    </main>
  );
};

export default App;
