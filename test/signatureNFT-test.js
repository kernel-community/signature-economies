const { expect } = require("chai");
const { ethers } = require("hardhat");

const PROXY_REGISTRATION_ADDRESS = "0xf57b2c51ded3a29e6891aba85459d600256cf317";
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

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

    describe('royalties', function() {
      const salePrice = ethers.BigNumber.from(100);
      const royalty = ethers.BigNumber.from(1000); // 10% with the two decimals places the contract is expecting
      const excessRoyalty = ethers.BigNumber.from(10001); // 100.01%
      const newRoyalty = ethers.BigNumber.from(500); // 5% with the two decimals places the contract is expecting
  
      it('has no royalties if not set', async function () {
        this.signatureNFT.mintSelected("arweaveUrl");
  
          const info = await this.signatureNFT.royaltyInfo(0, salePrice);
          expect(info[1].toNumber()).to.be.equal(0);
          expect(info[0]).to.be.equal(ZERO_ADDRESS);
      });
  
      it('throws if royalties more than 100%', async function () {
          const tx = this.signatureNFT.connect(this.creator).setRoyalties(
              this.alice.address,
              excessRoyalty,
          );
          await expect(tx).to.be.revertedWith('ERC2981Royalties: Too high');
      });
  
      it('has the right royalties for tokenId', async function () {
          await this.signatureNFT.connect(this.creator).setRoyalties(
              this.creator.address,
              royalty,
          );
  
          await this.signatureNFT.connect(this.deployer).mintSelected("arweaveUrl");
  
          const info = await this.signatureNFT.royaltyInfo(1, salePrice);
          // We expect the royaltAmount to come back as the salePrice * royalty / 10000
          expect(info[1].toNumber()).to.be.equal(10);
          expect(info[0]).to.be.equal(this.creator.address);
      });
  
      it('throws if someone other than the owner tries to set royalties', async function() {
        const tx = this.signatureNFT.connect(this.alice).setRoyalties(
            this.alice.address,
            royalty,
        );
        await expect(tx).to.be.revertedWith('Only the creator of this contract can set and change royalites');
      })
  
      it('can set address(0) as royalties recipient', async function () {
          await this.signatureNFT.connect(this.creator).setRoyalties(ZERO_ADDRESS, newRoyalty);
  
          await this.signatureNFT.connect(this.creator).mintSelected("arweaveUrl");
  
          const info = await this.signatureNFT.royaltyInfo(2, salePrice);
          expect(info[1].toNumber()).to.be.equal(5);
          expect(info[0]).to.be.equal(ZERO_ADDRESS);
      });
    })
    
  });

});
