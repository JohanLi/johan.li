import React, { ReactElement, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import styles from './header.scss';

const Header = (): ReactElement => {
  const [active, setActive] = useState(false);
  const [transition, setTransition] = useState(false);

  const toggle = (): void => {
    setActive(!active);
    setTransition(true);
  };

  const navigate = (): void => {
    setActive(false);
    setTransition(false);
  };

  const header = classNames({
    [styles.header]: true,
    [styles.active]: active,
    [styles.transition]: transition,
  });

  return (
    <header className={header}>
      <div className={styles.navbar}>
        <button className={styles.hamburger} onClick={toggle}>
          <div className={styles.top} />
          <div className={styles.mid} />
          <div className={styles.bottom} />
        </button>
        <div className={styles.logo}>
          <Link to="/">Johan.Li</Link>
        </div>
      </div>
      <nav className={styles.menu}>
        <ul className={styles.menuLinks}>
          <li className={styles.menuLink}>
            <NavLink
              exact
              to="/"
              activeClassName={styles.menuLinkActive}
              onClick={navigate}
            >
              Home
            </NavLink>
          </li>
          <li className={styles.menuLink}>
            <NavLink
              to="/about"
              activeClassName={styles.menuLinkActive}
              onClick={navigate}
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
