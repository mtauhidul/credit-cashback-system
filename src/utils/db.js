import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { app } from './firebase.config';

export const db = getFirestore(app);

export const createNewUser = async (user, id) => {
  try {
    const response = await setDoc(doc(db, 'users', id), {
      name: user.name,
      userName: user.userName,
      email: user.email,
      points: user.points,
      rows: user.rows,
      feedbacks: user.feedbacks,
    });
    return response;
  } catch (error) {
    return error.message;
  }
};

export const getUsers = async () => {
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
    return userList;
  });
  return userList;
};

// export const getUser = async (id) => {
//   try {
//     const docRef = doc(db, 'users', id);
//     const docSnap = await getDoc(docRef);
//     return docSnap.data();
//   } catch (error) {
//     return error.message;
//   }
// };

export const createNewRow = async (row) => {
  try {
    const response = await addDoc(collection(db, 'rows'), {
      month: row.month,
      card: row.card,
      cashback: row.cashback,
      type: row.type,
      userId: row.userId,
      upVote: row.upVote,
      downVote: row.downVote,
      points: row.points,
      year: row.year,
    });
    if (response.id) {
      const userRef = await doc(db, 'users', row.userId);
      const result = await updateDoc(userRef, {
        rows: arrayUnion(response.id),
      });
      await updateDoc(userRef, {
        points: increment(2),
      });

      return result;
    } else {
      return new Error('Failed to add new row! Please try again');
    }
  } catch (error) {
    return error.message;
  }
};

// export const getRows = async () => {
//   const querySnapshot = await getDocs(collection(db, 'rows'));
//   const rowList = [];
//   querySnapshot.forEach((doc) => {
//     const newObject = {
//       id: doc.id,
//       userId: doc.data().userId,
//       type: doc.data().type,
//       month: doc.data().month,
//       card: doc.data().card,
//       cashback: doc.data().cashback,
//       upVote: doc.data().upVote,
//       downVote: doc.data().downVote,
//     };
//     rowList.push(newObject);

//     return rowList;
//   });

//   return rowList;
// };

export const voteNow = async (rowId, userId, ownerId, type) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  const user = docSnap.data().feedbacks;
  const check = await user.find((feedback) => feedback?.rowId === rowId);

  const rowRef = await doc(db, 'rows', rowId);
  const userRef = await doc(db, 'users', userId);
  const ownerRef = await doc(db, 'users', ownerId);

  if (!check) {
    if (type === 'upVote') {
      await updateDoc(rowRef, {
        upVote: increment(1),
      });
      await updateDoc(rowRef, {
        points: increment(1),
      });
      await updateDoc(userRef, {
        feedbacks: arrayUnion({ rowId, type }),
      });
      await updateDoc(ownerRef, {
        points: increment(1),
      });
    } else {
      await updateDoc(rowRef, {
        downVote: increment(1),
      });
      await updateDoc(rowRef, {
        points: increment(-1),
      });
      await updateDoc(userRef, {
        feedbacks: arrayUnion({ rowId, type }),
      });
      await updateDoc(ownerRef, {
        points: increment(-1),
      });
    }
  } else {
    if (type === 'upVote') {
      await updateDoc(rowRef, {
        upVote: increment(-1),
      });
      await updateDoc(rowRef, {
        points: increment(-1),
      });
      await updateDoc(userRef, {
        feedbacks: arrayRemove({ rowId, type }),
      });
      await updateDoc(ownerRef, {
        points: increment(-1),
      });
    } else {
      await updateDoc(rowRef, {
        downVote: increment(-1),
      });
      await updateDoc(rowRef, {
        points: increment(1),
      });
      await updateDoc(userRef, {
        feedbacks: arrayRemove({ rowId, type }),
      });
      await updateDoc(ownerRef, {
        points: increment(1),
      });
    }
  }
  return false;
};

export const updateProfile = async (id, data) => {
  try {
    const userRef = doc(db, 'users', id);
    const response = await updateDoc(userRef, {
      name: data.name,
      userName: data.userName,
    });
    return response;
  } catch (error) {
    return error.message;
  }
};

export const updateUserPoints = async (id, points) => {
  try {
    const docRef = await doc(db, 'users', id);
    const response = await updateDoc(docRef, {
      points: points,
    });
    return response;
  } catch (error) {
    return error.message;
  }
};

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

export const typeBasedData = async () => {
  const d = new Date();
  let currentMonth = month[d.getMonth()];

  const topRow = [];

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
    return rowList;
  });

  const currentYear = new Date().getFullYear();

  const currentYearRows = rowList.filter((row) => row.year === currentYear);

  const sortedData = currentYearRows.sort((a, b) => b?.points - a?.points);
  const filteredData = sortedData.filter((data) => data.month === currentMonth);

  const restaurantsData = filteredData.find(
    (data) => data.type === 'restaurants'
  );
  if (restaurantsData) {
    topRow.push(restaurantsData);
  } else {
    topRow.push({ type: 'restaurants' });
  }

  const groceryStoresData = filteredData.find(
    (data) => data.type === 'grocery stores'
  );
  if (groceryStoresData) {
    topRow.push(groceryStoresData);
  } else {
    topRow.push({ type: 'grocery stores' });
  }

  const gasStationsData = filteredData.find(
    (data) => data.type === 'gas stations'
  );
  if (gasStationsData) {
    topRow.push(gasStationsData);
  } else {
    topRow.push({ type: 'gas stations' });
  }

  const travelData = filteredData.find((data) => data.type === 'travel');
  if (travelData) {
    topRow.push(travelData);
  } else {
    topRow.push({ type: 'travel' });
  }

  const streamingServicesData = filteredData.find(
    (data) => data.type === 'streaming services'
  );
  if (streamingServicesData) {
    topRow.push(streamingServicesData);
  } else {
    topRow.push({ type: 'streaming services' });
  }

  const gymMembershipsData = filteredData.find(
    (data) => data.type === 'gym memberships'
  );
  if (gymMembershipsData) {
    topRow.push(gymMembershipsData);
  } else {
    topRow.push({ type: 'gym memberships' });
  }

  const transitData = filteredData.find((data) => data.type === 'transit');
  if (transitData) {
    topRow.push(transitData);
  } else {
    topRow.push({ type: 'transit' });
  }

  const medicalStoresData = filteredData.find(
    (data) => data.type === 'medical stores'
  );
  if (medicalStoresData) {
    topRow.push(medicalStoresData);
  } else {
    topRow.push({ type: 'medical stores' });
  }

  return topRow;
};
