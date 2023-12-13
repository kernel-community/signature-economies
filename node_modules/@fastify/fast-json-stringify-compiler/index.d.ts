import { Options as FJSOptions } from 'fast-json-stringify'

export type SerializerCompiler = (
  externalSchemas: unknown,
  options: FJSOptions
) => (doc: any) => string;

export declare function SerializerSelector(): SerializerCompiler;

export type { Options } from 'fast-json-stringify'

export default SerializerSelector;