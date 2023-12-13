import { expectType } from "tsd";
import SerializerSelector, { SerializerCompiler } from "../..";

const compiler = SerializerSelector();

expectType<SerializerCompiler>(compiler);