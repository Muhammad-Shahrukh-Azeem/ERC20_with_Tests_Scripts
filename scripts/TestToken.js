// addresOfContract = 0x5FbDB2315678afecb367f032d93F642f64180aa3
const hre = require("hardhat");
// const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");
const ethers = hre.ethers;

async function main(){

    const accounts = await hre.ethers.getSigners();
    const owner = '0x743c9E764b788C8e21fF70108Ee1C34a5d713E60';
    const testAccount2 = '0x2D751a936E6f59CaF65097E2a8E737ccf9eA25de';
    const TestToken = await hre.ethers.getContractFactory("TestToken");
    // const contract = await TestToken.deploy();
    // await contract.deployed();
    // console.log("Contract deployed to : ",contract.address);

    //Use npx hardhat node to run the blockchain in a flow.

    const contractAddress = '0xc7BEbD5558A41c95b1e9F7ff6D81d54D5dE26E1a';
    const contract = new ethers.Contract(contractAddress, TestToken.interface, accounts[0]);
    const supply = await contract.totalSupply();
    console.log("Total Supply is : ", supply.toString());
    
    const Mint = await contract.mint(owner, ethers.utils.parseUnits("5000", "ether"));
    Mint.wait();
    // console.log(accounts[2]);

    const supply1 = await contract.totalSupply();
    console.log("New supply after mint is ", supply1.toString());
    // const firstTransfer = await contract.transferFrom(owner, testAccount2, ethers.utils.parseUnits("100", "ether") ,{
    //     maxFeePerGas : ethers.utils.parseUnits("100","gwei"),
    //     maxPriorityFeePerGas : ethers.utils.parseUnits("10","gwei")    
    // });

    // const balance_of_account2 = await contract.balanceOf(testAccount2); 
    // console.log("New balance of annount 2 is ", balance_of_account2.toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});