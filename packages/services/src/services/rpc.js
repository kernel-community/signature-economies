/**
 * Copyright (c) Kernel
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict'

const call = async (services, service, fn, params) => {
  return services[service][fn].apply(null, params)
}

const build = async (services) => {
  return {
    call: call.bind(null, services)
  }
}

const rpc = { build }

export default rpc
