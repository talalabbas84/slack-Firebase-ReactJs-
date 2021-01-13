import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBPLcCIXB6jdBW2NftgDSoo2K8KH0rdIiI',
  authDomain: 'web-messenger-528a5.firebaseapp.com',
  databaseURL: 'https://web-messenger-528a5-default-rtdb.firebaseio.com',
  projectId: 'web-messenger-528a5',
  storageBucket: 'web-messenger-528a5.appspot.com',
  messagingSenderId: '721545853722',
  appId: '1:721545853722:web:011f8ed9fe86c395dccaa3',
  measurementId: 'G-8ZT3VHPBSM'
};

firebase.initializeApp(firebaseConfig);

export default firebase;
