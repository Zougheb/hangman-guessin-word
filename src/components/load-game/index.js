import React from 'react'
import Game from '../game';



export default function Loaded({
  wins,
  losses,
  word,
  correct,
  incorrect,
  solved,
  won,
  guessesRemaining,
  resetGame,
  guessLetter,
  difficulty,
  setDifficulty
}) {
  return(
  <div>
    <h1 className="hangman">Hangman</h1>
    <br />
     {/* Enable the below line if you want to see the word */}
     {/* <p>{word}</p> */}
      {
        solved()
        ? null
        : <h5>type any letter or word...!!!!!</h5>
      }

      <label>
        <input type="radio" name="difficulty" value="easy"
          onChange={() => setDifficulty("easy")}
          defaultChecked={difficulty === "easy"}
        /> Easy
      </label>

      <label>
        <input type="radio" name="difficulty" value="hard"
          onChange={() => setDifficulty("hard")}
          defaultChecked={difficulty === "hard"}
        /> Hard
      </label>

    <p>
      wins: {wins} / losses: {losses}
    </p>

     

    <p>Guesses Remaining :{guessesRemaining()}</p>
    {
      !solved()
        ? <div>
            
          <Game
            word={word}
            correct={correct}
            incorrect={incorrect}
            guessLetter={guessLetter}
            solved={solved}
          />
          <img src={require(`../../images/hangman/${guessesRemaining()}.png`)} alt="" />
          
        </div>
        :
        won() ?
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