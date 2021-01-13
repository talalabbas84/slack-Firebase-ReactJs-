import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { Redirect, withRouter } from 'react-router-dom';
import { refreshTokenSetup } from '../../utils/refreshTokenSetup';
import { service } from '../services/services';
import { Store } from '../services/store';
import Home from '../home';
const clientId =
  '548603728973-c57qg01gerodrv975qacprjrd3nk0o1u.apps.googleusercontent.com';
const LoginHook = ({ history }) => {
  if (Store.get('isAuthenticated')) {
    history.push('/');
  }
  const onSucess = res => {
    Store.setTokenData(res);
    Store.setUserToken(res.tokenId);

    refreshTokenSetup(res);
    service
      .login(Store.getUserToken())
      .then(res => {
        Store.setUser(res.data.user);
        Store.set('isAuthenticated', res.data.status);
        history.push('/');
      })
      .catch(err => console.log(err));
  };
  const onFailure = res => {
    refreshTokenSetup(res);
    console.log(res);
  };
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText='Login with Google'
        onSuccess={onSucess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ margin: 100 }}
        // isSignedIn={true}
      />
    </div>
  );
};

export default withRouter(LoginHook);
