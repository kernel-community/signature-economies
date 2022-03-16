// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (token/ERC721/extensions/ERC721Burnable.sol)

/// @title ERC721 Burnable Extension

// LICENSE
// ERC721.sol modifies OpenZeppelin's ERC721Burnable.sol:
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/6618f9f18424ade44116d0221719f4c93be6a078/contracts/token/ERC721/extensions/ERC721Burnable.sol
//
// ERC721Burnable.sol source code copyright OpenZeppelin licensed under the MIT License.
//
// MODIFICATIONS:
// Consumes modified `ERC721` contract. See notes in `ERC721.sol`.

pragma solidity ^0.8.11;

import "./ERC721.sol";
import "@openzeppelin/contracts/utils/Context.sol";

/**
 * @title ERC721 Burnable Token
 * @dev ERC721 Token that can be irreversibly burned (destroyed).
 */
abstract contract ERC721Burnable is Context, ERC721 {
    /**
     * @dev Burns `tokenId`. See {ERC721-_burn}.
     *
     * Requirements:
     *
     * - The caller must own `tokenId` or be an approved operator.
     */
    function burn(uint256 tokenId) public virtual {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721Burnable: caller is not owner nor approved");
        _burn(tokenId);
    }
}
