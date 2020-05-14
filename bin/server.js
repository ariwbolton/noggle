import initServer from '../app/backend/server.js'

// TODO: Look into top-level await
// https://github.com/tc39/proposal-top-level-await#implementations

// We can't do `if (module.parent...)` anymre in ESM
// Long-running GH issue tracking including something similar to "module.parent === ..." to ESM
// https://github.com/nodejs/modules/issues/274
(async function() {
    const server = await initServer()

    process.on('SIGTERM', async function() {
        try {
            await server.stop({ timeout: 10 * 1000 }) // 10 seconds
        } catch (err) {
            console.error('An error occurred while stopping the server', err)
            process.exit(1)
        }
    })
})()
