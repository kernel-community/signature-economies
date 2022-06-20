import { useState, createContext, useMemo, useContext } from 'react'
import PauseForLoadingModal from '../components/common/LoadingModal'

export const PauseForLoadingContext = createContext({
  text: '',
  isOpen: false,
  set: () => {},
  open: () => {},
  close: () => {},
  setIsOpen: () => {},
  setText: () => {}
})

export default function useLoading() {
  return useContext(PauseForLoadingContext)
}

export const PauseForLoadingProvider = ({ children }) => {
  const [text, setText] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const value = useMemo(() => {
    return {
      isOpen,
      open: (text) => {
        setText(text)
        setIsOpen(true)
      },
      close,
      setIsOpen,
      setText
    }
  }, [setText, setIsOpen, isOpen])

  return (
    <PauseForLoadingContext.Provider value={value}>
      <>
        { isOpen &&
          <PauseForLoadingModal text={text}/>
        }
        { children }
      </>
    </PauseForLoadingContext.Provider>
  )
}
