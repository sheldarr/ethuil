const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./app');

const Route = require('react-router').Route;
const Router = require('react-router').Router;
const IndexRoute = require('react-router').IndexRoute;

const Admin = require('./admin');
const NotFound = require('./notFound');
const Playlist = require('./playlist');

ReactDOM.render(
  <Router>
    <Route component={App} path="/">
      <IndexRoute component={Playlist} />
      <Route component={Admin} path="admin" />
      <Route component={NotFound} path="*" />
    </Route>
  </Router>, document.getElementById('root'));
