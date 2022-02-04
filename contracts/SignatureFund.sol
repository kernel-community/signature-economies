// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/Address.sol";
import "./SignatureNFT.sol";

contract SignatureFund {

    using Address for address payable;

    SignatureNFT private _nft;
    address payable private _wallet;

    event DonationReceived(address indexed donor, uint256 amount, uint256 indexed tokenID);

    constructor(SignatureNFT nftAddress, address payable wallet) {
        _nft = nftAddress;
        _wallet = wallet;
    }

    /**
     * @dev Returns the address of the NFT contract.
     */
    function getSignatureNFT() public view virtual returns (SignatureNFT) {
        return _nft;
    }

    /**
     * @dev Receives donation and mints new NFT for donor
     */
    function receiveDonation(string memory selectedNFT) public payable {
        require(msg.value >= 0.001 ether, "Minimum donation is 0.001 ETH");

        // Here, we let the reader select which of the 8 available NFTs they wish to mint.
        // Each of these is already stored in Arweave, with 3 different versions.
        // Depending on the value of the message which mints the selected NFT, we assign
        // the metadataURI used when minting the NFT
        // https://arweave.net/HhNPw5V8eTrLhbDR1f40_qCwsKjLSnb7bPkI7Ctzhwk/0/1.jpg or
        // https://arweave.net/HhNPw5V8eTrLhbDR1f40_qCwsKjLSnb7bPkI7Ctzhwk/1/2.jpg etc.

        uint256 tokenId;
        string memory arweaveBase = 'https://arweave.net/HhNPw5V8eTrLhbDR1f40_qCwsKjLSnb7bPkI7Ctzhwk/';
        
        if(msg.value >= 0.001 ether && msg.value < 1 ether) {
            tokenId = _nft.safeMint(msg.sender, string(abi.encodePacked(arweaveBase,"0/",selectedNFT,".jpg")));
        } else if(msg.value >= 1 ether && msg.value < 10 ether) {
            tokenId = _nft.safeMint(msg.sender, string(abi.encodePacked(arweaveBase,"1/",selectedNFT,".jpg")));
        } else {
            tokenId = _nft.safeMint(msg.sender, string(abi.encodePacked(arweaveBase,"10/",selectedNFT,".jpg")));
        }

        _wallet.sendValue(msg.value);
        emit DonationReceived(msg.sender, msg.value, tokenId);
    }

}