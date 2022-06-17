/**
 * All logic for the modal that pops up on highlight, after clicking mint
 * highlight -> open modal -> click mint (in background: uploads image to arweave, generates metadata, uploads metadata to arweave) -> mints the nft
 */
import { useReducer, createContext, useMemo } from 'react'
import Text from '../components/text'

export const HighlightContext = createContext()

const initial = {
  text: '',
  modal: false,
  image: undefined,
  tx: undefined,
  start: undefined,
  end: undefined,
  error: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'highlight': {
      const start = Text.indexOf(action.payload)
      const length = action.payload.length
      const end = start + length
      return {
        ...state,
        error: false,
        text: action.payload,
        modal: true,
        image: undefined,
        start,
        end
      }
    }
    case 'close': return initial
    default: return {...state, ...action}
  }
}

export const HighlightProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial)
  const value = useMemo(() => {
    return {
      state,
      dispatch
    }
  }, [state, dispatch])
  return (
    <HighlightContext.Provider value={value}>
      {children}
    </HighlightContext.Provider>
  )
}
