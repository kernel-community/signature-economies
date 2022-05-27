const express = require('express');
const cors = require('cors');
const { ethers } = require("ethers");

const { upload } = require('./utils');
const Config = require("./config.json");
const Secrets = require("./secrets.json");

const port = Config.server.port;

const app = express()

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/upload', async (req, res) => {
  const { data, contentType } = req.body;
  if (!data || !contentType) throw new Error ("Data or contentType missing");
  const { arUrl } = await upload({data, contentType});

  // @todo remove
  console.log({ contentType, arUrl });
  res.send({ arUrl });
});

app.post('/sign', async (req,res) => {
  const { arUrl: url } = req.body;
  const tokenId = "2";
  const message = ethers.utils.keccak256(
		ethers.utils.defaultAbiCoder.encode(
        ['uint256', 'string'],
        [tokenId, url],
			),
	);
  const wallet = new ethers.Wallet(Secrets.signer.key);
  const signature = await wallet.signMessage(ethers.utils.arrayify(message));

  // @todo remove
  console.log({
    signature, id: tokenId,
    url, message
  });

  res.send({
    signature,
    message,
    id: tokenId,
    url
  });
})
