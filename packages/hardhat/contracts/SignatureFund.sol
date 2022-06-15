// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import { ERC721Tradable } from "./base/ERC721Tradable.sol";
import { IERC20 } from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import { SafeERC20 } from '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import { IWETH } from './interfaces/IWETH.sol';
import { Counters } from "@openzeppelin/contracts/utils/Counters.sol";

//           ,,_
//        zd$$??=
//      z$$P? F:`c,                _
//     d$$, `c'we&&i           ,=caRe
//    $$$$ sign,?888i       ,=P"2?us"
//     $" " ?$$$,?888.    ,-''`>, bee
//      $'joy,?$$,?888   ,h' "I$'J$e
//       ... `?$$$,"88,`$$h  88love'd$"
//     d$PP""?-,"?$$,?8h`$$,,88'$Q42"
//     ?,,_`=4c,?=,"?ye$s`?E2$'? '
//        `""?==""=-"" `""-`'_,,,,
//            .eco?qualiJC,-,"=?
//                      """=='?"

contract SignatureFund is ERC721Tradable {
    using SafeERC20 for IERC20;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    error NotAuthorized();

    // the permaweb url where all the metadata is stored
    string public arweaveBase = 'https://arweave.net/SuPXgNnLyr_X4FR-a9M3jTloVH9wZnN334g9ToxyNZU/';

    // An array of values used to determine what kind of image gets minted
    uint256[2] values = [1e18, 1e19];

    // A Kernel address for proper attribution
    address public creator;

    // The address of the WETH contract
    address public weth;

    event SignCreated(address indexed signer, uint256 amount, uint256 indexed tokenId, string uri, string selectMeta);

    modifier onlyCreator() {
        if (msg.sender != creator) {
            revert NotAuthorized();
        }
        _;
    }

    constructor(
        address _proxyRegistryAddress,
        address _creator,
        address _weth
    ) ERC721Tradable('Signature Fund', 'SING', _proxyRegistryAddress) {
        creator = _creator;
        weth = _weth;
    }

    /**
     * @notice Link to contract metadata
    */
    function contractURI() 
        external 
        pure 
        returns (string memory) 
    {
        return "https://arweave.net/JB096wImG3pVLPLQVe0tmgiJHUjrNSCtWdi-ojxTETg";
    }

    /** @notice          Set the royalties for the whole contract. Our intention is to set it to 10% in perpetuity.
     *  @param recipient the royalties recipient - will always be pr1s0nart, for regulatory reasons.
     *  @param value     royalties value (between 0 and 10000)
    */
    function setRoyalties(address recipient, uint256 value) 
        external
        onlyCreator
    {
        _setRoyalties(recipient, value);
    }

    /**
     * @dev               Receives donation and mints new NFT for donor
     * @param selectedNFT a string that allows us to determine which NFT at which level to mint and return to the donor
     */
    function createSign(string memory selectedNFT) 
        external 
        payable 
    {
        require(msg.value >= 0.01 ether, "SignatureFund: Minimum donation is 0.01 ETH");

        // Here, we let the reader select which of the 8 available NFTs they wish to mint.
        // Each of these is already stored in Arweave, with 3 different versions.
        // Depending on the value of the message which mints the selected NFT, we assign
        // the metadataURI used when minting the NFT. The url links to a json file with
        // all the relevant information, especially the mp4 video of the signature seals.
        
        string memory selectMeta;
        
        if(msg.value < values[0]) {
            selectMeta = string(abi.encodePacked("0/",selectedNFT));
        } else if(msg.value >= values[0] && msg.value < values[1]) {
            selectMeta = string(abi.encodePacked("1/",selectedNFT));
        } else {
            selectMeta = string(abi.encodePacked("10/",selectedNFT));
        }

        string memory uri = string(abi.encodePacked(arweaveBase,selectMeta,".json"));

        uint256 newTokenId = _tokenIdCounter.current();
        _safeMint(creator, msg.sender, newTokenId);
        _setTokenURI(newTokenId, uri);
        _tokenIdCounter.increment();
        emit SignCreated(msg.sender, msg.value, newTokenId, uri, selectMeta);

        _safeTransferETHWithFallback(msg.value);
    }

   /**
     * @notice       allows the creator to update the arweave base url to change images that get minted from this point onwards
     * @param newUrl a new arweave url which hosts new metadata to keep things lively
     */
    function setArweave(string memory newUrl) 
        external 
        onlyCreator
    {
        arweaveBase = newUrl;
    }

    /**
     * @notice          allows the creator to update the values which determine what kind of image gets minted
     * @param newValues a new arrray of values to go along with new metadata in case we wish to change the game and keep things infinite
     *                  "This idea of continued discourse, or play, can be found underneath everything we do at Kernel. 
     *                  We do not spurn rules or convention; we just contextualise them appropriately. Rules are not followed 
     *                  as a means of gaining control or power, and we do not care whose turn it is next. Rules exist in order 
     *                  to continue playing increasingly principled games with one another, always in the light of the common knowledge 
     *                  that any rule, any boundary, is just a convention, inviting ever more creative, dramatic kinds of play."
     */
    function setValues(uint256[2] memory newValues) 
        external 
        onlyCreator
    {
        values = newValues;
    }

    /**
     * @notice       Transfer ETH. If the ETH transfer fails, wrap the ETH and try send it as WETH.
     * @param amount the total amount
     */
    function _safeTransferETHWithFallback(uint256 amount) internal {
        if (!_safeTransferETH(amount)) {
            IWETH(weth).deposit{ value: amount }();
            IERC20(weth).safeTransfer(creator, amount);
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