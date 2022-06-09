import React from 'react'
import { ReactP5Wrapper } from 'react-p5-wrapper'
import Canvas from './utils/Canvas'
import text from './utils/Text'

function App() {
  let essay = text.split('')
  const str = window.location.href
  const index = str.split('?')
  if(index[1].includes('%3F')) {
    let fallback = index[1].split('%3F')
    var removeCount = fallback[1] - fallback[0]
    var selected = essay.splice(fallback[0], removeCount)
  } else {
    removeCount = index[2] - index[1]
    selected = essay.splice(index[1], removeCount)
  }
  let highlighted = selected.join('')
  
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
  );
}

export default App;
