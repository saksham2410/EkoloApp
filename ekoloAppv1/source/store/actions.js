import {SET_DROP, SET_PICKUP, GET_DROP, GET_PICKUP} from './actionTypes';

export const setReduxDrop = (payload) => ({
  type: 'SET_DROP',
  payload: payload,
});
export const getReduxPickup = (payload) => ({
  type: 'GET_PICKUP',
});
export const getReduxDrop = (payload) => ({
  type: 'GET_DROP',
});

export const setReduxPickup = (payload) => ({
  type: SET_PICKUP,
  payload: payload,
});
