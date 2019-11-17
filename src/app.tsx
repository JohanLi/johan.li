import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router } from 'react-router-dom';

import Main from './components/Main';
import './app.scss';

const App = hot(Main);

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);
