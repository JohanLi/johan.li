export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function unixTimestampToMonthYear(unixTimestamp: number) {
  const date = new Date(unixTimestamp * 1000)
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)
  const year = date.getFullYear()

  return `${month}, ${year}`
}

export function getSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^0-9a-z-]/gi, '')
}

/*
  Turns the rendered HTML of a slot back into text, e.g. so that a heading's
  id can be derived from its contents.
 */
export function htmlToText(html: string) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(
      /&(#x?[0-9a-f]+|amp|lt|gt|quot|apos);/gi,
      (entity, code: string) => {
        const named: Record<string, string> = {
          amp: '&',
          lt: '<',
          gt: '>',
          quot: '"',
          apos: "'",
        }

        if (named[code.toLowerCase()]) {
          return named[code.toLowerCase()]
        }

        const codePoint =
          code[1].toLowerCase() === 'x'
            ? parseInt(code.slice(2), 16)
            : parseInt(code.slice(1), 10)

        return Number.isNaN(codePoint)
          ? entity
          : String.fromCodePoint(codePoint)
      },
    )
}
