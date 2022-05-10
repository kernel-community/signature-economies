// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import { ERC721Tradable } from "./base/ERC721Tradable.sol";
import { Counters } from "@openzeppelin/contracts/utils/Counters.sol";

contract SignatureNFT is ERC721Tradable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // A Kernel address for proper attribution
    address public creator;

    event NewSignature(address signer, uint256 indexed tokenId, string uri);

    constructor(
        address _proxyRegistryAddress,
        address _creator
    ) ERC721Tradable('Signature Economies', 'SIGN', _proxyRegistryAddress) {
        creator = _creator;
    }

    /**
     * @dev Link to Contract metadata https://docs.opensea.io/docs/contract-level-metadata
    */
    function contractURI() external pure returns (string memory) {
        return "https://arweave.net/bK5k3OV2GZWm11Sg3ULWBlSs--oFit1xbKusFe-S3cM";
    }

    /** @notice Set the royalties for the whole contract. Our intention is to set it to 10% in perpetuity.
     *  @param recipient the royalties recipient - will always be pr1s0nart, for regulatory reasons.
     *  @param value royalties value (between 0 and 10000)
    */
    function setRoyalties(address recipient, uint256 value) 
        external
    {
        require(msg.sender == creator, "Only the creator of this contract can set and change royalites");
        _setRoyalties(recipient, value);
    }

    /**
     * @dev mints a unique NFT from some user-selected piece of text (which we make into an image & store in Arweave)
     * @param uri arweave url
     * TODO: are there ways to protect this function while still ensuring readers pay gas fees and we don't use onlyOwner?
     */
    function mintSelected(string memory uri) 
        external 
    {
        uint256 newTokenId = _tokenIdCounter.current();
        _safeMint(creator, msg.sender, newTokenId);
        _setTokenURI(newTokenId, uri);
        _tokenIdCounter.increment();

        emit NewSignature(msg.sender, newTokenId, uri);
    }
}
