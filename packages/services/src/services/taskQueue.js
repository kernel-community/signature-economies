/**
 * Copyright (c) Kernel
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict'

import { ethers } from 'ethers'
import arweave from 'arweave'

const now = () => Date.now()

const ARWEAVE_APP_NAME = process.env.ARWEAVE_APP_NAME

const gateway = {
  host: 'arweave.net',
  port: 443,
  protocol: 'https'
}
const tags = [
  {
    key: 'Content-Type',
    value: 'application/json'
  },
  {
    key: 'App-Name',
    value: ARWEAVE_APP_NAME
  }
]

const build = async ({ projectId, arweaveJwk }) => {

  const client = arweave.init(gateway)
  //const key = await client.wallets.generate()
  const key = arweaveJwk

  const sign = async ({ signature, account }) => {
    console.log('signing', signature, account)
    const data = JSON.stringify({ signature, account })
    const transaction = await client.createTransaction({ data }, key)
    tags.forEach((tag) => transaction.addTag(tag.key, tag.value))
    await client.transactions.sign(transaction, key)
    const uploader = await client.transactions.getUploader(transaction)
    while (!uploader.isComplete) {
      await uploader.uploadChunk();
      console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
    }
    return { transaction }
  }

  return { sign }
}

const taskQueue = { build }

export default taskQueue
