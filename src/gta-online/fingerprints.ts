export type FingerprintI = 1 | 2 | 3 | 4

export const fingerprintElementI = [1, 2, 3, 4, 5, 6, 7, 8]
export type FingerprintElementI = (typeof fingerprintElementI)[number]

export type FingerprintImage = { src: string; srcSet: string }

// keyed by e.g. '1' for a fingerprint, and '1-3' for one of its elements
export type FingerprintImages = Record<string, FingerprintImage>

export const getFingerprint = (images: FingerprintImages, i: FingerprintI) =>
  images[i]

export const getFingerprintElement = (
  images: FingerprintImages,
  i: FingerprintI,
  j: FingerprintElementI,
) => images[`${i}-${j}`]
