const { expect } = require("chai");
const { ethers } = require("hardhat");

const PROXY_REGISTRATION_ADDRESS = "0xf57b2c51ded3a29e6891aba85459d600256cf317";

describe("SignatureNFT", function () {
  beforeEach(async function () {
    const SignatureNFT = await ethers.getContractFactory("SignatureNFT");
    const [deployer, creator, alice] = await ethers.getSigners();
    this.deployer = deployer;
    this.alice = alice;
    this.creator = creator;
    this.signatureNFT = await SignatureNFT.deploy(PROXY_REGISTRATION_ADDRESS, this.creator.address);
  });

  describe("Sign", function () {
    it("has correct name and symbol", async function () {
      expect(await this.signatureNFT.name()).to.equal("Signature Economies");
      expect(await this.signatureNFT.symbol()).to.equal("SIGN");
    });
    describe("minting", function () {
      it("the uri associated with the NFT should be what anyone passes in", async function () {
        await this.signatureNFT.mintSelected("test1");
        expect (await this.signatureNFT.tokenURI(0)).to.equal("test1");
        await this.signatureNFT.connect(this.alice).mintSelected("xhdiwyannfof86mdjeifh");
        expect (await this.signatureNFT.tokenURI(1)).to.equal("xhdiwyannfof86mdjeifh");
      })
    });
    describe("burning", function () {
      it("should let signers burn their own NFTs", async function () {
        await this.signatureNFT.mintSelected("arweaveUrl");
        expect(await this.signatureNFT.balanceOf(this.deployer.address)).to.equal(1);
        await this.signatureNFT.connect(this.deployer).burn(0);
        expect(await this.signatureNFT.balanceOf(this.deployer.address)).to.equal(0);
      })
      it("should not let anyone other than signer burn an NFT", async function () {
        await this.signatureNFT.mintSelected("arweaveUrl");
        await expect(this.signatureNFT.connect(this.alice).burn(0))
          .to.be.revertedWith("function returned an unexpected amount of data");
        expect(await this.signatureNFT.balanceOf(this.deployer.address)).to.equal(1);
      })
    })
    
  });

});
