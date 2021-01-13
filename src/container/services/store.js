const prefix = '1594461923517';

export const Store = {
  set: (name, item) => {
    localStorage.setItem(prefix + name, item);
  },
  get: (name, arg) => {
    return localStorage.getItem(prefix + name) || arg;
  },
  setUserToken: accessToken => {
    localStorage.setItem(prefix + 'accessToken', accessToken);
  },
  setUser: user => {
    localStorage.setItem(prefix + 'user', JSON.stringify(user));
  },
  getUserToken: arg => {
    return localStorage.getItem(prefix + 'accessToken') || arg;
  },
  getUser: arg => {
    return JSON.parse(localStorage.getItem(prefix + 'user') || arg);
  },
  setTokenData: tokenObj => {
    localStorage.setItem(prefix + 'tokenObj', JSON.stringify(tokenObj));
  },
  getTokenData: () => {
    return JSON.parse(localStorage.getItem(prefix + 'tokenObj'));
  }
};
