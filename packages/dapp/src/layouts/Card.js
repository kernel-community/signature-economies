import TweetIcon from "../components/common/TweetIcon";

const Card = ({
  children,
  toDisplay,
  height = '200px',
  width = '200px',
  url,
  showTweetLink = false
}) => {
  const openseaLink = () => window.open(url, '_blank');
  return (
    <>
    {/*
      this is a hack
      height is +50px from canvas (defined in App.css) & width is same as canvas
    */}
    <div className={
      `flex flex-col h-[${height}] w-[${width}] signatures
        hover:border-b-2
        transition-all
        hover:border-gray-400
        hover:pb-2
        cursor-pointer
      `
      }
      onClick={openseaLink}
    >
      {children}
      <div className='flex flex-row w-full justify-between items-center h-12 p-2 border-t-0 border-2'>
        <div className='text-black/60 font-redaction'>
        {toDisplay}
        </div>
        <div>
        {showTweetLink && <TweetIcon />}
        </div>
      </div>
    </div>
    </>
  )
}

export default Card;
