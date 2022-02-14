import { WORDS } from '../constants/wordlist'
import { VALID_GUESSES } from '../constants/validGuesses'
import {getGuessStatuses, getGuessStatusesAsString} from './statuses'

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALID_GUESSES.includes(word.toLowerCase())
  )
}

export const isWinningWord = (objectiveWord: string, word: string) => {
  return objectiveWord === word
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
export const findFirstUnusedReveal = (objectiveWord: string, word: string, guesses: string[]) => {
  const knownLetterSet = new Set<string>()
  for (const guess of guesses) {
    const statuses = getGuessStatuses(objectiveWord, guess)

    for (let i = 0; i < guess.length; i++) {
      if (statuses[i] === 'correct' || statuses[i] === 'present') {
        knownLetterSet.add(guess[i])
      }
      if (statuses[i] === 'correct' && word[i] !== guess[i]) {
        return `Must use ${guess[i]} in position ${i + 1}`
      }
    }
  }

  for (const letter of Array.from(knownLetterSet.values())) {
    // fail fast, always return first failed letter if applicable
    if (!word.includes(letter)) {
      return `Guess must contain ${letter}`
    }
  }
  return false
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date('January 1, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs

  return {
    solution: WORDS[index % WORDS.length].toUpperCase(),
    solutionIndex: index,
    tomorrow: nextday,
  }
}

export const findNextSolution = (runningSolutions: string[], allGuesses: string[], guesses: string[], currentSolution: string): string => {
  const solutionsAsMap: { [key: string]: boolean } = {}
  for (const solution of runningSolutions) {
    solutionsAsMap[solution] = true
  }
  for (const guess of allGuesses) {
    solutionsAsMap[guess] = true
  }
  const currentGuesses = guesses.map((guess) => getGuessStatusesAsString(currentSolution, guess))
  let startIndex = solutionIndex
  worldLoop: for (let i = 0; i < WORDS.length; i++) {
    startIndex++
    const index = startIndex % WORDS.length
    const word = WORDS[index].toUpperCase()
    if (solutionsAsMap[word]) {
      continue
    }
    for (let i1 = 0; i1 < guesses.length; i1++){
      const guess = guesses[i1]
      const guessStatus = getGuessStatusesAsString(word, guess)
      if (guessStatus !== currentGuesses[i1]) {
        continue worldLoop
      }
    }
    return word
  }
  return currentSolution
}

function randomInRange (minimum: number, maximum: number): number {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
}

export const { solution, solutionIndex, tomorrow } = getWordOfDay()
