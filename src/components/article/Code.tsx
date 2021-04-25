import React from 'react';
import Prism from 'prismjs';

/*
  If manual is not turned on, a hydration error will appear during development. It appears to be due to Prism.js,
  on the client side, inserting a leading space before 'language-' so it becomes ' language-'.
 */
// @ts-ignore
Prism.manual = true;
Prism.plugins.customClass.prefix('prism-'); // .block interferes with Tailwind's .block

interface Props {
  language: 'javascript' | 'jsx' | 'python' | 'cpp' | 'html' | 'handlebars';
  code: string;
  caption: string;
}

export const Code = (props: Props): JSX.Element => {
  const { language, code, caption } = props;
  const html = Prism.highlight(
    code.trim(),
    Prism.languages[language],
    language,
  );

  return (
    <div className="-mx-4 md:mx-0 lg:-mx-8 my-12 text-sm">
      <pre className={`language-${language}`}>
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
      <div className="text-sm text-gray-400 text-center mt-6 mx-4">
        {caption}
      </div>
    </div>
  );
};
