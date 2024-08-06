// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ErrorHandleProblem {
    string public errorMessage;

    function throwError() public {
        // 여기에 에러를 내는 함수가 작성되어 있습니다.
    }

    function setErrorMessage(string memory _errorMessage) public {
        errorMessage = _errorMessage;
    }
}

contract Attack {
    constructor() {
        ErrorHandleProblem target = ErrorHandleProblem(
            0xCce729737436620bF9F22a0038B4F96b27624593
        );
        try target.throwError() {} catch (bytes memory _errorMessage) {
            bytes memory slicedData = new bytes(_errorMessage.length);
            for (uint i = 0; i < _errorMessage.length - 4; i++) {
                slicedData[i] = _errorMessage[4 + i];
            }
            string memory result = abi.decode(slicedData, (string));
            target.setErrorMessage(result);
        }
    }
}
