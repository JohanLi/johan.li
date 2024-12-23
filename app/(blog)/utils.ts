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
    .replace(/[^0-9a-z\-]/gi, '')
}

export async function getArticle(slug: string) {
  const m = await import(`./${slug}/article`)
  return m.article
}
