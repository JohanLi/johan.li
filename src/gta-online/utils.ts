export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatTimestamp(milliseconds: number) {
  const minutes = Math.floor(milliseconds / 60000).toString()
  const seconds = Math.floor((milliseconds % 60000) / 1000).toString()
  const centiseconds = Math.floor((milliseconds % 1000) / 10).toString()

  if (minutes === '0') {
    return `${seconds}:${centiseconds.padStart(2, '0')}`
  }

  return `${minutes}:${seconds.padStart(2, '0')}:${centiseconds.padStart(2, '0')}`
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function isCorrect(
  selectedElements: number[],
  correctElements: number[],
) {
  if (!selectedElements.length) {
    return false
  }

  if (selectedElements.length !== correctElements.length) {
    return false
  }

  return selectedElements
    .sort((a, b) => a - b)
    .every((s, i) => s === correctElements[i])
}

export function shuffle<T>(array: T[]): T[] {
  const shuffledArray = [...array]

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }

  return shuffledArray
}
