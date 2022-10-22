/*
  https://web.dev/preload-optional-fonts/
  https://sia.codes/posts/making-google-fonts-faster/
 */

const fonts = [
  {
    weight: 400,
    url: '/fonts/roboto-v29-latin-regular.woff2',
  },
  {
    weight: 500,
    url: '/fonts/roboto-v29-latin-500.woff2',
  },
  {
    weight: 700,
    url: '/fonts/roboto-v29-latin-700.woff2',
  },
  {
    weight: 900,
    url: '/fonts/roboto-v29-latin-900.woff2',
  },
]

const fontFaceStyle = fonts
  .map(
    ({ weight, url }) => `
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: ${weight};
    font-display: optional;
    src: url('${url}') format('woff2');
  }
`,
  )
  .join('')

export default function Fonts() {
  return (
    <>
      {fonts.map(({ url }) => (
        <link
          key={url}
          rel="preload"
          href={url}
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
      ))}
      <style dangerouslySetInnerHTML={{ __html: fontFaceStyle }} />
    </>
  )
}
