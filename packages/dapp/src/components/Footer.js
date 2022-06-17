import { SliderContext } from "../contexts/Slider"
import { useContext } from "react"

const Footer = () => {
  const slider = useContext(SliderContext);
  return (
    <>
      <div className='
        flex
        flex-col
        text-gray-800
        w-full
        justify-center
        sm:py-6
        py-6
        text-base
        sm:text-3xl
        font-garamond
        fixed bottom-0
        bg-white
        items-center
        gap-2 shadow-2xl shadow-black z-10
      '>
        <div
          className="flex flex-row gap-2 items-center"
        >
          <div
            className="cursor-pointer border-b-2"
            onClick={() => window.open("/essay#free-sign", "_self")}
          >
            sign freely
          </div>
          <div>
            /
          </div>
          <div
            className="cursor-pointer border-b-2"
            onClick={() => slider.dispatch({ type: 'open' })}
          >
            mint a seal
          </div>
        </div>
      </div>
    </>

  )
}

export default Footer
