const { expect } = require("chai");
const { ethers } = require("hardhat");

const PROXY_REGISTRATION_ADDRESS = "0xf57b2c51ded3a29e6891aba85459d600256cf317";

describe("SignatureNFT", function () {
  beforeEach(async function () {
    const SignatureNFT = await ethers.getContractFactory("SignatureNFT");
    const [deployer, alice, bob] = await ethers.getSigners();
    this.deployer = deployer;
    this.alice = alice;
    this.bob = bob;
    this.signatureNFT = await SignatureNFT.deploy(PROXY_REGISTRATION_ADDRESS);
  });

  describe("ERC721", function () {
    it("has correct name and symbol", async function () {
      expect(await this.signatureNFT.name()).to.equal("Signature Economies");
      expect(await this.signatureNFT.symbol()).to.equal("SIGN");
    });
    describe("minting", function () {
      it("anyone can mint", async function () {
        await this.signatureNFT.safeMint(this.deployer.address, "arweaveUrl");
        expect(await this.signatureNFT.balanceOf(this.deployer.address)).to.equal(1);
        await this.signatureNFT.safeMint(this.deployer.address, "arweaveUrl");
        expect(await this.signatureNFT.balanceOf(this.deployer.address)).to.equal(2);
        await this.signatureNFT.safeMint(this.alice.address, "arweaveUrl");
        expect(await this.signatureNFT.balanceOf(this.alice.address)).to.equal(1);
      });
      it("anyone can mint to anyone else", async function () {
        await this.signatureNFT.connect(this.alice).safeMint(this.deployer.address, "arweaveUrl");
        expect(await this.signatureNFT.balanceOf(this.deployer.address)).to.equal(1);
        await this.signatureNFT.connect(this.deployer).safeMint(this.alice.address, "arweaveUrl");
        expect(await this.signatureNFT.balanceOf(this.alice.address)).to.equal(1);
        await this.signatureNFT.connect(this.alice).safeMint(this.bob.address, "arweaveUrl");
        expect(await this.signatureNFT.balanceOf(this.bob.address)).to.equal(1);
      });
      it("the uri associated with the NFT should be what we pass in", async function () {
        await this.signatureNFT.safeMint(this.deployer.address, "test1");
        expect (await this.signatureNFT.tokenURI(0)).to.equal("test1");
        await this.signatureNFT.connect(this.alice).safeMint(this.bob.address, "xhdiwyannfof86mdjeifh");
        expect (await this.signatureNFT.tokenURI(1)).to.equal("xhdiwyannfof86mdjeifh");
      })
    });
    describe("burning", function () {
      it("should let signers burn their own NFTs", async function () {
        await this.signatureNFT.safeMint(this.deployer.address, "arweaveUrl");
        await this.signatureNFT.connect(this.deployer).burn(0);
        expect(await this.signatureNFT.balanceOf(this.deployer.address)).to.equal(0);
      })
      it("should not let anyone other than signer burn an NFT", async function () {
        await this.signatureNFT.safeMint(this.deployer.address, "arweaveUrl");
        await expect(this.signatureNFT.connect(this.alice).burn(0))
          .to.be.revertedWith("function call to a non-contract account");
      })
    })
    
  });

});
