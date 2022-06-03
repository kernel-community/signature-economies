import { signatureList } from "./dummy";

const SignatureList = () => {
  return (
    <>
    <div className="flex flex-col gap-y-8 mx-auto text-gray-500 w-full">
      {signatureList.map((signature, index) => (
        <div className=" mx-auto flex flex-row gap-x-8 justify-between w-full md:w-2/3" key={index}>
          <div className="flex  flex-row gap-x-8 w-max flex-shrink-0 items-center justify-center">
              {signature.name}
              <p className="text-ellipsis text-gray-300 hidden md:block  overflow-hidden w-32">
              {signature.txID}
          </p>
          </div>
          <div className="text-right">
              {signature.timestamp}
          </div>
        </div>
      ))}
    </div>
    <div className=" text-gray-500 text-md">
      Load more
    </div>
    </>
  )
}

export default SignatureList;
