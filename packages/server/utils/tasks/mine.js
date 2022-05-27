/**
 * mine a block on arlocal
 */
const {gateway} = require("./gateway");
;(() => gateway.get(`/mine`))()
