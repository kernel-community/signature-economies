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
  if (!data || !contentType) return next(new Error ("Data or contentType missing"));

  let arUrl;
  try {
    urls = await upload({data, contentType});
  } catch(err) {
    return next(err);
  }

  // @todo remove
  console.log({ contentType, arUrl });
  res.send({ arUrl: urls.arUrl });
});

app.post('/sign', async (req,res) => {
  let signature, message, url;
  let id = "3";
  try {
    url = req.body.arUrl;
    message = ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(
          ['uint256', 'string'],
          [id, url],
        ),
    );
    const wallet = new ethers.Wallet(Secrets.signer.key);
    signature = await wallet.signMessage(ethers.utils.arrayify(message));
  } catch (err) {
    return next(err);
  }
  // @todo remove
  console.log({
    signature, id,
    url, message
  });

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
