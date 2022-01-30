
const hre = require("hardhat");

async function main() {

  var PROXY_REGISTRATION_ADDRESS = '0xa5409ec958c83c3f309868babaca7c86dcb077c1';
    const network = await hre.ethers.provider.getNetwork();
    console.log(`network: ${network.name}`);
    
    if (network.name === "rinkeby") {
      console.log('Using Opensea registration address for Rinkeby');
      PROXY_REGISTRATION_ADDRESS = '0xf57b2c51ded3a29e6891aba85459d600256cf317';
    }

  let [deployer, wallet] = await ethers.getSigners();
  wallet = wallet.address;

  console.log("Using wallet address:", wallet);
  const addresses = {};
  addresses['wallet'] = wallet;

  addresses['network'] = network.name;
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", 
    (await deployer.getBalance()/1e18).toString(), 
    network.name, "ETH");

  // First the NFT
  const SignatureNFT = await hre.ethers.getContractFactory("SignatureNFT");
  const signatureNFT = await SignatureNFT.deploy(PROXY_REGISTRATION_ADDRESS);
  await signatureNFT.deployed();
  console.log("Signature NFT deployed to:", signatureNFT.address);
  
  // Then the Fund
  const SignatureFund = await hre.ethers.getContractFactory("SignatureFund");
  const signatureFund = await SignatureFund.deploy(signatureNFT.address, wallet);
  await signatureFund.deployed();
  console.log("Signature fUND deployed to:", signatureFund.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
