import { DISPLAYED_ROWS } from '../../constants/settings'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  guesses: string[]
  currentGuess: string
  isRevealing?: boolean
}

export const Grid = ({ guesses, currentGuess, isRevealing }: Props) => {
  const empties =
    guesses.length < DISPLAYED_ROWS - 1
      ? Array.from(Array(DISPLAYED_ROWS - 1 - guesses.length))
      : []

  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          guess={guess}
          isRevealing={isRevealing && guesses.length - 1 === i}
        />
      ))}
      {guesses.length < DISPLAYED_ROWS && <CurrentRow guess={currentGuess} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  )
}
