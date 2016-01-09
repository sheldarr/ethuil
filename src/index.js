import React from 'react';
import ReactDOM from 'react-dom';

import { IndexRoute, Route, Router } from 'react-router';

import Admin from './admin';
import App from './app';
import NotFound from './notFound';
import Playlist from './playlist';

ReactDOM.render(
  <Router>
    <Route component={App} path="/">
      <IndexRoute component={Playlist} />
      <Route component={Admin} path="admin" />
      <Route component={NotFound} path="*" />
    </Route>
  </Router>, document.getElementById('root'));
