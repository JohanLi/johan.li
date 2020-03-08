import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Header from './Header';
import Home from './Home';
import Article from './Article';
import About from './About';

import styles from './main.scss';

const App = (): ReactElement => {
  return (
    <>
      <Helmet
        titleTemplate="%s - Johan Li"
        defaultTitle="Johan Li - A software developer’s thoughts"
      />
      <Header />
      <div className={styles.main}>
        <div className={styles.content}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/:slug" component={Article} />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default App;
