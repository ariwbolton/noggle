import { Servers } from '../../../../../app/backend/servers.ts'

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
