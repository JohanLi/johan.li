import { useEffect, useRef, useState } from 'preact/hooks'

/*
  Rendered by Video.astro. There are two kinds of videos:
  - clips, which are muted and loop, like a GIF. They start playing when
    they're scrolled into view (as the island is hydrated using client:visible),
    unless the reader prefers reduced motion. As they're longer than five
    seconds, they have a button to pause them, see WCAG 2.2.2.
  - videos with sound, which only start when the poster is clicked, after which
    the browser's own controls are used.
 */

function play(video: HTMLVideoElement | null) {
  video?.play().catch((e) => {
    // e.g. autoplay being blocked, in which case a clip can still be played using its button
    console.error('Video play failed:', e)
  })
}

type Props = {
  sources: { src: string; type: string }[]
  poster: string
  width: number
  height: number
  label: string
  clip?: boolean
  // English subtitles, in WebVTT
  subtitles?: string
}

export default function VideoPlayer({
  sources,
  poster,
  width,
  height,
  label,
  clip,
  subtitles,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (
      clip &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      play(videoRef.current)
    }
  }, [clip])

  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: `${width}/${height}` }}
    >
      <video
        ref={videoRef}
        width={width}
        height={height}
        className="h-full w-full"
        poster={poster}
        preload="none"
        aria-label={label}
        controls={!clip}
        muted={clip}
        loop={clip}
        playsInline={clip}
        onPlay={() => {
          setIsPlaying(true)
          setHasStarted(true)
        }}
        onPause={() => setIsPlaying(false)}
      >
        {sources.map(({ src, type }) => (
          <source key={src} src={src} type={type} />
        ))}
        {subtitles && (
          <track
            src={subtitles}
            kind="subtitles"
            srcLang="en"
            label="English"
            default
          />
        )}
      </video>
      {clip ? (
        <button
          type="button"
          className="absolute right-4 bottom-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black/60 hover:bg-black/80"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          onClick={() =>
            isPlaying ? videoRef.current?.pause() : play(videoRef.current)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 fill-white"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d={isPlaying ? 'M6 5h4v14H6zm8 0h4v14h-4z' : 'M8 5v14l11-7z'}
            />
          </svg>
        </button>
      ) : (
        !hasStarted && (
          // covers the browser's controls until the video has been started
          <button
            type="button"
            className="absolute inset-0 cursor-pointer"
            aria-label="Play video"
            onClick={() => play(videoRef.current)}
          >
            <img src={poster} className="h-full w-full object-cover" alt="" />
            <span className="absolute top-1/2 left-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 fill-black"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )
      )}
    </div>
  )
}
