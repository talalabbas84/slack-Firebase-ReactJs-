import './App.css';

import React, { Fragment, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
  useHistory
} from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from 'firebase';
import axios from 'axios';
import LoginHook from './container/login';
import Home from './container/homeFirebase/Home';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './container/routing/PrivateRoutes';
import { Store } from './container/services/store';
import { refreshTokenSetup } from './utils/refreshTokenSetup';
import { service } from './container/services/services';
import Login from './component/Auth/Login';
import Register from './component/Auth/Register';

import { clearUser, setUser } from './store/actions';
import Spinner from './component/Spinner.js/Spinner';

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

const App = ({ history, setUser, clearUser, isLoading }) => {
  console.log(isLoading, 'isloading');
  // const history = useHistory();
  useEffect(() => {
    // getUser();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        history.push('/');
      } else {
        history.push('/login');
        clearUser();
      }
    });
  }, []);
  const getUser = async () => {
    const tokenId = Store.getTokenData();

    // service
    //   .login(tokenId && tokenId.tokenId)
    //   .then(res => {
    //     Store.setUser(res.data.user);
    //     Store.set('isAuthenticated', res.data.status);
    //   })
    //   .catch(err => {
    //     Store.setUser({});
    //     Store.set('isAuthenticated', false);
    //   });
    // refreshTokenSetup(tokenData);
    // const TokenId = Store.setUserToken(res.tokenId);
    // service
    //   .login(res.tokenId)
    //   .then(res => {
    //     Store.setUser(res.data.user);
    //     Store.set('isAuthenticated', res.data.status);
    //   })
    //   .catch(err => console.log(err));
  };
  return !isLoading ? (
    <Fragment>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/' component={Home} />
        {/* <PrivateRoute
          exact
          path='/'
          isAuthenticated={Store.get('isAuthenticated')}
          component={Home}
        /> */}
      </Switch>
    </Fragment>
  ) : (
    <Spinner />
  );
};
const mapStateToProps = state => ({
  isLoading: state.user.isLoading
});

export default withRouter(
  connect(mapStateToProps, { setUser, clearUser })(App)
);
