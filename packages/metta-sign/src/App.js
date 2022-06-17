import React from 'react'
import { ReactP5Wrapper } from 'react-p5-wrapper'
import Canvas from './utils/Canvas'
import text from './utils/Text'

function App () {
  const essay = text.split('')
  const [x, y] = window.location.hash.slice(1).split('-').map((e) => parseInt(e))
  if (y-x > 463) {
    return (
      <div>
        You have highlighted too many characters for us to fit into your NFT. Please try again <a href="https://sign.kernel.community" target="_blank" rel="noreferrer">here</a>.
      </div>
    )
  }
  const selected = essay.splice(x, (y - x))
  const highlighted = selected.join('')

  if (highlighted === null || highlighted === '') {
    return (
      <p>Loading...</p>
    )
  }
  return (
    <>
      <ReactP5Wrapper
        sketch={Canvas}
        selectedText={highlighted}
      />
    </>
  )
}

export default App
