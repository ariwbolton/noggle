// Static assets
import './static/android-chrome-192x192.png'
import './static/android-chrome-512x512.png'
import './static/apple-touch-icon.png'
import './static/favicon.ico'
import './static/favicon-16x16.png'
import './static/favicon-32x32.png'
import './static/site.webmanifest'

// App + React
import React from 'react'
import ReactDom from 'react-dom'

import socket from './socketIoConfig'

const requestSystemAliveStatus = async () => {
    console.log('Requesting alive status!')
    const aliveStatus = await socket.emitAsync('system.alive', [], { wait: true })
    console.log('Received alive status!')
    console.log(aliveStatus)
}

const App = () => {
    return (
        <button onClick={requestSystemAliveStatus}>
            Request Greeting
        </button>
    )
}

ReactDom.render(<App />, document.getElementById('app'))
