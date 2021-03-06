import {
  GET_EMPLOYEE_PROFILE,
  GET_EMPLOYEE_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_EMPLOYEE_PROFILE,
  GET_COMPANY_PROFILE,
  GET_COMPANY_PROFILES,
  UPDATE_COMPANY_PROFILE,
  ADD_LIKEBY,
  ADD_LIKE,
  ADD_DISLIKE,
  REM_PROFILE,
} from '../actions/types';

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
    case GET_EMPLOYEE_PROFILES:
    case GET_COMPANY_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
      case REM_PROFILE:
        return{
          ...state,
          profiles: state.profiles.filter(user=> user._id !== payload.id)
        };
    case ADD_LIKE:
      return {
        ...state,
        profile: { likes: payload.likes },
        loading: false,
      };
    case ADD_DISLIKE:
      return {
        ...state,
        profile: { dislikes: payload.dislikes },
        loading: false,
      };
    case ADD_LIKEBY:
      return {
        ...state,
        profiles: state.profiles.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
      };
    default:
      return state;
  }
}
