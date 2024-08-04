const { ethers } = require('hardhat');
const fs = require('fs');

async function main() {
  const abi = JSON.parse(fs.readFileSync('./permit.json', 'utf8'));
  const provider = new ethers.JsonRpcProvider(
    'https://sepolia.infura.io/v3/0b46c4c524a64a49be35860955179665'
  );

  const owner = new ethers.Wallet(
    '0x42e9ca475919b57f8690ddb160b362afa567a2db255bd7bd9da569756cbd5cb8'
  );

  const spender = '0x039a70656755Cf641A33BcBd1EF1f0a976D1DcAD';
  const value = ethers.parseEther('20');
  const deadline = Math.floor(Date.now() / 1000) + 60 * 60; // 1시간 후
  console.log(`deadline: ${deadline}`);

  const types = {
    Permit: [
      {
        name: 'owner',
        type: 'address',
      },
      {
        name: 'spender',
        type: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
      },
      {
        name: 'nonce',
        type: 'uint256',
      },
      {
        name: 'deadline',
        type: 'uint256',
      },
    ],
  };

  const target = new ethers.Contract(
    '0x039a70656755Cf641A33BcBd1EF1f0a976D1DcAD',
    abi,
    provider
  );

  const domain = {
    name: await target.name(),
    version: '1',
    chainId: 11155111,
    verifyingContract: '0x039a70656755Cf641A33BcBd1EF1f0a976D1DcAD',
  };

  const nonce = await target.nonces(owner.address);

  const valueToSign = {
    owner: owner.address,
    spender: spender,
    value: value,
    nonce: nonce,
    deadline: deadline,
  };

  const signature = await owner.signTypedData(domain, types, valueToSign);
  const sig = signature.slice(2);

  // r, s, v 값 추출
  const r = '0x' + sig.slice(0, 64);
  const s = '0x' + sig.slice(64, 128);
  let v = '0x' + sig.slice(128, 130);

  // v 값은 27 또는 28이어야 합니다. 만약 그렇지 않다면 27을 더해줘야 합니다.
  v = parseInt(v, 16);
  if (v < 27) {
    v += 27;
  }

  console.log(`v: ${v}`);
  console.log(`r: ${r}`);
  console.log(`s: ${s}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
