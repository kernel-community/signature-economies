import { useState, createContext, useMemo, useContext } from 'react'
import ErrorModal from '../components/common/ErrorModal'

export const ErrorContext = createContext({
  text: '',
  isOpen: false,
  set: () => {},
  open: () => {},
  close: () => {},
  setIsOpen: () => {},
  setText: () => {}
})

export default function useError () {
  return useContext(ErrorContext)
}

export const ErrorProvider = ({ children }) => {
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
    <ErrorContext.Provider value={value}>
      <>
        {isOpen &&
          <ErrorModal
            text={text}
            onClose={close}
          />}
        {children}
      </>
    </ErrorContext.Provider>
  )
}
