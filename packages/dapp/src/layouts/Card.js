import TweetIcon from '../components/common/TweetIcon'

const Card = ({
  children,
  toDisplay,
  height = '200px',
  width = '200px',
  url,
  showTweetLink = false,
  showAddress = true
}) => {
  const openseaLink = () => window.open(url, '_blank')
  return (
    <>
      <div
        className={
          `flex flex-col h-[${height}] w-[${width}] signatures
            cursor-pointer
            scale-95 hover:scale-100 ease-in-out duration-200
          `
      }
        onClick={openseaLink}
      >
        {children}
        {(showAddress || showTweetLink) && (
          <div className='flex flex-row w-full justify-between items-center h-12 p-2 border-t-0 border-2'>
          {showAddress &&
            (
              <div className='text-black/60 font-redaction'>
                {toDisplay}
              </div>
            )
          }
          <div>
            {showTweetLink && <TweetIcon />}
          </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Card
