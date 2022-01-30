const { expect } = require("chai");
const { ethers } = require("hardhat");

const PROXY_REGISTRATION_ADDRESS = "0xf57b2c51ded3a29e6891aba85459d600256cf317";

describe("SignatureFund", function () {
    beforeEach(async function () {
        const SignatureNFT = await ethers.getContractFactory("SignatureNFT");
        const SignatureFund = await ethers.getContractFactory("SignatureFund");
        const [deployer, wallet, alice] = await ethers.getSigners();
        this.deployer = deployer;
        this.wallet = wallet;
        this.alice = alice;
        this.signatureNFT = await SignatureNFT.deploy(PROXY_REGISTRATION_ADDRESS);
        this.signatureFund = await SignatureFund.deploy(this.signatureNFT.address, this.wallet.address);
      });

    describe("Fund", function () {
        it("has correct NFT address", async function () {
            expect(await this.signatureFund.getSignatureNFT()).to.equal(this.signatureNFT.address);
        });
        it("should accept donations and allocate correct metadata URIs based on amounts", async function () {
           await expect(this.signatureFund.connect(this.alice).receiveDonation("one", { value: ethers.utils.parseEther("0.5") }))
            .to.emit(this.signatureFund, 'DonationReceived')
            .withArgs(this.alice.address, ethers.utils.parseEther("0.5"), 0);
           // A critical learning from this test: only use _strings_, do not pass in numbers
           expect (await this.signatureNFT.tokenURI(0)).to.equal("https://dyju7q4vpr4tvs4fwdi5l7ru72qlbmfiznfhn63m7eeoyk3tq4eq.arweave.net/HhNPw5V8eTrLhbDR1f40_qCwsKjLSnb7bPkI7Ctzhwk/0/one.jpg");

           await expect(this.signatureFund.connect(this.alice).receiveDonation("one", { value: ethers.utils.parseEther("1.5") }))
            .to.emit(this.signatureFund, 'DonationReceived')
            .withArgs(this.alice.address, ethers.utils.parseEther("1.5"), 1);
           // A critical learning from this test: only use _strings_, do not pass in numbers
           expect (await this.signatureNFT.tokenURI(1)).to.equal("https://dyju7q4vpr4tvs4fwdi5l7ru72qlbmfiznfhn63m7eeoyk3tq4eq.arweave.net/HhNPw5V8eTrLhbDR1f40_qCwsKjLSnb7bPkI7Ctzhwk/1/one.jpg");

           await expect(this.signatureFund.connect(this.alice).receiveDonation("one", { value: ethers.utils.parseEther("15") }))
            .to.emit(this.signatureFund, 'DonationReceived')
            .withArgs(this.alice.address, ethers.utils.parseEther("15"), 2);
           // A critical learning from this test: only use _strings_, do not pass in numbers
           expect (await this.signatureNFT.tokenURI(2)).to.equal("https://dyju7q4vpr4tvs4fwdi5l7ru72qlbmfiznfhn63m7eeoyk3tq4eq.arweave.net/HhNPw5V8eTrLhbDR1f40_qCwsKjLSnb7bPkI7Ctzhwk/10/one.jpg");
        })
    })
});