import React, { Fragment,useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import Alert from './components/Alert';
import CreateEmployeeProfile from './components/profile-forms/CreateEmployeeProfile';
import CreateCompanyProfile from './components/profile-forms/CreateCompanyProfile';
import CompanyProfiles from './components/profiles/CompanyProfiles';
import EmployeeProfiles from './components/profiles/EmployeeProfiles';
import EditEmployeeProfile from './components/profile-forms/EditEmployeeProfile';
import EditCompanyProfile from './components/profile-forms/EditCompanyProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddOpenPosition from './components/profile-forms/AddOpenPosition';
import AddEducation from './components/profile-forms/AddEducation';
import EmployeeDashboard from './components/dashboard/EmployeeDashboard';
import CompanyDashboard from './components/dashboard/CompanyDashboard';
import SwipeButtons from './components/SwipeButtons'
import Decision from './components/dashboard/Decision';
import PrivateRoute from './components/routing/PrivateRoute';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
// Redux
import { Provider } from 'react-redux';
import store from './store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path='/' component={Landing} />
          <section>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute
                exact
                path='/employee-dashboard'
                component={EmployeeDashboard}
              />
              <PrivateRoute exact path='/company-profiles'>
                <CompanyProfiles />
                <SwipeButtons />
              </PrivateRoute>
              <PrivateRoute exact path='/employee-profiles'>
                <EmployeeProfiles />
                <SwipeButtons />
              </PrivateRoute>
              />
              <PrivateRoute
                exact
                path='/company-dashboard'
                component={CompanyDashboard}
              />
              <PrivateRoute exact path='/decision' component={Decision} />
              <PrivateRoute
                exact
                path='/create-employee-profile'
                component={CreateEmployeeProfile}
              />
              <PrivateRoute
                exact
                path='/create-company-profile'
                component={CreateCompanyProfile}
              />
              <PrivateRoute
                exact
                path='/edit-employee-profile'
                component={EditEmployeeProfile}
              />
              <PrivateRoute
                exact
                path='/edit-company-profile'
                component={EditCompanyProfile}
              />
              <PrivateRoute
                exact
                path='/add-experience'
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path='/add-education'
                component={AddEducation}
              />
              <PrivateRoute
                exact
                path='/add-open-position'
                component={AddOpenPosition}
              />
            </Switch>
          </section>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
  
}

export default App;
