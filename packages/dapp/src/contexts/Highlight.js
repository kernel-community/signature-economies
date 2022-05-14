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
        text: window.getSelection().toString(),
        modal: true
      }
    }
    case 'close': {
      if (!state.modal) return state;
      return {...state, modal: false};
    }
    case 'ready': {
      console.log(action.payload);
      // upload image to arweave & mint
      // return {...state, image: action.payload};
      return state;
    }
    case 'mint': {
      // upload to
      // mint nft here
      return state;
    }
    default: return state;
  }
}
const initial = {
  bar: false,
  text: "",
  modal: false,
  image: ""
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