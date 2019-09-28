// import React, { useState } from 'react';

// export default function SubmitGuess({ guessLetter }) {
//   const [value, setValue] = useState("")

//   function handleSubmit(e) {
//     e.preventDefault()
//     guessLetter(value)
//     setValue("")
//   }

//   return <div>
//     <form onSubmit={handleSubmit}>
//       <input
//         placeholder="type 1 letter"
//         type="text"
//         maxLength="1"
//         value={value}
//         name="guess"
//         onChange={(e) => setValue(e.target.value.toLowerCase())}
//       />
//       <button>Submit! (or, hit enter)</button>
//     </form>
//   </div>
// }