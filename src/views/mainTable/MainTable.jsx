import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import NewRow from '../../components/newRow/NewRow';
import { selectAllRows } from '../../store/slices/allRowsSlice';
import { selectAllUsers } from '../../store/slices/allUsersSlice';
import {
  selectFeedbacks,
  selectId,
  selectIsAuthenticated,
} from '../../store/slices/authSlice';
import { downVote, upVote } from '../../utils/db';
import styles from './mainTable.module.scss';
import SingleTable from './SingleTable';

export default function MainTable({
  getSpecificUser,
  getAllUsers,
  getAllRows,
}) {
  const { type } = useParams();
  const [rows, setRows] = useState([]);

  const [searchText, setSearchText] = useState('');

  const [month1, setMonth1] = useState([]);
  const [month2, setMonth2] = useState([]);
  const [month3, setMonth3] = useState([]);

  const currentYear = new Date().getFullYear();

  const [key, setKey] = useState('');

  const allRows = useSelector(selectAllRows);
  const allUsers = useSelector(selectAllUsers);
  const userId = useSelector(selectId);
  const feedbacks = useSelector(selectFeedbacks);

  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const mainId = useSelector(selectId);
  const storedId = window.localStorage.getItem('uid');
  const storedToken = window.localStorage.getItem('token');

  const addUpVote = async (id, ownerId) => {
    if (isAuthenticated && mainId === storedId && storedToken) {
      const response = await upVote(id, userId, ownerId);
      if (!response) {
        getAllUsers();
        getAllRows();
        getSpecificUser();
      }
    } else {
      navigate('/auth');
    }
  };

  const addDownVote = async (id, ownerId) => {
    if (isAuthenticated && mainId === storedId && storedToken) {
      const response = await downVote(id, userId, ownerId);
      if (!response) {
        getAllUsers();
        getAllRows();
        getSpecificUser();
      }
    } else {
      navigate('/auth');
    }
  };

  const listedFeedbacks = (rowId) => {
    const check = feedbacks.find((feedback) => feedback === rowId);
    return check;
  };

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
  const currentMonth = month[d.getMonth()];
  const nextMonth = month[d.getMonth() + 1];
  const nextNextMonth = month[d.getMonth() + 2];

  useEffect(() => {
    if (allRows.length > 0) {
      const currentYearRows = allRows.filter((row) => row.year === currentYear);
      const filteredRows = currentYearRows.filter((row) =>
        row.type.includes(type?.replace(/_/g, ' '))
      );
      filteredRows.sort((a, b) => b?.points - a?.points);

      setRows(filteredRows);

      const currentMonthRows = filteredRows.filter(
        (row) => row.month === currentMonth
      );
      setMonth1(currentMonthRows);
      console.log(nextMonth);
      const nextMonthRows = filteredRows.filter(
        (row) => row.month === nextMonth
      );
      setMonth2(nextMonthRows);
      const nextNextMonthRows = filteredRows.filter(
        (row) => row.month === nextNextMonth
      );
      setMonth3(nextNextMonthRows);
      console.log(filteredRows);
      console.log(nextMonthRows);
    }
  }, [allRows, currentMonth, type]);

  useEffect(() => {
    getAllUsers();
    getAllRows();
    getSpecificUser();
  }, []);

  const searchData = (search) => {
    setKey(search);
    if (search === 'Cashback') {
      const newRows = [...rows];
      if (key === 'Cashback') {
        newRows.sort((a, b) => a?.cashback - b?.cashback);
        setRows(newRows);
        setKey('');
      } else {
        newRows.sort((a, b) => b?.cashback - a?.cashback);
        setRows(newRows);
      }
    } else if (search === 'Cards') {
      const newRows = [...rows];
      if (key === 'Cards') {
        function SortArray(x, y) {
          return y.card.localeCompare(x.card);
        }
        const cardSortedArray = newRows.sort(SortArray);
        setRows(cardSortedArray);
        setKey('');
      } else {
        function SortArray(x, y) {
          return x.card.localeCompare(y.card);
        }
        const cardSortedArray = newRows.sort(SortArray);
        setRows(cardSortedArray);
      }
    } else if (search === 'Feedbacks') {
      const newRows = [...rows];
      if (key === 'Feedbacks') {
        newRows.sort((a, b) => a?.upVote - b?.upVote);
        setRows(newRows);
        setKey('');
      } else {
        newRows.sort((a, b) => b?.upVote - a?.upVote);
        setRows(newRows);
      }
    }
  };

  useEffect(() => {
    if (searchText) {
      const newRows = [...rows];
      const filteredRows = newRows.filter((newRow) =>
        newRow.card.toLowerCase().includes(searchText.toLowerCase())
      );
      setRows(filteredRows);
    } else {
      getAllRows();
    }
  }, [searchText]);

  return (
    <main className={styles.mainTableContainer}>
      <NewRow
        getAllRows={getAllRows}
        getAllUsers={getAllUsers}
        getSpecificUser={getSpecificUser}
      />
      <br />

      <SingleTable
        month={currentMonth}
        searchData={searchData}
        rows={month1}
        listedFeedbacks={listedFeedbacks}
        allUsers={allUsers}
        userId={userId}
        addUpVote={addUpVote}
        addDownVote={addDownVote}
        type={type}
        setSearchText={setSearchText}
      />

      <SingleTable
        month={nextMonth}
        searchData={searchData}
        rows={month2}
        listedFeedbacks={listedFeedbacks}
        allUsers={allUsers}
        userId={userId}
        addUpVote={addUpVote}
        addDownVote={addDownVote}
        type={type}
        setSearchText={setSearchText}
      />

      <SingleTable
        month={nextNextMonth}
        searchData={searchData}
        rows={month3}
        listedFeedbacks={listedFeedbacks}
        allUsers={allUsers}
        userId={userId}
        addUpVote={addUpVote}
        addDownVote={addDownVote}
        type={type}
        setSearchText={setSearchText}
      />
    </main>
  );
}
