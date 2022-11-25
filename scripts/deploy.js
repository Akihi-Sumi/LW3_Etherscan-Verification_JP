const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  /*
   * ethers.jsのContractFactoryは、新しいスマートコントラクトをデプロイするために使われる抽象化されたものです。
   * つまり、verifyContractはVerifyコントラクトのインスタンスを生成するためのファクトリです。
   */
  const verifyContract = await ethers.getContractFactory("Verify");

  // コントラクトをデプロイ
  const deployedVerifyContract = await verifyContract.deploy();

  await deployedVerifyContract.deployed();

  // デプロイされたコントラクトのアドレスを表示する
  console.log("Verify Contract Address:", deployedVerifyContract.address);

  console.log("Sleeping.....");
  // コントラクトがデプロイされたことをetherscanが通知するのを待ちます。
  await sleep(40000);

  // デプロイ後のコントラクトを検証する
  await hre.run("verify:verify", {
    address: deployedVerifyContract.address,
    constructorArguments: [],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// main関数を呼び出して、エラーがあればキャッチする。
main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});