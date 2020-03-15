import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Header from './Header';
import Home from './Home';
import Article from './Article';

import styles from './app.scss';

const App = (): ReactElement => {
  return (
    <>
      <Helmet
        titleTemplate="%s - Johan Li"
        defaultTitle="Johan Li - A software developer’s thoughts"
      />
      <div className={styles.app}>
        <div className={styles.content}>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/:slug" component={Article} />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default App;
