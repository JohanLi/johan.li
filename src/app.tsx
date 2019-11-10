import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader/root';

import Main from './components/Main';
import './app.scss';

const App = hot(Main);

render(<App />, document.getElementById('root'));
