import React, { ReactElement } from 'react';
import Prism from 'prismjs';

import styles from './code.scss';

interface Props {
  language: 'javascript' | 'jsx' | 'python' | 'html' | 'handlebars';
  code: string;
  caption: string;
}

const Code = (props: Props): ReactElement => {
  const { language, code, caption } = props;
  const html = Prism.highlight(
    code.trim(),
    Prism.languages[language],
    language,
  );

  return (
    <div className={styles.code}>
      <pre className={`language-${language}`}>
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
      <div className={styles.caption}>{caption}</div>
    </div>
  );
};

export default Code;
