import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import LoginPage from '../components/LoginPage.js';
import MainContent from '../components/MainContent';
import PublicRoute from './PublicRoute.js';
import PrivateRoute from './PrivateRoute.js';
import NotFoundPage from '../components/NotFoundPage.js';
import { createBrowserHistory } from 'history';
import Secret from '../components/Secret';



// create history object for managing session data
export const history = createBrowserHistory();

const AppRouter = () => (
  // use history object in Router
  <Router history={history} >
    <>
      <Switch>
        <PublicRoute path='/' component={LoginPage} exact={true} />
        <PrivateRoute path='/dashboard' component={MainContent} exact={true} />
        <PrivateRoute path='/secret' component={Secret} exact={true} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  </Router>
);

export default AppRouter;