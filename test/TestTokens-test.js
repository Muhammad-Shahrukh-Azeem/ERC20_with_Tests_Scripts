const {expect, should} = require('chai');
const { ethers } = require('hardhat');
const { futimes } = require('fs');

describe("Writing Unit Tests For TestToken" , () => {
    let contract;
    let Contract;
    let addr0;
    let addr1;
    let addr2;

    beforeEach(async function () {
        Contract = await ethers.getContractFactory('TestToken');
        [addr0,addr1,addr2] = await ethers.getSigners();
        contract = await Contract.deploy();
        contract.mint(addr0.address,2000);
    });

    describe("Initial Functionality " , function () {
        it("Set total supply to address0", async function() {
            const ownerBalance = await contract.balanceOf(addr0.address);
            expect(await contract.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Checking Approve Function ", function () {
        it("Should allow others to transfer from address zero", async function() {
            await contract.approve(addr1.address, 150);
            await contract.connect(addr1).transferFrom(addr0.address, addr2.address,50);
            const addr2Balance = await contract.balanceOf(addr2.address);
            const addr1Balance = await contract.balanceOf(addr1.address);
            expect(addr2Balance).to.equal(50);
            expect(addr1Balance).to.equal(0);
        });

        it("should trigger approval event", async function () {
            await expect(contract.approve(addr1.address, 100)).to.emit(contract, 'Approval').withArgs(addr0.address,addr1.address,100);
        });
    });

    describe("Checking Transfer Function", function () {
        it("Should transfer from one account to another", async function() {
            await contract.transfer(addr1.address,200);
            const addr1Balance = await contract.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(200);
        });

        it("Should not allow to send more than in account", async function () {
            await expect(contract.transfer(addr1.address, 2001)).to.be.revertedWith("Number of tokens to be transferred surpass the ones in account");
        });

        it("Should emit the event", async function () {
            await expect(contract.transfer(addr1.address,200)).to.emit(contract, 'Transfer').withArgs(addr0.address, addr1.address, 200);
        });
    });

    describe("Checking tranferFrom function", function() {
        it("Shouldn't allow to send more than in acccount", async function() {
            await contract.transfer(addr1.address, 100);
            await expect(contract.connect(addr1).transferFrom(addr1.address, addr2.address, 101)).to.be.revertedWith("Number of tokens surpass the tokens in the account");
        });
        
        it("Should transfer from one to another and chec values at both ends", async function () {
            await contract.transfer(addr1.address, 100);
            const addr1InitialBalance = await contract.balanceOf(addr1.address);
            await contract.connect(addr1).transferFrom(addr1.address, addr2.address, 69);
            const addr2Balance = await contract.balanceOf(addr2.address);
            const addr1Balance = await contract.balanceOf(addr1.address);
            expect(addr2Balance).to.equal(69);
            expect(addr1Balance).to.equal(addr1InitialBalance.sub(69));
        });

        it("Should emit Transfer event", async function () {
            await expect(contract.transferFrom(addr0.address, addr1.address, 500)).to.emit(contract, 'Transfer').withArgs(addr0.address, addr1.address, 500);
        });

        it("Should check if someone else is allowed to transfer with them having sufficient funds", async function () {
            await contract.transfer(addr1.address, 1000);
            await contract.approve(addr1.address, 600);
            await contract.connect(addr1).transferFrom(addr0.address, addr2.address, 400);
            const addr2Balance = await contract.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(400);
        });

        it("Should check if someone else is allowed to transfer with them having insufficient funds", async function () {
            await contract.transfer(addr1.address, 1000);
            await contract.approve(addr1.address, 600);
            await expect(contract.connect(addr1).transferFrom(addr0.address, addr2.address, 900)).to.be.revertedWith("Number of tokens exceed the number allowed");
        });
    });
});