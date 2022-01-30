// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./ERC721Tradable.sol";

contract SignatureNFT is ERC721Tradable {
    constructor(
        address _proxyRegistryAddress
    ) ERC721Tradable('Signature Economies', 'SIGN', _proxyRegistryAddress) {}

    /**
     * @dev Link to Contract metadata https://docs.opensea.io/docs/contract-level-metadata
    */
    function contractURI() public pure returns (string memory) {
        //TODO: finish the json file is /assets and upload to Arweave.
        return "https://arweave.net/";
    }

    /**
     * @dev mints a unique NFT from some user-selected piece of text (which we make into an image & store in Arweave)
     * @param selection arweave url
     */
    function mintSelected(string memory selection) 
        public 
    {
        //TODO: are there ways to protect this function?
        safeMint(msg.sender, selection);
    }
}
