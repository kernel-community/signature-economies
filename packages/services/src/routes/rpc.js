/**
 * Copyright (c) Kernel
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict'

import { ethers } from 'ethers'

//TODO: find a better way?
//import text from './../../../dapp/src/components/text'
import text from './../text/text.js'

import taskBuilder from './../services/task.js'
import taskQueueBuilder from './../services/taskQueue.js'
import rpcBuilder from './../services/rpc.js'

const register = async (server, rpcPath, tasksPath, { arweaveJwk, projectId }) => {

  const taskService = await taskBuilder.build({ projectId, relativeUri: tasksPath })
  const taskQueueService = await taskQueueBuilder.build({ arweaveJwk })
  const services = { taskService, taskQueueService }
  const rpcService = await rpcBuilder.build(services)

  const now = () => Date.now()

  const validSignature = (signature, account) => {
    try {
      return ethers.utils.verifyMessage(text, signature) === account
    } catch (error) {
      console.log(error)
      return false
    }
  }

  server.options(`${rpcPath}`, async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", request.headers.origin)
    reply.header("Access-Control-Allow-Headers", "*")
    reply.header("Access-Control-Allow-Credentials", "true")
    reply.header("Access-Control-Allow-Methods", "POST, OPTIONS")
    reply.header("Access-Control-Allow-Headers", "authorization,content-type")
    return {}
  })

  server.post(`${rpcPath}`, async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", request.headers.origin)
    reply.header("Access-Control-Allow-Headers", "*")
    reply.header("Access-Control-Allow-Credentials", "true")
    reply.header("Access-Control-Allow-Methods", "POST")
    reply.header("Access-Control-Allow-Headers", "authorization,content-type")
    console.debug('rpc call: ', request.body)
    const params = request.body
    const { signature, account } = request.body
    if (!signature || !account) {
      return reply.badRequest()
    }
    if (!validSignature(signature, account)) {
      return reply.badRequest()
    }
    const service = 'taskService'
    const fn = 'enqueueTask'
    const taskFn = 'sign'
    try {
      const result = await rpcService.call(service, fn, [taskFn, { signature, account }])
      console.debug('rpc result', result)
      return { result }
    } catch (e) {
      console.debug('error', e)
      const error = { code: e.code, message: e.message }
      return { error }
    }
  })

  // this gets called from cloud tasksPath
  server.post(`${tasksPath}`, async (request, reply) => {
    console.debug('task call: ', request.body)
    // task specific headers
    // TODO: abort if retry count limit reached
    const headers = request.headers
    const taskname =  headers['x-appengine-taskname']
    const queuename =  headers['x-appengine-queuename']
    const taskRetryCount =  headers['x-appengine-taskretrycount']
    const taskExecutionCount =  headers['x-appengine-taskexecutioncount']
    const taskEta =  headers['x-appengine-tasketa']
    const taskTimeout =  headers['x-appengine-timeout-ms']
    const {task: [fn, ...params]} = request.body

    if (!fn) {
      console.log('taskQueueService: missing arg fn')
      return {}
    }
    const service = 'taskQueueService'
    try {
      const result = await rpcService.call(service, fn, params)
      console.debug('rpc result', result)
      return { result }
    } catch (e) {
      console.debug('error', e)
      const error = { code: e.code, message: e.message }
      return reply.internalServerError()
    }
  })

  return {listen: () => ''}
}

const rpc = { register }

export default rpc
