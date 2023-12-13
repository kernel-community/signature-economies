'use strict'

const fastJsonStringify = require('fast-json-stringify')

function SerializerSelector () {
  return function buildSerializerFactory (externalSchemas, serializerOpts) {
    const fjsOpts = Object.assign({}, serializerOpts, { schema: externalSchemas })
    return responseSchemaCompiler.bind(null, fjsOpts)
  }
}

function responseSchemaCompiler (fjsOpts, { schema /* method, url, httpStatus */ }) {
  return fastJsonStringify(schema, fjsOpts)
}

module.exports = SerializerSelector
