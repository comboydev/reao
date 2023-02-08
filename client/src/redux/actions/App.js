import {
  LOAD_USER_INFO,
  LOADED_USER_INFO_SUCCESS,
} from '../constants/App';

export const fetchUser = () => {
  return {
    type: LOAD_USER_INFO,
  }
};

export const setUser = (payload) => {
  return {
    type: LOADED_USER_INFO_SUCCESS,
    payload,
  }
};
