import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './components/App';
import './index.scss';

const HotApp = hot(App);

render(
  <Router>
    <HelmetProvider>
      <HotApp />
    </HelmetProvider>
  </Router>,
  document.getElementById('root'),
);
