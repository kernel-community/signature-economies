const HeaderPoem = () => {
  return (
    <div className="flex flex-col pb-16 gap-y-12 text-md md:text-2xl font-garamond text-center items-center justify-center">
    <div>
        To bear and not to own; <br /> to act and not lay claim;
        <br /> to do the work and let it go:
        <br /> for just letting it go
        <br /> is what makes it stay.
    </div>
    <div>
        -- Chapter 2,{' '}
        <span className="font-bold underline">
        <a target="_blank" rel="noreferrer" href="http://www.sfhunyuan.com/images/TAO_TE_CHING_-_LE_GUIN_edition.pdf">
            Tao Te Ching
        </a>
        </span>
    </div>
    <div>
        Empty-handed <br />
        I entered into this world,
        <br />
        Barefoot I leave it.
        <br />
    </div>
    <div>
        --
        <span className="font-bold">
            {' '}
            Kozan Ichikyo
        </span>
    </div>
    </div>
  )
}
export default HeaderPoem;