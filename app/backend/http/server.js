import path from 'path'
import url from 'url'

import Hapi from '@hapi/hapi'
import Inert from '@hapi/inert'

import config from '../../config.js'
import routeIndex from './routes/index.js'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

/**
 *
 * @returns {Promise<Hapi.Server>}
 */
export default async function initHttpServer() {
    const server = new Hapi.Server({
        port: config.backend.port,
        routes: {
            files: {
                relativeTo: path.join(__dirname, '..', '..', '..', 'dist', 'frontend')
            }
        }
    })

    await server.register(Inert)

    server.ext('onPreResponse', function(request) {
        if (request.response.isBoom) {
            request.response.output.payload = {
                error: {
                    id: request.response.output.payload.id || null,
                    message: request.response.output.payload.message
                }
            }
        }

        return request.response
    })

    // Routes
    server.route(routeIndex)

    try {
        console.log('Starting HTTP server...')
        await server.start()
        console.log('Started!')
    } catch (err) {
        console.error('Problem during startup error; server should now exit', err)
        throw err
    }

    return server
}
