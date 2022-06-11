import Hero from './Hero';

const HomeContent = () => {
    return (
      <div>
            <Hero />
            <div>
                <div className="mx-auto flex flex-col px-8 md:px-0 py-16 w-full md:w-[800px] gap-y-12 text-md md:text-2xl font-garamond text-center items-center justify-center">
                    <div>
                        This is an <strong>interactive essay</strong> which explores what it means to own.
                    </div>
                    <div>
                        Traditionally, ownership is about control and possession. 
                    </div>
                    <div>
                        Now, we must all face this simple question:
                    </div>
                    <div>
                        <strong>Will we use our technology to continue using, abusing, and extracting profit or can we cultivate more reciprocal relationships?</strong>
                    </div>
                    <hr className="w-2/3 mx-auto pt-6" />
                    <div>
                        To reimagine the meaning of words like 'ownership', we need media which perform what they say. You can therefore <strong>interact</strong> with this work in three ways:
                    </div>
                    <div>
                        <strong>1.</strong> Sign the whole essay as an onchain message on Ethereum. This is entirely free, and your signature is added permanently to the document.
                    </div>
                    <div>
                        <strong>2.</strong> Highlight any text you find most meaningful, mint it as an NFT, and share it with your friends. You only pay gas fees, and may sell or transfer the NFT anywhere and to anyone you like. A 10% royalty fee on secondary sales will be sent to Kernel.
                    </div>
                    <div>
                        <strong>3.</strong> Mint a "Sealed NFT". These are dynamic images that change depending on the amount used to mint them. All funds are sent to Kernel. Such seals are{' '}<a href="https://www.kernel.community/en/learn/module-1/playdough-protocols/#faith-and-finance" target="_blank" rel="noreferrer">the original link between faith, finance, money and writing</a>.
                    </div>
                    <div>
                        <a href='/essay' className='bg-white select-none text-center border-gray-600 border-2 py-2 px-6 md:px-12 md:py-4 rounded-md w-48 md:w-64 font-redaction no-underline cursor-pointer'>
                            Begin
                        </a>
                    </div>
                    <hr className="w-2/3 mx-auto pt-6" />
                    <div>
                        Our deep intention with this work is to <strong>strike a balance</strong>. Kernel is entirely open source and, like all public goods, must find creative ways of sustaining itself. These ways must reflect what{' '}
                        <a href="https://www.kernel.community/en/learn/" target="_blank" rel="noreferrer">we teach</a>, 
                        and so we present this as an invitation to ongoing conversation about what wholesome funding mechanisms might look like in web3. It is not just financial, but it includes the financial within a wider view of what it means to "make" money. As our friends have taught us:{' '}
                        <a href="https://www.kernel.community/en/conversation/thanksgiving" target="_blank" rel="noreferrer">balance must always come from where there is more</a>. We hope this offering inspires you to participate, and opens up a path for you to make an impact in ways which you find to be most significant.
                    </div>
                </div>
            </div>
      </div>
    )
}

export default HomeContent;