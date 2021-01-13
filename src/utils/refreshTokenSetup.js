import React from 'react';
import { service } from '../container/services/services';
import { Store } from '../container/services/store';

export const refreshTokenSetup = res => {
  // console.log(JSON.parse(res));
  console.log(res);
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
  console.log(refreshTiming, 'redress');
  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    Store.setUserToken(newAuthRes);
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;

    setTimeout(refreshTiming, refreshToken);
  };
  // refreshToken();

  setTimeout(refreshToken, refreshTiming);
  // service
  //   .login(res.tokenId)
  //   .then(res => {
  //     Store.setUser(res.data.user);
  //     Store.set('isAuthenticated', res.data.status);
  //   })
  //   .catch(err => console.log(err));
};
