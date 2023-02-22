import firebase from 'firebase/compat/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// import {getStorage , ref } from 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnvZ_neRaraHu6RQG7GCqEfxuQwNhXw3E",
  authDomain: "olxclone-36ca8.firebaseapp.com",
  projectId: "olxclone-36ca8",
  storageBucket: "olxclone-36ca8.appspot.com",
  messagingSenderId: "558929702622",
  appId: "1:558929702622:web:a3bd92be904a0a1b03dc4f",
  measurementId: "G-4T8CXJH0RH"
};

const firebaseApp =firebase.initializeApp(firebaseConfig);

// export const storage = getStorage(firebaseApp)
export const firebaseAuth=getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);