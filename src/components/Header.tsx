import React, { ReactElement } from 'react';
import { useLocation, Link } from 'react-router-dom';

import styles from './header.scss';

const Header = (): ReactElement => {
  const { pathname } = useLocation();

  let title = <>Johan Li</>;

  if (pathname === '/') {
    title = <h1>{title}</h1>;
  }

  return (
    <header>
      <Link to="/" className={styles.logo}>
        {title}
      </Link>
    </header>
  );
};

export default Header;
