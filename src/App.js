import React, { useState, useEffect } from 'react'
import './App.css'

import _ from 'lodash'

import Game from './components/game'

import words from './words'

Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)]
}
const defaultState = {
  word: "",
  correct: [],
  incorrect: []
}

function Loaded({
  wins,
  losses,
  word,
  correct,
  incorrect,
  solved,
  guessesRemaining,
  resetGame,
  guessLetter
}) {
  return <div>
    <h1 className="hangman">Hangman</h1>

    {/* Enable the below  line to be able to see the word */}
    {/* <p>{word}</p> */}

    <p>
      wins: {wins} / losses: {losses}
    </p>

    <p>Guesses Remaining :{guessesRemaining()}</p>
    {
      !solved().solved
        ? <div>

          <Game
            word={word}
            correct={correct}
            incorrect={incorrect}
            guessLetter={guessLetter}
            solved={solved}

          />
          <img src={require(`./images/hangman/${guessesRemaining()}.png`)} />
          <h5>type any letter or word...!!!!!</h5>
        </div>
        :
        solved().won ?
          (
            <>
              <p>You Won!!! and the gussed word is: {word}</p>
              <p><button onClick={() => resetGame()}>Play again!</button></p>
              <img src={require(`./images/hangman/win.png`)} />
            </>
          )
          :
          <div>
            <p>You lost</p>
            <p><button onClick={() => resetGame()}>Play again!</button></p>
            <img src={require(`./images/hangman/${guessesRemaining()}.png`)} />

          </div>
    }
  </div>
}

export default function App({ }) {
  const [state, setState] = useState(defaultState)
  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const { word, correct, incorrect } = state

  useEffect(() => {
    console.dir(state)
    if (solved()) {
      if (word.length > 0 && won()) setWins(prevState => prevState + 1)
      if (lost()) setLosses(prevState => prevState + 1)
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
          word: words
        }))
        setLoaded(true)
      }).catch(() => {
        setState(prevState => ({
          ...prevState,
          word: words.sample().toLowerCase()
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

  return <div className="App">

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
}