const { ethers } = require('hardhat');
const fs = require('fs');

async function main() {
  const abi = JSON.parse(fs.readFileSync('./permit.json', 'utf8'));
  const provider = new ethers.JsonRpcProvider($SEPOLIA_RPC_URL);

  const owner = new ethers.Wallet($PRIVATE_KEY);

  const spender = '';
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

  const target = new ethers.Contract('', abi, provider);

  const domain = {
    name: await target.name(),
    version: '1',
    chainId: 11155111,
    verifyingContract: '',
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
