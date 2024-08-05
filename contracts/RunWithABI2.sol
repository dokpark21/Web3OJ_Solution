// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyRunWithABI2 {
    bytes32 private privateKey;

    constructor(address target) {
        (bool success, ) = target.call(abi.encodeWithSelector(0xa6e5ca07));
        require(success, "Failed init");
    }

    function setPrivateKey(address problemAddress) public {
        (bool success, ) = problemAddress.delegatecall(
            abi.encodeWithSelector(0xa6e5ca07)
        );
        require(success, "Failed setPrivateKey");
    }

    // 채점을 위한 함수 입니다.
    function getPrivateKey() public view returns (bytes32) {
        return privateKey;
    }
}
