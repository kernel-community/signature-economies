/**
 * All logic for the modal that pops up on clicking the "mint sealed nft" button
 * click -> open modal -> mint
 */
 import { useReducer, createContext, useMemo } from "react";
 export const SliderContext = createContext();

 const reducer = (state, action) => {
  switch(action.type) {
    case 'close': {
      if (!state.modal) return state;
      return { ...state, modal: false }
    }
    case 'open': {
      if (state.modal) return state;
      return { ...state, modal: true }
    }
    case 'slide': {
      return {
        ...state,
        input: action.payload
      }
    }
    case 'select': {
      console.log('selecting');
      return {...state, selected: action.payload}
    }
    default: return state;
  }
 }

 const initial = {
   modal: false,
   input: 0,
   selected: 0
 }

 export const SliderProvider = ({children}) => {
   const [state, dispatch] = useReducer(reducer, initial);
   const value = useMemo(() => {
     return {state, dispatch}
   }, [state, dispatch]);
   return (
     <SliderContext.Provider value={value}>
       {children}
     </SliderContext.Provider>
   )
 }