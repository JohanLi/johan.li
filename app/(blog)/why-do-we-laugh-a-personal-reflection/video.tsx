'use client'

import { useRef, useState } from 'react'

import { Caption } from '../components/article/Caption'

export function Video() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasStarted, setHasStarted] = useState(false)

  const handlePlay = () => {
    const video = videoRef.current
    if (!video) return

    video.play()
    setHasStarted(true)
  }

  return (
    <div className="-mx-4 my-12 md:mx-0 lg:-mx-8">
      <div
        className="relative w-full aspect-[1920/784] cursor-pointer"
        onClick={handlePlay}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handlePlay()
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="Play Rush Hour clip"
      >
        {!hasStarted && (
          <>
            <img
              src="/rush-hour-poster.jpg"
              className="absolute w-full h-full object-cover top-0 left-0 z-10"
              aria-hidden="true"
              alt=""
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white border-none rounded-full w-20 h-20 flex items-center justify-center"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 fill-black"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </>
        )}
        <video
          ref={videoRef}
          preload="none"
          controls
          className="w-full h-full"
          poster="/rush-hour-poster.jpg"
          aria-label="Clip from Rush Hour (1998)"
        >
          <source src="/rush-hour.mp4" type="video/mp4" />
          <track
            src="/rush-hour.vtt"
            kind="subtitles"
            srcLang="en"
            label="English"
            default
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <Caption>
        “Do you understand the words that are coming out of my mouth?”—yes, that
        scene from Rush Hour (1998)
      </Caption>
    </div>
  )
}
