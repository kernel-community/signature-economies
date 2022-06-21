import { SliderContext } from '../../contexts/Slider'
import { useContext } from 'react'
import { sealedNFTS } from './nft'

const NFTList = () => {
  const { state, dispatch } = useContext(SliderContext)
  const elements = sealedNFTS.map((nft, index) => {
    const isSelected = state.selected === index
    return (
      <div
        className={
            `
              h-min
              ${isSelected ? 'border-2' : 'border-2 border-transparent'} bg-white rounded-lg hover:border-gray-200 transition-all  cursor-pointer p-1.5
            `
          }
        onClick={() => dispatch({ type: 'select', payload: index })}
        key={index}
      >
        <div className={
            `
              ${isSelected ? 'text-slate-800' : 'text-slate-400'} text-md hover:text-slate-800 transition-all flex items-center font-garamond
            `
          }
        >
          {nft.title}
        </div>
        <div className={
            `
              hidden sm:block
              ${isSelected ? 'text-slate-800' : 'text-slate-400'}
              text-sm hover:text-slate-800 transition-all flex items-center font-garamond
            `
          }
        >
          {nft.text}
        </div>
      </div>
    )
  })
  return elements
}
export default NFTList
