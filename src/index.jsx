import React from 'react';
import ReactDOM from 'react-dom';

import { IndexRoute, Route, Router } from 'react-router';

import Admin from './admin.jsx';
import Application from './application.jsx';
import NotFound from './notFound.jsx';
import Playlist from './playlist.jsx';

ReactDOM.render(
    <Router>
        <Route component={Application} path="/">
          <IndexRoute component={Playlist} />
          <Route component={Admin} path="admin/:authenticationKey" />
          <Route component={NotFound} path="*" />
        </Route>
    </Router>,
    document.getElementById('root')
);
