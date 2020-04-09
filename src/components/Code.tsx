import React, { ReactElement } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
import handlebars from 'react-syntax-highlighter/dist/esm/languages/hljs/handlebars';
import darcula from 'react-syntax-highlighter/dist/esm/styles/hljs/darcula';

import styles from './code.scss';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('xml', xml);
SyntaxHighlighter.registerLanguage('handlebars', handlebars);

interface Props {
  language: 'javascript' | 'python' | 'xml' | 'handlebars';
  code: string;
  caption: string;
}

const Code = (props: Props): ReactElement => (
  <div className={styles.code}>
    <SyntaxHighlighter
      language={props.language}
      style={darcula}
      customStyle={{ padding: '20px' }}
    >
      {props.code.trim()}
    </SyntaxHighlighter>
    <div className={styles.caption}>{props.caption}</div>
  </div>
);

export default Code;
