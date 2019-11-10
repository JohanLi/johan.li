import React, { ReactElement } from 'react';

import styles from './about.scss';

const About = (): ReactElement => (
  <>
    <h1>About</h1>
    <p>Hi! My name is Johan Li, and I’m a software developer.</p>
    <p>Owing to my childhood, a couple of things define me as a person:</p>
    <ul className={styles.define}>
      <li>
        <strong>The interest in language and presentations</strong>. I spoke
        three languages growing up, as I was raised in Sweden, by Chinese
        parents, while attending an English-speaking elementary school.
      </li>
      <li>
        <strong>The desire to teach</strong>. Mom and dad, and my grandparents
        have all worked in education. While it runs in the family, I suspect
        mine was born out of arrogance – thinking I could do better than my
        teachers.
      </li>
      <li>
        <strong>A passion for technology and computers</strong>. During my
        upbringing, I was a loner: no siblings, no relatives, and childhood
        friends who relocated abroad. Matters worsened as I switched to a
        Swedish-speaking school in a posh neighborhood, and had difficulties
        relating to my classmates, who were non-immigrants. To escape the
        thought of feeling different, I spent a lot of time reading and
        programming.
      </li>
    </ul>
    <p>
      Now, all grown up, I’ve gradually come to realize I want to combine these
      interests, in addition to being a software developer. Hence, I’ve started
      to write and speak about software to share knowledge and spark discussion.
    </p>
  </>
);

export default About;
