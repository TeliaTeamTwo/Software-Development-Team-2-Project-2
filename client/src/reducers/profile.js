import { GET_EMPLOYEE_PROFILE, PROFILE_ERROR, UPDATE_EMPLOYEE_PROFILE, GET_COMPANY_PROFILE, UPDATE_COMPANY_PROFILE } from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EMPLOYEE_PROFILE:
    case GET_COMPANY_PROFILE:
    case UPDATE_EMPLOYEE_PROFILE:
    case UPDATE_COMPANY_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
