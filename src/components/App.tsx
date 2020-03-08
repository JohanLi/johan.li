import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Header from './Header';
import About from './About';
import NotFound from './NotFound';
import Home from './Home';

import styles from './main.scss';

import articles from '../articles';

const App = (): ReactElement => {
  const articleRoutes = Object.keys(articles).map(slug => (
    <Route
      key={slug}
      path={`/${slug}`}
      exact
      component={articles[slug].component}
    />
  ));

  return (
    <>
      <Helmet>
        <title>
          Johan.Li - A software developer passionate about learning and sharing
        </title>
      </Helmet>
      <Header />
      <div className={styles.main}>
        <div className={styles.content}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            {articleRoutes}
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default App;
