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
        await this.signatureNFT.mintSelected(0, 63);
        // yes, I should base64 encode, but I have checked that it renders as expected in the browser 
        expect (await this.signatureNFT.tokenURI(0)).to.equal("data:application/json;base64,eyJuYW1lIjoiU2lnbmF0dXJlIE5GVCAjMCIsImRlc2NyaXB0aW9uIjoiQSB1bmlxdWUgc2lnbiBvZiBvdXIgdGltZXMsIHNlbGVjdGVkIHRvIHJlcHJlc2VudCBpbmNyZWFzaW5nbHkgc2lnbmlmaWNhbnQgbW9uZXkgaW4gdGhpcyBpbmZpbml0ZSBnYW1lIHdlIGFyZSBwbGF5aW5nIHRvZ2V0aGVyLiBBcyB5b3UgY29uc2lkZXIgdGhlc2UgdW5pcXVlIHN5bWJvbHMsIHJlbWVtYmVyIHRoYXQgd2VhbHRoIHRydWx5IG1lYW5zIGhhdmluZyBlbm91Z2ggdG8gc2hhcmUuIiwiZXh0ZXJuYWxfdXJsIjoiaHR0cHM6Ly9zaWduLmtlcm5lbC5jb21tdW5pdHkvIiwiYW5pbWF0aW9uX3VybCI6Imh0dHBzOi8vaXBmcy5pby9pcGZzL1FtV1p6QWc1MlhrNXl4QWpzTDU4WDRIWkRHS0RXbzY3cnFyRHpBckxtNjRMU0EvPzA/NjMifQ==");
      })
      it("should revert if passed invalid indices", async function () {
        const tx2 = this.signatureNFT.mintSelected(ethers.BigNumber.from(12400), ethers.BigNumber.from(12464));
        await expect(tx2).to.be.revertedWith("Invalid index");

        const tx3 = this.signatureNFT.mintSelected(ethers.BigNumber.from(140), ethers.BigNumber.from(120));
        await expect(tx3).to.be.revertedWith("Invalid index");

        const tx4 = this.signatureNFT.mintSelected(ethers.BigNumber.from(0), ethers.BigNumber.from(506));
        await expect(tx4).to.be.revertedWith("Invalid index");
      })
    });

    describe('royalties', function() {
      const salePrice = ethers.BigNumber.from(100);
      const royalty = ethers.BigNumber.from(1000); // 10% with the two decimals places the contract is expecting
      const excessRoyalty = ethers.BigNumber.from(10001); // 100.01%
      const newRoyalty = ethers.BigNumber.from(500); // 5% with the two decimals places the contract is expecting

      it('has no royalties if not set', async function () {
        await this.signatureNFT.mintSelected(0, 63);
        expect (await this.signatureNFT.tokenURI(0)).to.equal("data:application/json;base64,eyJuYW1lIjoiU2lnbmF0dXJlIE5GVCAjMCIsImRlc2NyaXB0aW9uIjoiQSB1bmlxdWUgc2lnbiBvZiBvdXIgdGltZXMsIHNlbGVjdGVkIHRvIHJlcHJlc2VudCBpbmNyZWFzaW5nbHkgc2lnbmlmaWNhbnQgbW9uZXkgaW4gdGhpcyBpbmZpbml0ZSBnYW1lIHdlIGFyZSBwbGF5aW5nIHRvZ2V0aGVyLiBBcyB5b3UgY29uc2lkZXIgdGhlc2UgdW5pcXVlIHN5bWJvbHMsIHJlbWVtYmVyIHRoYXQgd2VhbHRoIHRydWx5IG1lYW5zIGhhdmluZyBlbm91Z2ggdG8gc2hhcmUuIiwiZXh0ZXJuYWxfdXJsIjoiaHR0cHM6Ly9zaWduLmtlcm5lbC5jb21tdW5pdHkvIiwiYW5pbWF0aW9uX3VybCI6Imh0dHBzOi8vaXBmcy5pby9pcGZzL1FtV1p6QWc1MlhrNXl4QWpzTDU4WDRIWkRHS0RXbzY3cnFyRHpBckxtNjRMU0EvPzA/NjMifQ==");

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

        await this.signatureNFT.connect(this.deployer).mintSelected(0, 63);

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
        await expect(tx).to.be.revertedWith('NotAuthorized()');
      })

      it('can set address(0) as royalties recipient', async function () {
        await this.signatureNFT.connect(this.creator).setRoyalties(ZERO_ADDRESS, newRoyalty);
        await this.signatureNFT.connect(this.creator).mintSelected(0, 63);

        const info = await this.signatureNFT.royaltyInfo(2, salePrice);
        expect(info[1].toNumber()).to.be.equal(5);
        expect(info[0]).to.be.equal(ZERO_ADDRESS);
      });
    })
  });
});
