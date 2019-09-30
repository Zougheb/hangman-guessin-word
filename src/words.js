const words = [
"hi",
"world",
"Mahmoud",
"test",
"Thanks",
"fooD",
"pasta",
"rice",
"hello world",
"test 123"
]

function randomWord() {
  return words[Math.floor(Math.random() * words.length)]
}

export { randomWord }