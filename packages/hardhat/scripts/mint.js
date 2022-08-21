/* eslint no-use-before-define: "warn" */
const fs = require("fs");
const chalk = require("chalk");
const { config, ethers } = require("hardhat");
const { utils } = require("ethers");
const R = require("ramda");
const ipfsAPI = require("ipfs-http-client");


/*
const ipfs = ipfsAPI({
  host: "ipfs.nifty.ink",
  port: "3001",
  protocol: "https",
});
*/

const ipfs = ipfsAPI({
  host: "gateway.ipfs.io",
  port: "5001",
  protocol: "https",
});

const delayMS = 1000; // sometimes xDAI needs a 6000ms break lol 😅

const main = async () => {
  // ADDRESS TO MINT TO:
  const toAddress = "0xB6DeaaaC6a6237690DF52E0Fa8C7734a9c8514E8";

  console.log("\n\n 🎫 Minting to " + toAddress + "...\n");

  const { deployer } = await getNamedAccounts();
  const yourCollectible = await ethers.getContract("YourCollectible", deployer);

  

  console.log("Uploading buffalo...");
  

  //console.log("Minting buffalo with IPFS hash (" + uploaded.path + ")");
  await yourCollectible.mintItem(toAddress, "https://exos.origyn.network/-/ethmex/-/bm-0/info", {
    gasLimit: 400000,
  });

  await sleep(delayMS);

  
  console.log("Uploading zebra...");
  
  await yourCollectible.mintItem(toAddress, "https://exos.origyn.network/-/ethmex/-/bm-1/info", {
    gasLimit: 400000,
  });

  await sleep(delayMS);

  
  console.log("Uploading rhino...");
  
  await yourCollectible.mintItem(toAddress, "https://exos.origyn.network/-/ethmex/-/bm-2/info", {
    gasLimit: 400000,
  });

  await sleep(delayMS);

  
  console.log("Uploading fish...");
  
  await yourCollectible.mintItem(toAddress, "https://exos.origyn.network/-/ethmex/-/bm-3/info", {
    gasLimit: 400000,
  });

  await sleep(delayMS);

  console.log(
    "Transferring Ownership of YourCollectible to " + toAddress + "..."
  );

  await yourCollectible.transferOwnership(toAddress, { gasLimit: 400000 });

  await sleep(delayMS);

  /*


  console.log("Minting zebra...")
  await yourCollectible.mintItem("0xD75b0609ed51307E13bae0F9394b5f63A7f8b6A1","zebra.jpg")

  */

  // const secondContract = await deploy("SecondContract")

  // const exampleToken = await deploy("ExampleToken")
  // const examplePriceOracle = await deploy("ExamplePriceOracle")
  // const smartContractWallet = await deploy("SmartContractWallet",[exampleToken.address,examplePriceOracle.address])

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
