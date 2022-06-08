import ArrowDownwards from "../common/ArrowDownwards";

const Hero = () => {
  return (
    <div className="flex flex-col w-screen h-screen items-center ">
      <div className="flex md:text-8xl text-4xl flex-grow font-redaction text-gray-700 self-center">
        <div className="my-auto mix-blend-color-multiply text-center">
          Signature
          <br />
          Economies
        </div>
      </div>
      <div className='w-max mx-auto pt-16 pb-8 flex md:text-4xl text-2xl text-center font-redaction items-center self-center'>
        Make eternally beautiful signs
      </div>
      <ArrowDownwards />
    </div>
  )
}

export default Hero;
