/**
 * Copyright (c) Kernel
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict'

import 'dotenv/config'
import fastify from 'fastify'
import sensible from '@fastify/sensible'

import health from './routes/health.js'
import rpcTask from './routes/rpc.js'

import secretBuilder from './services/secret.js'

const PORT = process.env.PORT || 3001
const HOST = process.env.HOST || 'localhost'

const PROJECT_ID = process.env.PROJECT_ID
const BUCKET = process.env.BUCKET

const ARWEAVE_JWK_SECRET_ID = process.env.ARWEAVE_JWK_SECRET_ID
const ARWEAVE_JWK_SECRET_CRC32C = process.env.ARWEAVE_JWK_SECRET_CRC32C

const TASK_RPC_PATH = process.env.TASK_RPC_PATH || '/rpc/sign'
const TASKS_PATH = process.env.TASKS_PATH || '/tasks'

const local = () => process.env.ENV === 'DEV'

const start = async () => {
  const opts = {
    logger: {
      level: 'info'
    }
  }
  const server = fastify(opts)
  try {
    server.register(sensible)
    // Cloud Tasks sends this content type
    // https://github.com/googleapis/nodejs-tasks/blob/main/samples/server.js#L26
    server.addContentTypeParser('application/octet-stream', { parseAs: 'buffer' }, async (request, body) => {
      return JSON.parse(Buffer.from(body, 'base64'))
    })

    const secretService = await secretBuilder.build({ projectId: PROJECT_ID })
    const arweaveSecret = await secretService.access({
      secretId: ARWEAVE_JWK_SECRET_ID, crc32c: ARWEAVE_JWK_SECRET_CRC32C
    })
    const arweaveJwk = JSON.parse(arweaveSecret.payload.data.toString())

    const listenFns = await Promise.all([
			rpcTask.register(server, TASK_RPC_PATH, TASKS_PATH, {
        projectId: PROJECT_ID,
        arweaveJwk
      })
		])

    await server.listen({ port: PORT, host: '0.0.0.0' })
  } catch (err) {
    console.log(err)
    server.log.error(err)
    process.exit(1)
  }
}

start()
