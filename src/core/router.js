import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Components/Main'
import CoinTable from '../Components/Main/CoinTable';
import Tags from '../Components/Main/Tags';

export default (
  <Switch>
    <Route path='/' exact component={Main} />
    <Route path='/Tags' exact component={Tags} />
    <Route path='/CoinTable' exact component={CoinTable} />
  </Switch>
);