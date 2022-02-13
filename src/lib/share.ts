import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'
import { GAME_TITLE } from '../constants/strings'

export const shareStatus = (
  objectiveWords: string[],
  guesses: string[],
  lost: boolean,
  isHardMode: boolean
) => {
  navigator.clipboard.writeText(
    `${GAME_TITLE} ${solutionIndex} ${lost ? 'X' : guesses.length}/∞${
      isHardMode ? '*' : ''
    }\n\n` + generateEmojiGrid(objectiveWords, guesses)
  )
}

export const generateEmojiGrid = (objectiveWords: string[], guesses: string[]) => {
  return guesses
    .map((guess, i) => {
      const status = getGuessStatuses(objectiveWords[i], guess)
      return guess
        .split('')
        .map((_, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟩'
            case 'present':
              return '🟨'
            default:
              if (localStorage.getItem('theme') === 'dark') {
                return '⬛'
              }
              return '⬜'
          }
        })
        .join('')
    })
    .join('\n')
}
