import initServers from '../app/backend/server.js'

// TODO: Look into top-level await
// https://github.com/tc39/proposal-top-level-await#implementations

// We can't do `if (module.parent...)` anymre in ESM
// Long-running GH issue tracking including something similar to "module.parent === ..." to ESM
// https://github.com/nodejs/modules/issues/274
(async function() {
    const {
        server,
        io
    } = await initServers()

    process.on('SIGTERM', async function() {
        console.log('Triggering WebSocket server shutdown')
        io.close(() => console.log('WebSocket server shut down'))

        try {
            console.log('Triggering HTTP server shutdown')
            await server.stop({ timeout: 10 * 1000 }) // 10 seconds
            console.log('HTTP server shut down')
        } catch (err) {
            console.error('An error occurred while stopping the HTTP server', err)
            process.exit(1)
        }
    })
})()
