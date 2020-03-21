import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Router';

import SignIn from '~/pages/Signin';
import Product from '~/pages/Product';
import Store from '~/pages/Store';
import Dashboard from '~/pages/Dashboard';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/product" component={Product} isPrivate />
      <Route path="/store" component={Store} isPrivate />
      <Route path="/" component={() => <h1>404 Page not found</h1>} />
    </Switch>
  );
}
