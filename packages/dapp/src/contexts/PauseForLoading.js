import { useReducer, createContext, useMemo } from 'react'

export const PauseForLoadingContext = createContext()

const initial = {
  modal: false,
  text: '',
}

const reducer = (state, action) => {
  return {
    ...state,
    ...action
  }
}

export const PauseForLoadingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial)
  const value = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])
  return (
    <PauseForLoadingContext.Provider value={value}>
      {children}
    </PauseForLoadingContext.Provider>
  )
}
