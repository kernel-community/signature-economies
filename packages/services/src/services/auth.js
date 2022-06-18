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
import jwtService from './jwt.js'

import entityBuilder from './entity.js'
import rpcClientBuilder from './rpcClient.js'

const KERNEL_AUD = 'kernel.community'

const API_ROLE = 50
const API_NICKNAME = 'apiServer'
const NEW_ROLE = 1000

const header = jwtService.HEADER
const now = () => Date.now()

const build = async ({ seed, authMemberId, rpcEndpoint }) => {

  const provider = jwtService.defaultProvider()
  const wallet =
    await jwtService.walletFromSeed(jwtService.fromBase64Url(seed), provider)

  const newToken = async () => 
    jwtService.createJwt(wallet, jwtService.AUTH_JWT,
      jwtService.authPayload({ iss: authMemberId, nickname: API_NICKNAME, role: API_ROLE }))
  let jwtToken = await newToken()
  const jwtFn = async () => {
    const {payload: { exp } } = jwtService.decode(jwtToken)
    if (exp - now() < 1000 * 60 * 5) {
      jwtToken = await newToken()
    }
    return jwtToken
  }

  const rpcClient = await rpcClientBuilder.build({ rpcEndpoint, jwtFn })
  const entityClient = entityBuilder.build.bind(null, { rpcClient })

  const members = await entityClient({ resource: 'member', uri: 'members' })
  const wallets = await entityClient({ resource: 'wallet', uri: 'wallets' })

  const walletJWK = await (async () => {
    const payload = {
      kty: 'ES256K', crv: 'secp256k1', iss: wallet.address
    }
    return jwtService.createJwt(wallet, jwtService.JWK, payload)
  })()

  // ensure api server is registered
  const setup = async () => {
    const iss = wallet.address
    const nickname = 'auth server'
    const exists = await wallets.exists(iss)
    if (exists) {
      return
    }
    const { id: member_id, data: { role } } = await members.create({ wallet: iss, role: API_ROLE })
    const registered = await wallets.create({ member_id, nickname }, { id: iss, owner: member_id })
  }

  const publicKey = async () => walletJWK

  // TODO: extract
  const decodeJwt = (jwt) => {
    const { header, payload, signature } = jwtService.decode(jwt)
    if (!jwtService.verify(jwtService.CLIENT_JWT, payload, payload.iss, signature)) {
      console.debug('jwt signature error')
      throw new jwtService.SignatureError()
    }
    const { iss, nickname, iat, exp, aud } = payload
    if (!iss || !nickname || !iat || !exp || !aud) {
      throw new Error('malformed jwt')
    }
    if (!aud.startsWith(KERNEL_AUD) || aud.length != KERNEL_AUD.length) {
      throw new Error('jwt scope')
    }
    if (iat >= exp || now() >= exp) {
      throw new Error('jwt time')
    }
    return { header, payload, signature }
  }

  const register = async (jwt) => {
    const { header, payload: { iss, nickname }, signature } = decodeJwt(jwt)

    const exists = await wallets.exists(iss)
    if (exists) {
      throw new Error('already registered')
    }
    //TODO: change member owner to API
    const { id: member_id, data: { role } } = await members.create({ wallet: iss, role: NEW_ROLE })
    const registered = await wallets.create({ member_id, nickname }, { id: iss, owner: member_id })

    const authPayload = jwtService.authPayload({ iss, nickname, role })
    return jwtService.createJwt(wallet, jwtService.AUTH_JWT, authPayload)
  }

  const accessToken = async (jwt) => {
    const { header, payload: { iss, nickname }, signature } = decodeJwt(jwt)

    let member
    const exists = await wallets.exists(iss)
    if (!exists) {
      member = await members.create({ wallet: iss, role: NEW_ROLE })
      await members.updateMeta(member.id, { owner: member.id })
      const { id: member_id, data: { role } } = member
      await wallets.create({ member_id, nickname }, { id: iss, owner: member_id })
    } else {
      const { data: { member_id } } = await wallets.get(iss)
      member = await members.get(member_id)
      // TODO: quick fix to migrate legacy member entities
      await members.updateMeta(member.id, { owner: member.id })
    }

    const { id, data: { role } } = member
    const authPayload = jwtService.authPayload({ iss: id, nickname, role })
    return jwtService.createJwt(wallet, jwtService.AUTH_JWT, authPayload)
  }

  return { setup, publicKey, register, accessToken }
}

const auth = {
  build
}

export default auth
