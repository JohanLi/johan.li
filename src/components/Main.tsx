import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './Header';
import Page1 from '../pages/cargo-culting-in-software';
import About from './About';

import styles from './main.scss';

const Main = (): ReactElement => (
  <>
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
  </>
);

export default Main;
