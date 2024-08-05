// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC721Mintable {
    function mint(address to, uint256 tokenId) external;
}

contract MyMintableToken is IERC721Mintable, ERC721, Ownable {
    constructor(
        address initialOwner
    ) ERC721("MyMintableToken", "MMT") Ownable(initialOwner) {}

    function mint(address to, uint256 tokenId) public {
        _mint(to, tokenId);
    }
}
