/**
 * Copyright (c) Kernel
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict'

import CloudTasks from '@google-cloud/tasks'
const {CloudTasksClient} = CloudTasks

const DEFAULT_LOCATION = 'us-central1'
const DEFAULT_QUEUE = 'tasks'
const DEFAULT_URI = '/tasks'

const now = () => Date.now()
const nowSecs = () => now() / 1000

const build = async ({ projectId, location = DEFAULT_LOCATION, taskQueue = DEFAULT_QUEUE, relativeUri = DEFAULT_URI }) => {
  const client = new CloudTasksClient({ projectId })
 
  const listQueues = () => client.listQueues({
    parent: client.locationPath(projectId, location)
  })

  const createQueue = (queue) => client.createQueue({
    parent: client.locationPath(projectId, location),
    queue: {
      name: client.queuePath(projectId, location, queue),
      appEngineHttpQueue: {
        appEngineRoutingOverride: {
          service: 'default'
        }
      }
    }
  })

  const listTasks = (queue) =>
    client.listTasks({
      parent: client.queuePath(projectId, location, queue)
    })

  const createTask = ({seconds = 1, payload}) =>
      client.createTask({
        parent: client.queuePath(projectId, location, taskQueue),
        task: {
          appEngineHttpRequest: {
            httpMethod: 'POST',
            relativeUri: relativeUri,
            scheduleTime: { seconds: nowSecs() + seconds },
            body: payload // base64
          }
        }
      })

  const enqueueTask = async (...params) => {
    const request = {task: params}
    const payload = Buffer.from(JSON.stringify(request)).toString('base64')
    return createTask({ payload })
  }

  return { client, listQueues, createQueue, listTasks, createTask, enqueueTask }
}

const task = {
  build
}

export default task
