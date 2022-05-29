import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EditProfile from '../../components/editProfile/EditProfile';
import { selectAllUsers } from '../../store/slices/allUsersSlice';
import {
  selectId,
  selectName,
  selectUserName,
} from '../../store/slices/authSlice';
import { updateProfile } from '../../utils/db';
import styles from './dashboard.module.scss';

const Dashboard = ({ getSpecificUser, getAllUsers, getAllRows }) => {
  const name = useSelector(selectName);
  const userName = useSelector(selectUserName);
  const id = useSelector(selectId);

  const allUsers = useSelector(selectAllUsers);

  useEffect(() => {
    setProfile({
      name: name,
      userName: userName,
    });
  }, [name, userName]);

  const [profile, setProfile] = useState({
    name: name,
    userName: userName,
  });

  const updateCurrentProfile = async () => {
    const response = await updateProfile(id, profile);
    if (!response) {
      getAllUsers();
      getAllRows();
      getSpecificUser();
    }
  };

  useEffect(() => {
    getAllUsers();
    getAllRows();
    getSpecificUser();
  }, [getAllRows, getAllUsers, getSpecificUser]);

  const { userid } = useParams();

  const user = allUsers.find((user) => user.id === userid);

  const loggedUserId = window.localStorage.getItem('uid');

  return (
    <main className={styles.dashboard}>
      <main className={styles.sidebar}>
        <section className={styles.topSection}>
          <Avatar
            className={styles.avatar}
            alt={user?.name}
            src='/static/images/avatar/1.jpg'
            sx={{ width: 100, height: 100, fontSize: '60px' }}
          />
          <div className={styles.userDetails}>
            <h2>{user?.name}</h2>
            <div className={styles.pointsBox}>{user?.points} POINTS</div>
          </div>
        </section>
        <section className={styles.bottomSection}>
          {id === user?.id && <h3>User-Name : {user?.userName}</h3>}
          {id === user?.id && <h3>User Email : {user?.email}</h3>}
          <h3>User Added Rows : {user?.rows?.length}</h3>
          <h3>User Given Feedbacks : {user?.feedbacks?.length}</h3>
        </section>

        {loggedUserId === userid && (
          <EditProfile
            profile={profile}
            setProfile={setProfile}
            updateCurrentProfile={updateCurrentProfile}
          />
        )}
      </main>
    </main>
  );
};

export default Dashboard;
