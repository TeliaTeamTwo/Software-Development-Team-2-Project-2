import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_EMPLOYEE_PROFILE,
  GET_COMPANY_PROFILE,
  GET_EMPLOYEE_PROFILES,
  GET_COMPANY_PROFILES,
  PROFILE_ERROR,
  UPDATE_EMPLOYEE_PROFILE,
  UPDATE_COMPANY_PROFILE,
  CLEAR_PROFILE,
  EMPLOYEE_ACCOUNT_DELETED,
  COMPANY_ACCOUNT_DELETED,
} from './types';

// Get current employee profile
export const getCurrentEmployeeProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('api/employeeprofile/me');

    dispatch({
      type: GET_EMPLOYEE_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all company profiles
export const getCompanyProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get('/api/companyprofile');

    dispatch({
      type: GET_COMPANY_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get company profile by ID
export const getCompanyProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/companyprofile/user/${userId}`);

    dispatch({
      type: GET_COMPANY_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update profile
export const createEmployeeProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('api/employeeprofile', formData, config);

    dispatch({
      type: GET_EMPLOYEE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/employee-dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/employeeprofile/experience', formData, config);

    dispatch({
      type: UPDATE_EMPLOYEE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Added', 'success'));

    history.push('/employee-dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(
      '/api/employeeprofile/qualifications',
      formData,
      config
    );

    dispatch({
      type: UPDATE_EMPLOYEE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/employeeprofile/experience/${id}`);

    dispatch({
      type: UPDATE_EMPLOYEE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/employeeprofile/qualifications/${id}`);

    dispatch({
      type: UPDATE_EMPLOYEE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Qualification Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete account & profile
export const deleteEmployeeAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('/api/employeeprofile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: EMPLOYEE_ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanantly deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Get current company profile
export const getCurrentCompanyProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('api/companyprofile/me');

    dispatch({
      type: GET_COMPANY_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all employee profiles
export const getEmployeeProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get('/api/employeeprofile');

    dispatch({
      type: GET_EMPLOYEE_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get profile by ID
export const getEmployeeProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/employeeprofile/user/${userId}`);

    dispatch({
      type: GET_EMPLOYEE_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Create or update comoany profile
export const createCompanyProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('api/companyprofile', formData, config);

    dispatch({
      type: GET_COMPANY_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/company-dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Add open position
export const addOpenPosition = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      'api/companyprofile/openpositions',
      formData,
      config
    );

    dispatch({
      type: UPDATE_COMPANY_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Open Position Added', 'success'));

    history.push('/company-dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete open position
export const deleteOpenPosition = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/companyprofile/openpositions/${id}`);

    dispatch({
      type: UPDATE_COMPANY_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Open Position Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Delete company account & profile
export const deleteCompanyAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
   await axios.delete('/api/companyprofile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: COMPANY_ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanantly deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};