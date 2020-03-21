import React, { ReactElement } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import dracula from 'react-syntax-highlighter/dist/esm/styles/hljs/dracula';

import styles from './code.scss';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('python', python);

interface Props {
  language: 'javascript' | 'python';
  code: string;
  caption: string;
}

const Code = (props: Props): ReactElement => (
  <div className={styles.code}>
    <SyntaxHighlighter
      language={props.language}
      style={dracula}
      customStyle={{ padding: '20px' }}
    >
      {props.code.trim()}
    </SyntaxHighlighter>
    <div className={styles.caption}>{props.caption}</div>
  </div>
);

export default Code;
