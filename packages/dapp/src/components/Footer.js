const Footer = () => {
  return (
    <>
      {/* DESKTOP FOOTER */}
      <div className='sm:flex flex flex-row text-gray-800 w-full justify-center py-6 mx-3 text-sm font-thin font-garamond hidden'>
        Built at KERNEL. Website design by&nbsp;<a href='https://twitter.com/MalayVasa/' target='_blank' rel='noreferrer'>@malayvasa</a>. NFT seals by&nbsp;<a href='https://twitter.com/noskovvkirill' target='_blank' rel='noreferrer'>@noskovvkirill</a>.
      </div>
      {/* MOBILE FOOTER */}
      <div className='sm:hidden flex flex-col font-garamond text-xs w-full text-center pb-6'>
        <div className='pb-2'>
          Built at KERNEL
        </div>
        <div className='pb-2'>
          Website design by&nbsp;<a href='https://twitter.com/MalayVasa/' target='_blank' rel='noreferrer'>@malayvasa</a>.
        </div>
        <div>
          NFT seals by&nbsp;<a href='https://twitter.com/noskovvkirill' target='_blank' rel='noreferrer'>@noskovvkirill</a>.
        </div>
      </div>
    </>
    
  )
}

export default Footer
