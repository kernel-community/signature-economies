/**
 * Copyright (c) Kernel
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict'

import crypto from 'crypto'
import fetch from 'node-fetch'

const VERSION = '2.0'

const uuid = () => crypto.randomUUID()

const build = async ({ rpcEndpoint, jwtFn }) => {

  //console.log(jwtFn)

  const jsonRpc = ({ version = VERSION, id = uuid(), method, params }) => {
    return { jsonrpc: version, id, method, params }
  }

  const method = (service, name) => `${service}.${name}` 

  const request = async (url, data) => {
    const jwt = await jwtFn.call()
    let opts = {
      method: 'POST',
      //TODO: add authentication
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify(data)
    }
    console.log(opts)
    return fetch(url, opts)
      .then((e) => e.ok ?
        e.json() : { error: { code: e.status, message: e.statusText } })
  }

  const call = async ({ method, params }) => {
    const data = jsonRpc({ method, params }) 
    const { result, error } = await request(rpcEndpoint, data)
    if (error) {
      throw new Error(`${error.message} ${error.code}`)
    }
    return result
  }

  return { method, call }
}

const rpc = { build }

export default rpc
