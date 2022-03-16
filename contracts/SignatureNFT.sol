// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import { ERC721Tradable } from "./base/ERC721Tradable.sol";
import { Counters } from "@openzeppelin/contracts/utils/Counters.sol";

contract SignatureNFT is ERC721Tradable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // A Kernel address for proper attribution
    address public creator;

    event newSignature(address signer, uint256 indexed newTokenId, string uri);

    constructor(
        address _proxyRegistryAddress,
        address _creator
    ) ERC721Tradable('Signature Economies', 'SIGN', _proxyRegistryAddress) {
        creator = _creator;
    }

    /**
     * @dev Link to Contract metadata https://docs.opensea.io/docs/contract-level-metadata
    */
    function contractURI() public pure returns (string memory) {
        //TODO: finish the json file is /assets and upload to Arweave.
        return "https://arweave.net/";
    }

    /**
     * @dev mints a unique NFT from some user-selected piece of text (which we make into an image & store in Arweave)
     * @param uri arweave url
     * TODO: are there ways to protect this function while still ensuring readers pay gas fees and we don't use onlyOwner?
     */
    function mintSelected(string memory uri) 
        public 
    {
        uint256 newTokenId = _tokenIdCounter.current();
        _safeMint(creator, msg.sender, newTokenId);
        _setTokenURI(newTokenId, uri);
        _tokenIdCounter.increment();

        emit newSignature(msg.sender, newTokenId, uri);
    }
}
