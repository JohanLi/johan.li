import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Main from './components/Main';
import './app.scss';

const App = hot(Main);

render(
  <Router>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </Router>,
  document.getElementById('root'),
);
