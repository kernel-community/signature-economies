const levelup = require("levelup");
const leveldown = require("leveldown");
const { ethers } = require("ethers");
const path = require("path");
const { tokenIdContractCheck } = require("../utils");

const dbPath = path.join(__dirname, "tokens");

const tokens = levelup(leveldown(dbPath));

const getRandomTokenId = () => ethers.BigNumber.from(ethers.utils.randomBytes(32)).toString();

// returns true if token id found in db
const tokenIdDbCheck = async (id) => {
  let exists = false;
  try {
    exists = !!(await tokens.get(id));
  } catch(err) { /** ignore error here */ }
  return exists;
}

exports.getOrStoreRandomId = async (url) => {
  let exists, id;
  do {
    id = getRandomTokenId();
    exists = (await tokenIdDbCheck(id)) || (await tokenIdContractCheck(id));
  } while (exists);
  await tokens.put (id, url);
  return { id, url }
}
