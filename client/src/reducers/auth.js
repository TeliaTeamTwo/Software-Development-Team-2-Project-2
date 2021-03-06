import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  EMPLOYEE_ACCOUNT_DELETED,
  COMPANY_ACCOUNT_DELETED,
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: {}
};

export default function( state= initialState, action){
  const { type, payload } = action;

 switch (type) {
   case USER_LOADED:
     return {
       ...state,
       isAuthenticated: true,
       loading: false,
       user: payload,
     };
   case REGISTER_SUCCESS:
   case LOGIN_SUCCESS:
     localStorage.setItem('token', payload.token);
     return {
       ...state,
       ...payload,
       isAuthenticated: true,
       loading: false,
     };
   case REGISTER_FAIL:
   case AUTH_ERROR:
   case LOGIN_FAIL:
   case LOGOUT:
   case COMPANY_ACCOUNT_DELETED:
   case EMPLOYEE_ACCOUNT_DELETED:
     localStorage.removeItem('token');
     return {
       ...state,
       token: null,
       isAuthenticated: false,
       loading: false,
       user:{}
     };
   default:
     return state;
 }
}