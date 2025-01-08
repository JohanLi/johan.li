import NextImage from 'next/image'
import { Dispatch } from 'react'

import { getFingerprintElement } from './fingerprints'
import { Action, State } from './hooks'
import { classNames } from './utils'

interface Props {
  state: State
  dispatch: Dispatch<Action>
}

export default function Choices(props: Props) {
  const { shuffledElements, shuffledFingerprints, selectedElements } =
    props.state

  const choicesJsx = shuffledElements.map((i) => {
    const selected = selectedElements.includes(i)

    const type = selected ? 'REMOVE_ELEMENT' : 'ADD_ELEMENT'

    return (
      <div
        className="col-span-1 flex items-center justify-center"
        key={`${shuffledFingerprints[0]}-${i}`}
      >
        <NextImage
          src={getFingerprintElement(shuffledFingerprints[0], i)}
          onClick={() => props.dispatch({ type, number: i })}
          className={classNames('cursor-pointer', selected ? '' : 'opacity-50')}
          draggable={false}
          width="128"
          height="128"
          alt=""
          quality={1}
        />
      </div>
    )
  })

  return <div className="grid grid-cols-4 gap-4">{choicesJsx}</div>
}
