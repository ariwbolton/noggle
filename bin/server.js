import Servers from '../app/backend/servers.js'

// TODO: Look into top-level await
// https://github.com/tc39/proposal-top-level-await#implementations

// We can't do `if (module.parent...)` anymre in ESM
// Long-running GH issue tracking including something similar to "module.parent === ..." to ESM
// https://github.com/nodejs/modules/issues/274
(async function() {
    const servers = await Servers.init()

    process.on('SIGTERM', async () => servers.shutdown())
})()
