import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Page1 from '../pages/cargo-culting-in-software';
import About from './About';

import styles from './main.css';

const Main = (): ReactElement => (
  <Router>
    <Header />
    <div className={styles.main}>
      <div className={styles.content}>
        <Switch>
          <Route path="/" exact>
            <Page1 />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
        </Switch>
      </div>
    </div>
  </Router>
);

export default Main;
