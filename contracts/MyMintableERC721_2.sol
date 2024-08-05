// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC721Mintable2 {
    function mint(address to) external;
}

contract MyMintableToken is IERC721Mintable2, ERC721, Ownable {
    uint256 tokenId = 0;
    constructor(
        address initialOwner
    ) ERC721("MyMintableToken", "MMT") Ownable(initialOwner) {}

    function mint(address to) public override {
        _mint(to, tokenId);
        tokenId++;
    }
}
