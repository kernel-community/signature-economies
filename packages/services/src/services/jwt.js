/**
 * Copyright (c) Kernel
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict'

import crypto from 'crypto'
import { ethers } from 'ethers'

const production = () => process.env.NODE_ENV === 'production'

// 20min
const TOKEN_TTL = production() ? 20 * 60 * 1000 : 60 * 60 * 1000
const AUD = 'kernel.community'
const HEADER = { alg: 'ES256K', typ: 'JWT' }
const DOMAIN = {
  name: 'Kernel',
  version: '1'
}
const CLIENT_JWT = {
  JWT: [
    { name: 'iss', type: 'address' },
    { name: 'aud', type: 'string' },
    { name: 'iat', type: 'uint256' },
    { name: 'exp', type: 'uint256' },
    { name: 'nickname', type: 'string' }
  ]
}
const AUTH_JWT = {
  JWT: [
    { name: 'iss', type: 'string' },
    { name: 'aud', type: 'string' },
    { name: 'iat', type: 'uint256' },
    { name: 'exp', type: 'uint256' },
    { name: 'nickname', type: 'string' },
    { name: 'role', type: 'uint256' }
  ]
}
const JWK = {
  JWT: [
    { name: 'kty', type: 'string' },
    { name: 'crv', type: 'string' },
    { name: 'iss', type: 'address' }
  ]
}

const SignatureError = () => {}

const now = () => Date.now()
const tokenExp = (ttl = TOKEN_TTL) => now() + ttl
const randomSeed = (length = 32) => crypto.randomBytes(length)

const toBuffer = (hexData) => Buffer.from(ethers.utils.arrayify(hexData))
const toBase64Url = (buf) => buf.toString('base64url')
const fromBase64Url = (s) => Buffer.from(s, 'base64url')

const jwtify = (obj) => toBase64Url(Buffer.from(JSON.stringify(obj)))
const encode = ({ header = HEADER, payload, signature }) =>
  `${jwtify({ header })}.${jwtify({ payload })}.${toBase64Url(toBuffer(signature))}`
const decode = (jwt) => {
  const parts = jwt.split('.')
    .map((e) => fromBase64Url(e))
  console.log(parts
    .slice(0, 2)
    .map((e) => e.toString())
  )
  const obj = parts
    .slice(0, 2)
    .map((e) => JSON.parse(e.toString()))
    .reduce((acc, e) => {
      acc[Object.keys(e)[0]] = Object.values(e)[0];
      return acc;
    }, {})
  console.log(obj)
  return Object.assign(obj, { signature: parts[2] }) 
}

const defaultProvider = () => new ethers.providers.CloudflareProvider()
const walletFromSeed = (seed, provider) =>
  ethers.Wallet.fromMnemonic(ethers.utils.entropyToMnemonic(seed))

const verify = (type, payload, address, signature) =>
  ethers.utils.verifyTypedData(DOMAIN, type, payload, signature) == address 

const sign = (type, payload) => wallet._signTypedData(domain, type, payload)

const createJwt = (wallet, type, payload) =>
  wallet._signTypedData(DOMAIN, type, payload)
    .then((signature) => encode({ payload, signature }) )

const authPayload = ({ iss, aud = AUD, iat = now(),
  exp = tokenExp(), nickname, role }) => {
    return { iss, aud, iat, exp, nickname, role }
}

const clientPayload = ({ iss, aud = AUD, iat = now(),
  exp = tokenExp(), nickname }) => {
    return { iss, aud, iat, exp, nickname }
}

const jwt = {
  HEADER, DOMAIN, CLIENT_JWT, AUTH_JWT, JWK,
  SignatureError,
  randomSeed, defaultProvider, walletFromSeed,
  toBuffer, toBase64Url, fromBase64Url, jwtify, encode, decode,
  verify, sign, createJwt, authPayload, clientPayload
}

export default jwt
