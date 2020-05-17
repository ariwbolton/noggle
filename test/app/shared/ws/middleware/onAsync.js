// import io from 'socket.io-client'

import Servers from '../../../../../app/backend/servers.js'

describe('onAsync middleware', function() {
    let servers

    beforeEach(async function() {
        servers = await Servers.init()
    })

    afterEach(async function() {
        await servers.shutdown()
    })

    it('should work as intended', function() {
        // Ignores case
    })
})
