import React from 'react'
import Game from '../game';



export default function Loaded({
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
  return(
  <div>
    <h1 className="hangman">Hangman</h1>
    <br />
    {/* Enable the line below to be able to see the word */}
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
          <img src={require(`../../images/hangman/${guessesRemaining()}.png`)} alt="" />
          <h5>type any letter or word...!!!!!</h5>
        </div>
        :
        solved().won ?
          (
            <>
              <p>You Won!!! and the gussed word is: "{word}" </p>
              <p><button onClick={() => resetGame()}>Play again!</button></p>
              <img src={require(`../../images/hangman/win.png`)} alt="You Won" />
            </>
          )
          :
          <div>
            <p>You lost! and the word was : "{word}"</p>
            <p><button onClick={() => resetGame()}>Play again!</button></p>
            <img src={require(`../../images/hangman/${guessesRemaining()}.png`)} alt="" />
          </div>
    }
  </div>
  )
}