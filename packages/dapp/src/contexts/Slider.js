/**
 * All logic for the modal that pops up on clicking the "mint sealed nft" button
 * click -> open modal -> mint
 */
import { useReducer, createContext, useMemo } from 'react'
import { sealedNFTS } from '../components/SliderModal/nft'


const getImg = (index, variation) => {
  if (variation >= 10) {
    return sealedNFTS[index].image_Front_10
  } else if (variation >= 1) {
    return sealedNFTS[index].image_Front_1
  } else {
    return sealedNFTS[index].image_Front_0
  }
}

export const SliderContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'close': return initial
    case 'open': {
      return {
        ...state,
        error: false,
        modal: true,
        image: getImg(state.selected, state.input)
      }
    }
    case 'slide': {
      return {
        ...state,
        error: false,
        input: action.payload,
        image: getImg(state.selected, action.payload)
      }
    }
    case 'select': {
      return {
        ...state,
        error: false,
        selected: action.payload,
        image: getImg(action.payload, state.input)
      }
    }
    default: return { ...state, ...action }
  }
}

const initial = {
  modal: false,
  input: 0.1,
  selected: 0,
  mint: false,
  loading: false,
  image: undefined,
  tx: undefined,
  error: false
}

export const SliderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial)
  const value = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])
  return (
    <SliderContext.Provider value={value}>
      {children}
    </SliderContext.Provider>
  )
}
