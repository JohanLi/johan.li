import { useState } from 'react'

import { State, useInterval } from './hooks'
import { formatTimestamp, random } from './utils'

function ThisRun({ startTimestamp }: { startTimestamp: number }) {
  const [thisRun, setThisRun] = useState(0)

  useInterval(
    () => {
      setThisRun(performance.now() - startTimestamp)
    },
    random(40, 60),
  )

  return formatTimestamp(thisRun)
}

interface Props {
  state: State
}

export default function Stats(props: Props) {
  const { startTimestamp, lastRun } = props.state

  return (
    <div className="space-y-4 text-right">
      <div className="opacity-50">
        <div className="mb-1">Last run</div>
        <div>
          {lastRun ? formatTimestamp(lastRun) : '-'}
        </div>
      </div>
      <div>
        <div className="mb-1">This run</div>
        <div>
          {startTimestamp !== null ? (
            <ThisRun startTimestamp={startTimestamp} />
          ) : (
            '-'
          )}
        </div>
      </div>
    </div>
  )
}
