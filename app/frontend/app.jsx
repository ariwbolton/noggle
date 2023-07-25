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
import React, { useReducer, useEffect } from 'react'
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

const defaultState = {
    io: 'disconnected',
    login: 'unauthenticated',
    alive: 'unknown',
    unknown: 'unknown'
}

const reducer = (state, stateToMerge) => {
    const additionalState = stateToMerge.io === 'disconnected' ? defaultState : {}
    const newState = { ...state, ...stateToMerge, ...additionalState }

    console.log('new state')
    console.log(newState)

    return newState
}

const App = () => {
    const [state, dispatch] = useReducer(reducer, defaultState)

    const loginHandler = requesterFactory('user.login', [{ id: uuidv4() }], (response) => {
        const result = response.meta.status === 'success' ? 'authenticated' : 'unauthenticated'

        dispatch({ login: result })
    })
    const aliveHandler = requesterFactory('system.alive', [], (response) => {
        const status = response.meta.status === 'success' ? 'alive' : 'dead'

        dispatch({ alive: status })
    })
    const unknownHandler = requesterFactory('unknown', [], (response) => {
        dispatch({ unknown: response.meta.status })
    })

    useEffect(() => {
        dispatch({ io: socket.connected ? 'connected' : 'disconnected' })

        const connectHandler = () => dispatch({ io: 'connected' })
        const disconnectHandler = () => dispatch({ io: 'disconnected' })

        socket.on('connect', connectHandler)
        socket.on('disconnect', disconnectHandler)

        return () => {
            console.log('unregistering handlers')
            socket.off('connect', connectHandler)
            socket.off('disconnect', disconnectHandler)
        }
    }, [])

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <button onClick={() => {
                                if (state.io === 'connected') {
                                    socket.disconnect()
                                } else {
                                    socket.connect()
                                }
                            }}>
                                { state.io === 'connected' ? 'Disconnect' : 'Connect' }
                            </button>
                        </td>
                        <td>
                            { state.io }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={loginHandler}>
                                Login
                            </button>
                        </td>
                        <td>
                            { state.login }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={aliveHandler}>
                                Alive
                            </button>
                        </td>
                        <td>
                            { state.alive }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={unknownHandler}>
                                Unknown
                            </button>
                        </td>
                        <td>
                            { state.unknown }
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

// Mounting via 'body' isn't allowed/recommended
// Ideally this element would already be in the HTML template, but we're using a default Webpack one, which doesn't have it
// So we have to create one (else we'd need to create our own HTML template, which I'm hoping to avoid!)
const root = document.createElement('div')

document.body.appendChild(root)

ReactDom.render(<App />, root)
