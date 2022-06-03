const { ethers } = require("ethers");
const { tokenIdContractCheck } = require("../utils");

const getRandomTokenId = () => ethers.BigNumber.from(ethers.utils.randomBytes(32)).toString();

exports.getOrStoreRandomId = async (url) => {
  let exists, id;
  do {
    id = getRandomTokenId();
    exists = await tokenIdContractCheck(id);
  } while (exists);
  return { id, url }
}
