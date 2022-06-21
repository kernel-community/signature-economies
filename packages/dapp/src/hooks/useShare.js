import { useState, createContext, useMemo, useContext } from 'react'
import ShareModal from '../components/common/ShareModal'

export const ShareContext = createContext({
  url: '',
  isOpen: false,
  set: () => {},
  open: () => {},
  close: () => {},
  setIsOpen: () => {},
  setText: () => {}
})

export default function useShare () {
  return useContext(ShareContext)
}

export const ShareProvider = ({ children }) => {
  const [url, setUrl] = useState('')
  const [image, setImage] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMesage] = useState('')
  const [shareOnTwitter, setShareOnTwitter] = useState(false)
  const close = () => setIsOpen(false)
  const value = useMemo(() => {
    return {
      isOpen,
      open: ({ url, img, msg, shareOnTwitter }) => {
        setUrl(url)
        setIsOpen(true)
        setImage(img)
        setMesage(msg)
        if (shareOnTwitter) setShareOnTwitter(shareOnTwitter)
      },
      close,
      setIsOpen,
      setUrl
    }
  }, [setUrl, setIsOpen, isOpen])

  return (
    <ShareContext.Provider value={value}>
      <>
        {
          isOpen &&
            <ShareModal
              url={url}
              onClose={close}
              image={image}
              message={message}
              shareOnTwitter={shareOnTwitter}
            />
        }
        {children}
      </>
    </ShareContext.Provider>
  )
}
