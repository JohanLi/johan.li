import { docs, auth } from '@googleapis/docs'
import { writeFile, mkdir } from 'fs/promises'
import childProcess from 'child_process'
import util from 'util'
import { getSlug } from '../app/(blog)/utils'

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

  const headings = []
  const headingLevels = new Set()
  const elements = []

  body.content
    .filter(({ paragraph }) => paragraph)
    .forEach(({ paragraph }) => {
      const content = paragraph.elements
        .map(({ textRun }) => {
          if (textRun.textStyle.bold) {
            return `<strong>${textRun.content}</strong>`
          }

          if (textRun.textStyle.italic) {
            return `<i>${textRun.content}</i>`
          }

          return textRun.content
        })
        .join('')

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

  const articleOutput = `
    ${
      headingLevels.size > 0 &&
      `import { ${Array.from(headingLevels).join(
        ', ',
      )} } from '../components/article/Common';`
    }
    import { P } from '../components/article/Common';
    
    const headings = [
      ${headings.map((heading) => JSON.stringify(heading) + ',').join('\n')}
    ]
    
    const body = (
      <>
        ${elements.join('\n')}
      </>
    )
    
    export const article = {
      thumbnail: '',
      title: '${title}',
      teaser: '',
      published: ${Math.floor(Date.now() / 1000)},
      readingTime: 0,
      headings,
      body,
    }
  `

  const slug = getSlug(title)

  await mkdir(`${__dirname}/../app/(blog)/${slug}`, { recursive: true })

  const articleFilePath = `${__dirname}/../app/(blog)/${slug}/article.tsx`
  await writeFile(articleFilePath, articleOutput)
  await exec(`prettier "${articleFilePath}" --write`)

  process.exit()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
