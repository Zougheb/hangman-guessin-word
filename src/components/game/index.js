import React from 'react'
import DisplayWord from '../display-word';

import useEventListener from '@use-it/event-listener'

export default function Game({
  word, correct, incorrect, guessLetter, solved
}) {
  // console.log(word)
  // console.log(correct)
  // console.log(incorrect)
  // console.log(guessLetter)

  useEventListener('keydown', ({ key, keyCode }) => {
    const pressed = key.toLowerCase()
    // 65 = a
    // 90 = z
    // 48 = 0
    // 57 = 9
    if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 48 && keyCode <= 57) ) {
      if (!incorrect.includes(pressed) && !correct.includes(pressed))
        guessLetter(pressed)
    }
  })

  return <>
    <p>Current Word : <DisplayWord
        correct={correct}
        word={word}
      />
    </p>
   
    <p>
        Incorrect guesses :
        <div className="WrongLetters">
          {incorrect}
        </div>
    </p>
  </>
}