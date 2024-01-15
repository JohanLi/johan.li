import { docs, auth } from '@googleapis/docs'
import { writeFile } from 'fs/promises'
import childProcess from 'child_process'
import util from 'util'

const exec = util.promisify(childProcess.exec)

/*
  To set this up:
  - Create a service account in GCP
  - Download the JSON key
  - Enable Google Docs API via https://console.cloud.google.com/apis/library/docs.googleapis.com?project=johan-li
  - Share the Google Drive folder with the service account

  Rationale for using Google Docs instead of an actual CMS:
  - I don't publish a lot – some amount of manual work is more than tolerable
  - I want a high degree of freedom in customizing each article

  Google Docs covers 90% of my articles. The remaining 10% is
  manual work, but allows me to add arbitrary HTML.
 */

const client = docs({
  version: 'v1',
  auth: new auth.GoogleAuth({
    keyFilename: `${__dirname}/google-docs-reader.json`,
    scopes: ['https://www.googleapis.com/auth/documents'],
  }),
})

const documentId = process.argv[2]

if (!documentId) {
  console.log('Document ID needs to be passed in as an argument')
  process.exit(1)
}

async function main() {
  const { data } = await client.documents.get({ documentId })

  const { title, body } = data

  const filename = `${title.replace(/\s/g, '-').toLowerCase()}.tsx`

  const headings = []
  const headingLevels = new Set()
  const elements = []

  body.content
    .filter(({ paragraph }) => paragraph)
    .forEach(({ paragraph }) => {
      const { content } = paragraph.elements[0].textRun

      if (content === '\n') {
        return
      }

      const { namedStyleType } = paragraph.paragraphStyle
      const headingMatch = namedStyleType.match(/HEADING_(\d)/)

      if (headingMatch) {
        const level = headingMatch[1]

        headingLevels.add(`H${level}`)
        headings.push(content.trim())
        elements.push(`<H${level}>${content}</H${level}>`)
        return
      }

      elements.push(`<P>${content}</P>`)
    })

  const output = `
    ${
      headingLevels.size > 0 &&
      `import { ${Array.from(headingLevels).join(
        ', ',
      )} } from '../src/components/article/Common';`
    }
    import { P } from '../src/components/article/Common';
    
    const headings = [
      ${headings.map((heading) => `'${heading}',`).join('\n')}
    ]
    
    const body = () => (
      <>
        ${elements.join('\n')}
      </>
    )
    
    const article = {
      thumbnail: '',
      title: '${title}',
      teaser: '',
      published: ${Math.floor(Date.now() / 1000)},
      readingTime: 0,
      headings,
      body,
    }
    
    export default article
  `

  const filepath = `${__dirname}/${filename}`

  await writeFile(filepath, output)

  await exec(`prettier ${filepath} --write`)

  process.exit()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})