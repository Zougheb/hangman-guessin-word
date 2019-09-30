import React, { useState, useEffect } from 'react'
import './App.css'
import _ from 'lodash'
import Loaded from './components/load-game'
import { randomWord } from './words'
// import Game from './components/game'
// import words from './words'


// Array.prototype.sample = function () {
//   return this[Math.floor(Math.random() * this.length)]
// }





export default function App() {

  const defaultState = {
    word: "",
    correct: [],
    incorrect: []
  }

  const [state, setState] = useState(defaultState)
  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const { word, correct, incorrect } = state

  useEffect(() => {
    console.dir(state)
    if (solved()) {
      if (word.length > 0 && won()) setWins(wins + 1)
      if (lost()) setLosses(losses + 1)
    }
  }, [state])

  useEffect(() => {
    loadGame()
  }, [])

// ================================================================================
  // Here I tried to fetch the data using the provided url
  // but i got "Cors" issues so i come up with an array of data
  // and start using it to build the game
  function loadGame() {
    fetch("http://app.linkedin-reach.io/words")
      .then(response => {
        response.text()
      }).then(words => {
        setState(prevState => ({
          ...prevState,
          word: words.toLowerCase()
        }))
        setLoaded(true)
      }).catch(() => {
        setState(prevState => ({
          ...prevState,
          // word: words.sample().toLowerCase()
          word: randomWord().toLowerCase()
        }))
        setLoaded(true)
      })
  }
// ==================================================================================
  function guessesRemaining() {
    return 6 - incorrect.length
  }

  function guessLetter(letter) {
    const key = word.indexOf(letter) > -1 ? 'correct' : 'incorrect'
    console.log('letter guessed:', letter)
    console.log('state key:', key)

    setState(prevState => ({
      ...prevState,
      [key]: [...prevState[key], letter]
    }))

  }

  function resetGame() {
    setState(defaultState)
    loadGame()

  }

  function solved() {
    return {
      'solved': won() || lost(),
      'won': won(),
      'lost': lost()
    }
  }

  function ignoreSpaces(letters) {
    return letters.filter(letter => letter !== " ")
  }

  function won() {
    return _.uniq(ignoreSpaces(word.split(""))).length === _.uniq(correct).length
  }

  function lost() {
    return guessesRemaining() === 0 &&
      _.uniq(ignoreSpaces(word.split(""))).length !== _.uniq(correct).length
  }

  return(
          <div className="App">
            {
              !loaded
                ? null
                : <Loaded
                  word={word}
                  correct={correct}
                  incorrect={incorrect}
                  solved={solved}
                  guessesRemaining={guessesRemaining}
                  resetGame={resetGame}
                  guessLetter={guessLetter}
                  wins={wins}
                  losses={losses}
                />
            }
          </div>
        ) 
}