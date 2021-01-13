import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from './store/reducers';

// const firebaseConfig = {
//   apiKey: 'AIzaSyBPLcCIXB6jdBW2NftgDSoo2K8KH0rdIiI',
//   authDomain: 'web-messenger-528a5.firebaseapp.com',
//   projectId: 'web-messenger-528a5',
//   storageBucket: 'web-messenger-528a5.appspot.com',
//   messagingSenderId: '721545853722',
//   appId: '1:721545853722:web:011f8ed9fe86c395dccaa3',
//   measurementId: 'G-8ZT3VHPBSM'
// };

// firebase.initializeApp(firebaseConfig);

const store = createStore(rootReducer);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
