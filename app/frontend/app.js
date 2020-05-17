// Static assets
import './static/android-chrome-192x192.png'
import './static/android-chrome-512x512.png'
import './static/apple-touch-icon.png'
import './static/favicon.ico'
import './static/favicon-16x16.png'
import './static/favicon-32x32.png'
import './static/site.webmanifest'

// App + React
import { v4 as uuidv4 } from 'uuid'
import React, { useState } from 'react'
import ReactDom from 'react-dom'

import socket from './socketIoConfig'

const requesterFactory = (event, args, responseHandler) => {
    return async () => {
        console.log(`Requesting ${event}`)
        const response = await socket.emitAsync(event, args, { wait: true })
        console.log(`Received ${event} results!`)
        console.log(response)
        responseHandler(response)
    }
}

const App = () => {
    const [ioState, setIOState] = useState(socket.connected ? 'connected' : 'disconnected')
    const [loginState, setLoginState] = useState('unauthenticated')
    const [aliveStatus, setAliveStatus] = useState('unknown')

    const loginHandler = requesterFactory('user.login', [{ id: uuidv4() }], (response) => {
        const result = response.meta.status === 'success' ? 'authenticated' : 'unauthenticated'

        setLoginState(result)
    })
    const aliveHandler = requesterFactory('system.alive', [], (response) => {
        const status = response.meta.status === 'success' ? 'alive' : 'dead'

        setAliveStatus(status)
    })

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            IO state
                        </td>
                        <td>
                            { ioState }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={loginHandler}>
                                Login
                            </button>
                        </td>
                        <td>
                            { loginState }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={aliveHandler}>
                                Alive
                            </button>
                        </td>
                        <td>
                            { aliveStatus }
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

ReactDom.render(<App />, document.getElementById('app'))
