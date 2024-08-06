const { ethers } = require('hardhat');
const fs = require('fs');

async function main() {
    const abi = JSON.parse(fs.readFileSync('./permit.json', 'utf8'));
    const provider = new ethers.JsonRpcProvider($SEPOLIA_RPC_URL);
}
