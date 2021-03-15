import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Components/Main'

export default (
  <Switch>
    <Route path='/' exact component={Main} />
  </Switch>
);