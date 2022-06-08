/**
 * All logic for the modal that pops up on highlight, after clicking mint
 * highlight -> open modal -> click mint (in background: uploads image to arweave, generates metadata, uploads metadata to arweave) -> mints the nft
 */
import { useReducer, createContext, useMemo } from "react";

export const HighlightContext = createContext();

const reducer = (state, action) => {
  // reducer will only cause a re-render if it returns a new / changed state
  switch(action.type) {
    case 'highlight': {
      if (state.modal) return state;
      return {
        ...state,
        text: action.payload,
        modal: true,
        image: undefined
      }
    }
    case 'close': {
      console.log('closing modal');
      if (!state.modal) return state;
      return {
        ...state,
        modal: false,
      };
    }
    case 'ready': {
      return {
        ...state,
        image: action.payload
      };
    }
    case 'loading': {
      console.log('setting loading', action.payload);
      return {
        ...state,
        loading: action.payload,
      }
    }
    case 'mint': {
      console.log("setting mint", action.payload);
      return {
        ...state,
        mint: action.payload.success,
        tx: action.payload.tx
      }
    }
    default: return state;
  }
}
const initial = {
  text: "",
  modal: false,
  image: undefined,
  mint: false,
  loading: false,
  tx: undefined
};
export const HighlightProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initial);
  const value = useMemo(() => {
    return {
      state,
      dispatch,
    };
  }, [state, dispatch]);
  return (
    <HighlightContext.Provider value={value}>
      {children}
    </HighlightContext.Provider>
  )
}