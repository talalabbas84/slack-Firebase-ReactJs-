import { combineReducers } from 'redux';
import * as types from '../types';

const initialUserState = {
  isLoading: true,
  currentUser: null
};

const user_reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        isLoading: false
      };
    case types.CLEAR_USER: {
      return {
        ...state,
        currentUser: null,
        isLoading: false
      };
    }

    default:
      return state;
  }
};

const initialChannelState = {
  currentChannel: null,
  isPrivateChannel: false
};

const channel_reducer = (state = initialChannelState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel
      };
    case types.SET_PRIVATE_CHANNEL:
      return {
        ...state,
        isPrivateChannel: action.payload.isPrivateChannel
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: user_reducer,
  channel: channel_reducer
});

export default rootReducer;
