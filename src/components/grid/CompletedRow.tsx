import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'

type Props = {
  currentSolution: string
  guess: string
  isRevealing?: boolean
}

export const CompletedRow = ({ currentSolution, guess, isRevealing }: Props) => {
  const statuses = getGuessStatuses(currentSolution, guess)

  return (
    <div className="flex justify-center mb-1">
      {guess.split('').map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
        />
      ))}
    </div>
  )
}
