# @fastify/fast-json-stringify-compiler
Build and manage the [`fast-json-stringify`](https://www.npmjs.com/package/fast-json-stringify) instances for the fastify framework.
This package is responsible for compiling the application's `response` JSON schemas into optimized functions to speed up the response time.

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)
[![Continuous Integration](https://github.com/fastify/fast-json-stringify-compiler/workflows/Continuous%20Integration/badge.svg)](https://github.com/fastify/fast-json-stringify-compiler/actions/workflows/ci.yml)


## Versions

| `@fastify/fast-json-stringify-compiler` | `fast-json-stringify` | Supported `fastify` |
|----------------------------------------:|----------------------:|--------------------:|
|                                    v1.x |                  v3.x |                ^3.x |
|                                    v2.x |                  v3.x |                ^4.x |
|                                    v3.x |                  v4.x |                ^4.x |

### fast-json-stringify Configuration

The `fast-json-stringify` configuration is the default one. You can check it the default settings in the [`fast-json-stringify` option](https://github.com/fastify/fast-json-stringify/#options) documentation.

You can also override the default configuration by passing the [`serializerOpts`](https://www.fastify.io/docs/latest/Reference/Server/#serializeropts) configuration to the Fastify instance.

## Usage

This module is already used as default by Fastify.
If you need to provide to your server instance a different version, refer to [the official doc](https://www.fastify.io/docs/latest/Reference/Server/#schemacontroller).

### How it works

This module provide a factory function to produce [Serializer Compilers](https://www.fastify.io/docs/latest/Reference/Server/#serializercompiler) functions.

## License

Licensed under [MIT](./LICENSE).
