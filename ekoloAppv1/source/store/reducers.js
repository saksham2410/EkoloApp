import {SET_DROP, SET_PICKUP, GET_DROP, GET_PICKUP} from './actionTypes';

const initialState = {
  pickup: {},
  drop: {},
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DROP:
      return {
        ...state,
        drop: {...action.payload},
      };
    case SET_PICKUP:
      return {
        ...state,
        pickup: {...action.payload},
      };
    case GET_PICKUP:
      return {
        ...state,
        pickup,
      };
    case GET_DROP:
      return {
        ...state,
        drop,
      };
    default:
      return {};
  }
};
