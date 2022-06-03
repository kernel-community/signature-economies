const signatureList = [
    {
        name: 'Jasmine Wang',
        txID: '0x1234567890123456789012345678901234567890',
        timestamp: '2020-01-01'
    },
    {
        name: 'Jacky',
        txID: '0x1234567890123456789012345678901234567890',
        timestamp: '2020-01-01'
    },
    {
        name: 'Daanish Shabbir',
        txID: '0x1234567890123456789012345678901234567890',
        timestamp: '2020-01-01'
    },
    {
        name: 'Gareth Gransaull',
        txID: '0x1234567890123456789012345678901234567890',
        timestamp: '2020-01-01'
    },
    {
        name: 'Jasmine Sun',
        txID: '0x1234567890123456789012345678901234567890',
        timestamp: '2020-01-01'
    },
    {
        name: 'Raymond Z',
        txID: '0x1234567890123456789012345678901234567890',
        timestamp: '2020-01-01'
    },
    {
        name: 'Nick Inzucchi',
        txID: '0x1234567890123456789012345678901234567890',
        timestamp: '2020-01-01'
    },
    {
        name: 'Saffron Huang',
        txID: '0x1234567890123456789012345678901234567890',
        timestamp: '2020-01-01'
    },
    {
        name: 'Sebastien Zany',
        txID: '0x1234567890123456789012345678901234567890',
        timestamp: '2020-01-01'
    },
    {
        name: 'John Doe',
        txID: '0x1234567890123456789012345678901234567890',
        timestamp: '2020-01-01'
    }
]

function FreeSign(){
    return(
    <>
    <div className="mx-96 bg-white rounded-md flex flex-col px-8 md:px-0 py-16 w-4/5 md:w-2/3 gap-y-12 text-md md:text-2xl font-garamond text-justify items-center justify-center border-2 ">
       
                 <div className="px-2 md:px-16 text-center">
                If you find this essay meaningful, you may mark our shared record by sending a signed message of the whole text. This can be done freely, as there are no costs to signing onchain messages. In addition, your signature will be stored on Arweave and become a permanent part of this document's history.
                </div>
                <div className="w-48 shadow-sm hover:shadow-xl font-redaction px-4 py-2 border-2 border-gray-200 rounded-md hover:border-gray-400 transition-all cursor-pointer flex justify-center ">
                    Sign Freely
                </div>
              
              <hr className="w-full"/>
        
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
          
    </div>
    <div className="pt-16" />
        <hr className="w-2/3 mx-auto" />
    </>
    )
}

export default FreeSign;