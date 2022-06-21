import { useState, createContext, useMemo, useContext } from 'react'
import LoadingModal from '../components/common/LoadingModal'

export const LoadingContext = createContext({
  text: '',
  isOpen: false,
  set: () => {},
  open: () => {},
  close: () => {},
  setIsOpen: () => {},
  setText: () => {}
})

export default function useLoading () {
  return useContext(LoadingContext)
}

export const LoadingProvider = ({ children }) => {
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
    <LoadingContext.Provider value={value}>
      <>
        {isOpen &&
          <LoadingModal text={text} />}
        {children}
      </>
    </LoadingContext.Provider>
  )
}
