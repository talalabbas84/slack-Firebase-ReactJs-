import * as types from '../types';

export const setUser = user => {
  return {
    type: types.SET_USER,
    payload: {
      currentUser: user
    }
  };
};

export const clearUser = () => {
  return {
    type: types.CLEAR_USER
  };
};

//Chaneell actions
export const setCurrentChannel = channel => {
  // alert('ds');
  return {
    type: types.SET_CURRENT_CHANNEL,
    payload: {
      currentChannel: channel
    }
  };
};

export const setPrivateChannel = isPrivateChannel => {
  return {
    type: types.SET_PRIVATE_CHANNEL,
    payload: {
      isPrivateChannel
    }
  };
};
