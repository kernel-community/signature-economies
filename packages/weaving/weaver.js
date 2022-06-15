const express = require('express');
const cors = require('cors');

const { upload } = require('./utils');
const Constants = require("./constants");
const {save, check} = require("./db");

const port = Constants.port;

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
  const { data, contentType, tags } = req.body;
  if (!data || !contentType) return next(new Error ("Data or contentType missing"));
  if (!tags) tags = [];
  try {
    urls = await upload({ data, contentType, tags });
  } catch(err) {
    return next(err);
  }
  console.log({arUrl: urls.arUrl});
  res.send({ arUrl: urls.arUrl });
});

app.post('/save', async(req, res, next) => {
  const {signer, signature} = req.body;
  if (!signer || !signature) return next(new Error("signer or signature missing"));
  try {
    await save({key: signer, value: signature});
  } catch(err) {
    console.error(err);
    return next(err);
  }
  console.log({key: signer, value: signature});
  res.send({ok: true});
})

app.post('/check', async(req,res,next) => {
  const {signer} = req.body;
  if (!signer) return next(new Error("signer missing"));
  let found = false;
  try {
    found = await check({key: signer});
  } catch(err) {
    console.error(err);
    return next(err);
  }
  console.log({key: signer});
  res.send({ok: true, found});
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});
