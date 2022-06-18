/**
 * Copyright (c) Kernel
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict'

import { SecretManagerServiceClient } from '@google-cloud/secret-manager'

const build = async ({ projectId }) => {

  const client = new SecretManagerServiceClient({ projectId })

  // secrets
  const create = async ({ secretId }) => {
    const parent = `projects/${projectId}`
    const [secret] = await client.createSecret({
      parent, secretId, secret: { replication: { automatic: {} } }
    })
    return secret
  }

  const remove = async ({ secretId }) => {
    const name = `projects/${projectId}/${secretId}`
    await client.deleteSecret({ name })
  }

  const list = async () => {
    const parent = `projects/${projectId}`
    const [secrets] = await client.listSecrets({
      parent
    })
    return secrets
  }

  // versions
  const add = async ({ secretId, data }) => {
    const parent = `projects/${projectId}/secrets/${secretId}`
    const [version] = await client.addSecretVersion({
      parent, payload: { data }
    })
    return version
  }

  const versions = async ({ secretId }) => {
    const parent = `projects/${projectId}/secrets/${secretId}`
    const result = await client.listSecretVersions({
      parent
    })
    return result 
  }

  const access = async ({ secretId, crc32c, version = 'latest' }) => {
    const name = `projects/${projectId}/secrets/${secretId}/versions/${version}`
    const [secret] = await client.accessSecretVersion({ name })
    if (crc32c && secret.payload.dataCrc32c !== crc32c) {
      throw Error('secret crc32c mismatch')
    }
    return secret
  }

  const destroy = async ({ secretId, version }) => {
    const name = `projects/${projectId}/secrets/${secretId}/versions/${version}`
    const [secret] = await client.destroySecretVersion({ name })
    return secret
  }

  return { create, remove, list, add, versions, access, destroy }
}

const secret = { build }

export default secret
