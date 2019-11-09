// from old website

import React, { ReactElement, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import styles from './header.css';

const Header = (): ReactElement => {
  const [active, setActive] = useState(false);
  const [transition, setTransition] = useState(false);

  const headerClass = classNames({
    [styles.header]: true,
    [styles.active]: active,
    [styles.transition]: transition,
  });

  const toggle = (): void => {
    setActive(!active);
    setTransition(false);
  };

  const navigate = (): void => {
    setActive(false);
    setTransition(false);
  };

  return (
    <header className={headerClass}>
      <div className={styles.navbar}>
        <button className={styles.hamburgerMenu} onClick={() => toggle()}>
          <div className={styles.top} />
          <div className={styles.mid} />
          <div className={styles.bottom} />
        </button>
        <div className={styles.logo}>
          <Link to="/" className={styles.logo}>
            Johan.Li
          </Link>
        </div>
      </div>
      <nav className={styles.linkMenu}>
        <ul className={styles.links}>
          <li className={styles.link}>
            <NavLink
              exact
              to="/"
              activeClassName={styles.active}
              onClick={() => navigate()}
            >
              Home
            </NavLink>
          </li>
          <li className={styles.link}>
            <NavLink
              to="/about"
              activeClassName={styles.active}
              onClick={() => navigate()}
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
