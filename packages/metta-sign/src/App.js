import React from 'react'
import { ReactP5Wrapper } from 'react-p5-wrapper'
import Canvas from './utils/Canvas'
import text from './utils/Text'

function App() {
  const essay = text.split('')
  const [x, y] = window.location.hash.slice(1).split('-').map((e) => parseInt(e))
  let selected = essay.splice(x, (y-x))
  let highlighted = selected.join('')
  
  if (highlighted === null || highlighted === '') {
    return (
      <p>Loading...</p>
    )
  }
  return (
    <>
      <div className="flex flex-col w-screen h-screen items-center ">
        <div className="flex md:text-6xl text-3xl flex-grow font-redaction text-gray-700 self-center">
          <div className="my-10 mix-blend-color-multiply text-center">
            Signature Economies
          </div>
        </div>
        <ReactP5Wrapper
          sketch={Canvas}
          selectedText={highlighted}
        />
        <div className="mx-auto flex flex-col px-8 md:px-0 py-16 w-full md:w-[800px] gap-y-12 text-md md:text-2xl font-garamond text-center items-center justify-center">
          <div>
            This is your signature tune, an eternally beautiful mark you have made and we have inscribed together in our shared state. Familiarise yourself again by returning to the:
          </div>
          <div>
            <a className="bg-white select-none text-center border-gray-600 py-2 px-4 md:px-8 w-48 md:w-64 border-2 rounded-md hover:border-black font-redaction cursor-pointer" href="https://sign.kernel.community" target="_blank" rel="noreferrer">Kernel</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
