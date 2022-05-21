// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import {ERC721Tradable} from "./base/ERC721Tradable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract SignatureNFT is ERC721Tradable {

    error NotAuthorized();
    error WrongSignature();

    // A Kernel address for proper attribution
    address public creator;

    /**
     * @notice account used to sign the mintings
     */
    address public signer;

    event NewSignature(address signer, uint256 indexed tokenId, string uri);

    modifier onlyCreator() {
        if (msg.sender != creator) {
            revert NotAuthorized();
        }
        _;
    }

    constructor(address _proxyRegistryAddress, address _creator, address _signer)
        ERC721Tradable("Signature Economies", "SIGN", _proxyRegistryAddress)
    {
        creator = _creator;
        signer = _signer;
    }

    /**
     * @dev Link to Contract metadata https://docs.opensea.io/docs/contract-level-metadata
     */
    function contractURI() external pure returns (string memory) {
        return
            "https://arweave.net/Ljzre0Drnwhbx8DIoDIMQ0ufC1Ku_HtvRi9IIxNulMQ";
    }

    /** @notice Set the royalties for the whole contract. Our intention is to set it to 10% in perpetuity.
     *  @param recipient the royalties recipient - will always be pr1s0nart, for regulatory reasons.
     *  @param value royalties value (between 0 and 10000)
     */
    function setRoyalties(address recipient, uint256 value)
        external
        onlyCreator
    {
        _setRoyalties(recipient, value);
    }

    /**
     * @dev mints a unique NFT from some user-selected piece of text (which we make into an image & store in Arweave)
     * @param uri arweave url
     * @param tokenId the tokenId to mint
     * @param signature from `signer` to ensure no race condition on token ids
     * TODO: are there ways to protect this function while still ensuring readers pay gas fees and we don't use onlyOwner?
     */
    function mintSelected(string memory uri, uint256 tokenId, bytes calldata signature) external {
        // verifies tokenId has been signed / validated by signer
        _verifySignature(tokenId, uri, signature);
        
        // @TODO: verify in eip721 if minting shouldn't come from address(0)
        _safeMint(creator, msg.sender, tokenId);
        _setTokenURI(tokenId, uri);

        emit NewSignature(msg.sender, tokenId, uri);
    }

    /**
     * @notice allows creator to set a new signer for the mint
     * @param newSigner address of the new signer
     */
    function setSigner(address newSigner) public onlyCreator {
        signer = newSigner;
    }

    /**
     * @dev function that verifies tokenId has been approved / signed by `signer`
     * @param tokenId the token id to sign
     * @param signature the signer signature
     */
    function _verifySignature(uint256 tokenId, string memory uri, bytes calldata signature) internal view {
        // we can set signer to address(0) to deactivate the verification
        if (signer != address(0)) {
            bytes32 message = ECDSA.toEthSignedMessageHash(
                keccak256(abi.encode(tokenId, uri))
            );

            if (signer != ECDSA.recover(message, signature)) {
                revert WrongSignature();
            }
        }
    }
}