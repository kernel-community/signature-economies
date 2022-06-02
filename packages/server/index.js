const express = require('express');
const cors = require('cors');
const { ethers } = require("ethers");

const { upload } = require('./utils');
const Config = require("./config.json");
const Secrets = require("./secrets.json");

const { getOrStoreRandomId } = require("./db");

const port = Config.server.port;

const app = express()

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send('API: Signature Economies')
})

app.listen(port, () => {
  console.log(`API: Signature Economies listening on port ${port}`)
})

app.post('/upload', async (req, res, next) => {
  const { data, contentType } = req.body;

  if (!data || !contentType) return next(new Error ("Data or contentType missing"));

  try {
    urls = await upload({data, contentType});
  } catch(err) {
    return next(err);
  }

  console.debug({arUrl: urls.arUrl});
  res.send({ arUrl: urls.arUrl });
});

app.post('/sign', async (req, res, next) => {
  let signature, message;
  const url = req.body.arUrl; // metadata url
  const { id } = await getOrStoreRandomId(url);
  try {
    message = ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(
          ['uint256', 'string'],
          [id, url], // token id, metadata url
        ),
    );
    const wallet = new ethers.Wallet(Secrets.signer.key);
    signature = await wallet.signMessage(ethers.utils.arrayify(message));
  } catch (err) {
    return next(err);
  }
  console.debug({signature,message,id: id.toString(),url});
  res.send({
    signature,
    message,
    id,
    url
  });
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});
