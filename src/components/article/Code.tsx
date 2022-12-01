/*
  To avoid layout shift, Prism highlighting is performed both on the server
  and the client. Unfortunately, it’s not as straightforward to add plugins
  and load additional languages under these circumstances:

  - loadLanguages() is for Node. https://prismjs.com/#basic-usage-node https://github.com/PrismJS/prism/issues/1515#issuecomment-410119879
  - Using https://github.com/mAAdhaTTah/babel-plugin-prismjs disables SWC

  The solution is to import plugins and languages. Dependencies of
  dependencies (c for cpp, markup-templating for handlebars) must also be
  explicitly imported. https://github.com/PrismJS/prism/issues/1567#issuecomment-423611947

  Additionally, the Custom Class plugin doesn’t change the actual CSS
  for you. This is why a prism.css file is committed.
 */

import Prism from 'prismjs'
import 'prismjs/plugins/custom-class/prism-custom-class'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-handlebars'
import { Caption } from './Caption'

/*
  If manual is not turned on, a hydration error will appear during development.
  It appears to be due to Prism.js inserting a leading space before 'language-'
  on the client side. Thus, the server and client html do not match.
 */
Prism.manual = true
Prism.plugins.customClass.prefix('prism-')

type Props = {
  language: 'javascript' | 'jsx' | 'python' | 'cpp' | 'html' | 'handlebars'
  code: string
  caption: string
}

export default function Code({ language, code, caption }: Props) {
  const html = Prism.highlight(code.trim(), Prism.languages[language], language)

  return (
    <div className="-mx-4 my-12 text-sm md:mx-0 lg:-mx-8">
      <pre className={`language-${language}`}>
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
      <Caption>{caption}</Caption>
    </div>
  )
}
