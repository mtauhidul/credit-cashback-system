import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { createNewUser, getUsers } from './db';
import { app } from './firebase.config';

const auth = getAuth(app);

export const register = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      return error.message;
    });
};

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      return error.message;
    });
};

export const resetAccount = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

export const googleSingIn = async () => {
  const provider = await new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);

  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  const user = result.user;

  const allUsers = await getUsers();
  const check = allUsers.find((u) => u.uid === user.uid);
  if (!check) {
    const createResponse = await createNewUser(
      {
        name: user.displayName,
        userName: user.displayName.replace(/\s/g, ''),
        email: user.email,
        points: 0,
        rows: [],
        feedbacks: [],
      },
      user.uid
    );
    if (!createResponse) {
      window.localStorage.setItem('uid', user.uid);
      window.localStorage.setItem('token', token);
    }
  }
  return user;
};
