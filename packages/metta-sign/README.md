# Meta Sign

A simply immutable image generator for The Signature Economies.

## Get Started

```
git clone https://github.com/andytudhope/meta-sign.git
cd meta-sign
npm i
npm run start
```

## Notes

It has been fun and games to figure out how to host a React app on IPFS that will return images dynamically in a way that OpenSea can read them.

The basic gist here is that we: 

1. build this app
2. upload the `build/` directory to IPFS using pinata 
3. use the hash that is returned there, but `https://ipfs.is/ipfs/` rather than the pinata gateway, because it is severely rate-limited
4. Put that gateway + hash in the contract
5. deploy the contract
6. mint an NFT and return base64 encoded json directly from the `tokenURI` function, specifying that it overrides the general ERC721 route.
7. In particular, the `%3F` fallback check in this app is what took us ages to figure out, because OpenSea encodes their urls when fetching content from IPFS and the double `?` we use here is a strange construction.
8. We did try to use `#` and `-`, which would be a more usual use of url character, but for some reason, OpenSea could never fetch those and failed the show metadata entirely, so we could not reliably debug it.
9. this is why we have stuck with the strange double `?` and simply added fallback support for marketplaces that encode the urls they construct in their infra to fetch metadata from files provided to them.

---

### Character Indices Version

1. Functional on IPFS, with fallback for how OpenSea handles url encoding (? and ?, with %3F catch): https://ipfs.io/ipfs/QmaSN7PiDoBcJBdmpH4V2yQGzBYxCwNr5jb1tNt8widcuE/?0?517 (**this is the one we are using, as it works with characters, not words**)

### Word Indices Versions

2. Functional on IPFS, with fallback for how OpenSea handles url encoding (? and ?, with %3F catch, but works with words): https://ipfs.io/ipfs/QmcsrZcaxdZE6AMJDNQTxeP5UdaFb1GBQJfud7noHmpe5M/?0?30 .

3. Functional on Arweave, with correct url encoding (# and -): https://arweave.net/hBga7aRMofD07-Yyb_vI-uaRnvRS9la8qqJkQ5fuSWc/#0-30

4. Functional on IPFS with weird encoding, no animation (? and -): https://ipfs.io/ipfs/QmUPtHYB7k6QDxFdo8qkLHmsywKgNo58RRBeUHRCbGtYEc/?0-25

5. Functional on IPFS without correct encoding or fallback: https://ipfs.io/ipfs/QmWZzAg52Xk5yxAjsL58X4HZDGKDWo67rqrDzArLm64LSA/?0?63