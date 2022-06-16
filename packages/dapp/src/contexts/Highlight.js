/**
 * All logic for the modal that pops up on highlight, after clicking mint
 * highlight -> open modal -> click mint (in background: uploads image to arweave, generates metadata, uploads metadata to arweave) -> mints the nft
 */
import { useReducer, createContext, useMemo } from 'react'
import Text from '../components/text'

const ETHERSCAN_TX = 'https://etherscan.io/tx/'

export const HighlightContext = createContext()
const initial = {
  text: '',
  modal: false,
  image: undefined,
  mint: false,
  loading: false,
  tx: undefined,
  start: undefined,
  end: undefined,
  error: false
}
const reducer = (state, action) => {
  // reducer will only cause a re-render if it returns a new / changed state
  switch (action.type) {
    case 'highlight': {
      const start = Text.indexOf(action.payload)
      const length = action.payload.length
      const end = start + length
      if (state.modal) return state
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
    case 'close': {
      if (!state.modal) return state
      return initial
    }
    case 'ready': {
      return {
        ...state,
        error: false,
        image: action.payload
      }
    }
    case 'loading': {
      return {
        ...state,
        error: false,
        loading: action.payload
      }
    }
    case 'mint': {
      return {
        ...state,
        mint: action.payload.success,
        tx: ETHERSCAN_TX + action.payload.tx
      }
    }
    case 'error': {
      return {
        ...state,
        error: action.payload
      }
    }
    default: return state
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
