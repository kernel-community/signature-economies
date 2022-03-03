# Signature Economies

> To bear and not to own;  
to act and not lay claim;  
to do the work and let it go:  
for just letting it go  
is what makes it stay.  

Public blockchains present a paradox of ownership. No-one controls them and anyone can use them, given a connection and an ability to speak the common tongue. The network is ownerless, yet anyone who creates a key ‘owns’ any coins associated with it, so everyone is an owner. This confusion reveals how ‘ownership’ is shifting and highlights the opportunity we have not to implement an ‘ownership economy’, but to reimagine what being an owner means.

So, ownership in digital economies is really about the meaningful signatures required to execute state changes while maintaining consensus. Is ownership shifting from an ability to demonstrate control or possession to the ability to make meaning?

> To have without possessing,  
do without claiming,  
lead without controlling:  
this is mysterious power.  

## Contributing

We recommend using **Node v16**. The easiest way to manage node versions is with [nvm](https://github.com/nvm-sh/nvm).

```
git clone https://github.com/kernel-community/signature-economies.git
cd signature-economies
npm i
npm test
npm run dev
```

### ToDo

When finished, this project will allow readers to mint two different kinds of NFTs, as well as sign the document gaslessly to ensure there are free and literally non-financial ways to interact with the text meaningfully.

1. Any reader can select any text they like and mint that as an NFT using a background we design. The reader pays for the gas to do so, but there is no additional cost than this. They can do as they please with their NFT.
2. Any reader can buy a 1/infinity editions of the images or quotes (all text currently encapsulated in the `poetry` class). Based on the simple Arweave hack [here](https://github.com/kernel-community/signature-economies/blob/main/contracts/SignatureFund.sol#L44), they will get different backgrounds based on how much they donate when buying NFTs from this signature fund. All funds go directly to [Kernel](https://kernel.community) - an open source educational public good.

- [ ] Link footnotes for easier navigation.
- [ ] Wire up contracts to frontend for both kinds of minting actions.

## Thanks

1. The frontend is derivative of the work by [Verses](https://verses.xyz/) on the [Declaration of Interdependence](https://www.interdependence.online/about).
2. The contracts are inspired by [Rewilder](https://rewilder.xyz/), though they have been improved in some important ways.
3. Sam and the Arweave team for the inspiring work they continue to do.