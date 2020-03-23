import React from 'react';
import { Route } from 'react-router-dom';
import { withContext } from "./AppContext"
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';

const App = ({ HR_TOKEN, USER_TOKEN }) => {
  if (HR_TOKEN) { return <Route exact path='/' component={Dashboard} /> }
  if (USER_TOKEN) { return <Route path='/' component={Profile} /> }
  return <Route path='/' component={Login} />
}

export default withContext(App);
