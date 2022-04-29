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

1. We recommend using **Node v14 or v16**. The easiest way to manage node versions is with [nvm](https://github.com/nvm-sh/nvm).

2. Make sure you have [yarn](https://classic.yarnpkg.com/lang/en/docs/install) and [hardhat](https://hardhat.org/) globally installed:

```bash
npm i -g yarn
npm i -g hardhat
```

3. Clone this repo and install all the necessary dependcies:

```bash
git clone https://github.com/kernel-community/signature-economies.git
cd signature-economies
yarn install
```

4. Now you can begin running the various scripts in the `package.json` file. For instance, to run the smart contract tests found in `packages/hardhat/test`:

```bash
yarn hadhat:test
```
Or, to run the React application found in `packages/dapp`:
```bash
yarn dapp:start
```

## Thanks

1. The frontend is derivative of the work by [Verses](https://verses.xyz/) on the [Declaration of Interdependence](https://www.interdependence.online/about).
2. The contracts are inspired by [Rewilder](https://rewilder.xyz/), though they have been improved in some important ways.
3. Sam and the Arweave team for the inspiring work they continue to do.