// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import { ERC721Tradable } from "./base/ERC721Tradable.sol";
import { IERC20 } from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import { IWETH } from './interfaces/IWETH.sol';
import { Counters } from "@openzeppelin/contracts/utils/Counters.sol";

contract SignatureFund is ERC721Tradable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // A Kernel address for proper attribution
    address public creator;

    // The address of the WETH contract
    address public weth;

    event DonationReceived(address indexed donor, uint256 amount, uint256 indexed tokenId, string uri);

    constructor(
        address _proxyRegistryAddress,
        address _creator,
        address _weth
    ) ERC721Tradable('Signature Fund', 'SING', _proxyRegistryAddress) {
        creator = _creator;
        weth = _weth;
    }

    /**
     * @dev Link to Contract metadata https://docs.opensea.io/docs/contract-level-metadata
    */
    function contractURI() public pure returns (string memory) {
        //TODO: finish the json file is /assets and upload to Arweave.
        return "https://arweave.net/";
    }

    /** @notice Set the royalties for the whole contract. Our intention is to set it to 10% in perpetuity.
     *  @param recipient the royalties recipient - will always be pr1s0nart, for regulatory reasons.
     *  @param value royalties value (between 0 and 10000)
    */
    function setRoyalties(address recipient, uint256 value) 
        public
    {
        require(msg.sender == creator, "Only the creator of this contract can set and change royalites");
        _setRoyalties(recipient, value);
    }

    /**
     * @dev Receives donation and mints new NFT for donor
     * @param selectedNFT a string that allows us to determine which NFT at which level to mint and return to the donor
     */
    function receiveDonation(string memory selectedNFT) public payable {
        require(msg.value >= 0.01 ether, "SignatureFund: Minimum donation is 0.01 ETH");

        // Here, we let the reader select which of the 8 available NFTs they wish to mint.
        // Each of these is already stored in Arweave, with 3 different versions.
        // Depending on the value of the message which mints the selected NFT, we assign
        // the metadataURI used when minting the NFT
        // https://arweave.net/HhNPw5V8eTrLhbDR1f40_qCwsKjLSnb7bPkI7Ctzhwk/0/one.jpg or
        // https://arweave.net/HhNPw5V8eTrLhbDR1f40_qCwsKjLSnb7bPkI7Ctzhwk/1/two.jpg etc.

        string memory uri;
        string memory arweaveBase = 'https://arweave.net/HhNPw5V8eTrLhbDR1f40_qCwsKjLSnb7bPkI7Ctzhwk/';
        
        if(msg.value >= 0.01 ether && msg.value < 1 ether) {
            uri = string(abi.encodePacked(arweaveBase,"0/",selectedNFT,".jpg"));
        } else if(msg.value >= 1 ether && msg.value < 10 ether) {
            uri = string(abi.encodePacked(arweaveBase,"1/",selectedNFT,".jpg"));
        } else {
            uri = string(abi.encodePacked(arweaveBase,"10/",selectedNFT,".jpg"));
        }

        uint256 newTokenId = _tokenIdCounter.current();
        _safeMint(creator, msg.sender, newTokenId);
        _setTokenURI(newTokenId, uri);
        _tokenIdCounter.increment();

        _safeTransferETHWithFallback(msg.value);
        emit DonationReceived(msg.sender, msg.value, newTokenId, uri);
    }

    /**
     * @notice Transfer ETH. If the ETH transfer fails, wrap the ETH and try send it as WETH.
     * @param amount the total amount
     */
    function _safeTransferETHWithFallback(uint256 amount) internal {
        if (!_safeTransferETH(amount)) {
            IWETH(weth).deposit{ value: amount }();
            IERC20(weth).transfer(creator, amount);
        }
    }

    /**
     * @notice Transfer ETH and return the success status.
     */
    function _safeTransferETH(uint256 amount) internal returns (bool) {
        (bool success, ) = creator.call{value: amount, gas: 30_000 }(new bytes(0));
        return success;
    }

}