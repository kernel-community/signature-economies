const levelup = require("levelup");
const leveldown = require("leveldown");
const { ethers } = require("ethers");
const path = require("path");

const dbPath = path.join(__dirname, "tokens");

const tokens = levelup(leveldown(dbPath));

const getRandomTokenId = () => ethers.BigNumber.from(ethers.utils.randomBytes(32)).toString();

const tokenIdCheck = async (id) => {
  let exists = false;
  try {
    exists = !!(await tokens.get(id));
  } catch(err) { }
  return exists;
}

exports.getOrStoreRandomId = async (url) => {
  let exists, id;
  do {
    id = getRandomTokenId();
    try {
      // check local db
      exists = await tokens.get(id);
    } catch (err) {
      // error or not found
      if (err.notFound) {
        // not found in local db
        // check on contract

        // @todo check on contract here
        // store in db if exists on contract
        // return exists = true
        // else --> return false
        exists = false;
      }
      else {
        throw err;
      }
    }
  } while (exists);
  await tokens.put (id, url);
  return { id, url }
}
