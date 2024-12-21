'use client'

import { useReducer, useEffect, ReactNode } from 'react'

import { reducer, initialState, modes } from './hooks'
import { getFingerprint, load } from './fingerprints'
import { classNames } from './utils'
import Stats from './Stats'
import Choices from './Choices'
import NextImage from 'next/image'

export default function Minigame({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    load().then(() => dispatch({ type: 'FINGERPRINTS_LOADED' }))
  }, [])

  useEffect(() => {
    if (state.wrongFlash) {
      setTimeout(() => dispatch({ type: 'STOP_WRONG_FLASH' }), 100)
    }
  }, [state.wrongFlash])

  return (
    <div
      className={classNames(
        'min-h-screen space-y-12 px-2 pb-24 pt-6 text-white transition-colors ease-in-out',
        state.wrongFlash ? 'bg-red-600 duration-0' : 'bg-black duration-500',
      )}
    >
      <div className="relative mx-auto max-w-2xl space-y-12">
        <div className="flex justify-between">
          <div>
            <NextImage
              src={getFingerprint(state.shuffledFingerprints[0])}
              className={classNames(
                'opacity-50',
                state.mode === 'hard' ? 'invisible' : '',
              )}
              draggable={false}
              width="400"
              height="512"
              alt=""
              priority
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              {modes.map((mode) => (
                <button
                  className={classNames(
                    'ml-auto block text-xl uppercase',
                    state.mode === mode ? '' : 'opacity-50',
                  )}
                  onClick={() => dispatch({ type: 'SET_MODE', mode })}
                  key={mode}
                >
                  {mode}
                </button>
              ))}
            </div>
            <Stats state={state} />
          </div>
        </div>
        <Choices state={state} dispatch={dispatch} />
      </div>
      {children}
    </div>
  )
}
