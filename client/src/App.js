import React, { Fragment,useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import Alert from './components/Alert';
import CreateEmployeeProfile from './components/profile-forms/CreateEmployeeProfile';
import EditEmployeeProfile from './components/profile-forms/EditEmployeeProfile';
import Dashboard from './components/dashboard/Dashboard';
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
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-employee-profile'
                component={CreateEmployeeProfile}
              />
              <PrivateRoute
                exact
                path='/edit-employee-profile'
                component={EditEmployeeProfile}
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
