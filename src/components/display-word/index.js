import React from 'react'

export default function DisplayWord({ correct, word }) {

  // console.log("display correct:", correct)
  // console.log("display the word :", word)

  return(
    <div className="DisplayWord">

      {word.split("").map(letter => {
        return letter === " " || correct.indexOf(letter) > -1 ? letter : "_"
      })}
    </div>
  ) 
}